houseTracking.controller('mapController', function mapController($scope, request_creator, map_manager, event_manager) {

  // Return proper polyline style based on given step's traffic condition
  function getPolylineStyle(distance, duration) {
    var speed = distance / duration;
    var polyline_color = undefined;
    if (speed > 22.35/* unit: m/s */) {
      polyline_color = "#197C11"; // Green
    } else if (speed > 11.18) {
      polyline_color = "#F0D744"; // Yellow
    } else {
      polyline_color = "#DD4C1C"; // Red
    }
    return {
      strokeColor: "#000000",
      strokeOpacity: 0.2,
      strokeWeight: 6
    };
  }

  var map_base = {
    map: undefined,
    direction_service: undefined,
    info_window: undefined,
    mapOptions: {
      center: new google.maps.LatLng(47.6739881, -122.121512),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false
    },
    initMap: function() {
      if (this.map === void 0) {
        this.map = new google.maps.Map(document.getElementById("map"), this.mapOptions);
        this.direction_service = new google.maps.DirectionsService;
        this.info_window = new google.maps.InfoWindow();
        registerInfoWindowEvents();
      }
      return this;
    },
    reCenter: function(location) {
      var lat = parseFloat(location[0].lat);
      var lng = parseFloat(location[0].lng);
      if (this.map.center.lat() !== lat || this.map.center.lng() !== lng) {
        this.map.setCenter({lat: lat, lng: lng});
      }

      return this;
    },
    addRoute: function(src_loc, dst_loc) {
      this.direction_service.route({
        origin: {lat: src_loc.lat, lng: src_loc.lng},
        destination: {lat: dst_loc.lat, lng: dst_loc.lng},
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          var route_id = src_loc.id + "_" + dst_loc.id;
          map_manager.saveRouteInfo(route_id, response);
          map_base.renderDirectionsPolylines(route_id, response);
        } else {
          console.log('Directions request failed due to ' + status);
        }
      });
    },
    addAllRoutes: function(marker_info) {
      var src = this.createPoints(marker_info, "house")[0];
      var dsts = this.createPoints(marker_info, "movie_theater", "grocery_or_supermarket", "Microsoft", "Google");

      for (var dst_index = 0; dst_index < dsts.length; dst_index++) {
        var dst = dsts[dst_index];
        this.addRoute(src, dst);
      }
    },
    createMarkers: function(location_dict) {
      var location_types = Object.keys(location_dict);
      for (var t_index = 0; t_index < location_types.length; t_index++) {
        var type = location_types[t_index];
        var icon_image = "http://127.0.0.1:8080" + map_manager.icons[type];
        var locations = location_dict[type].location;
        for (var loc_index = 0; loc_index < locations.length; loc_index++) {
          var location = locations[loc_index];
          var marker = new google.maps.Marker({
            position: location,
            icon: icon_image,
            title: type
          });
          marker.id = location.id;
          map_manager.saveMarker(location.id, marker);
        }
      }
      return this;
    },
    attachMarkers: function() {
      var markers = map_manager.getAll("marker_store");
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(this.map);
      }
      return this;
    },
    clear: function() {
      map_manager.clearMarkers();
      map_manager.clearRoutes();
      map_manager.clearAllRouteInfo();

      return this;
    },
    addTrafficLayer: function() {
      new google.maps.TrafficLayer().setMap(this.map);
      return this;
    },
    createPoints: function() {
      if (arguments.length < 2) {
        console.log("Missing parameter. Expected at least 2 but received " + arguments.length);
        return;
      }
      var points = [];
      var location_types = arguments[0];
      for (var i = 1; i < arguments.length; i++) {
        var type = arguments[i];
        var locations = location_types[type].location;
        for (var j = 0; j < locations.length; j++) {
          var location = locations[j];
          points.push(location);
        }
      }
      return points;
    }, 
    renderDirectionsPolylines: function(route_id, response) {
      var polylines = [];
      var legs = response.routes[0].legs;
      for (i = 0; i < legs.length; i++) { // legs.length should always be 1 since we don't specify any waypoint
        var leg = legs[i];
        var leg_duration = leg.duration.text;
        var leg_distance = leg.distance.text;
        var steps = leg.steps;
        for (j = 0; j < steps.length; j++) {
          var step = steps[j];
          var stepPolyline = new google.maps.Polyline(getPolylineStyle(step.distance.value, step.duration.value));
          var nextSegment = step.path;
          for (k = 0; k < nextSegment.length; k++) {
            stepPolyline.getPath().push(nextSegment[k]);
          }
          stepPolyline.setMap(this.map);
          polylines.push(stepPolyline);
          map_manager.saveRoute(route_id, polylines);
          google.maps.event.addListener(stepPolyline,'click', 
            onPolylineClicked(route_id, this.map, leg_duration, leg_distance));
        }
      }
    }
  }

  function onPolylineClicked(route_id, map, duration, distance) {
    var ids = route_id.split('_');
    var src_id = ids[0];
    var dest_id = ids[1];
    var info_window = map_base.info_window;
    info_window.route_id = route_id;
    info_window.src_marker = map_manager.getMarkerForID(src_id);
    info_window.dest_marker = map_manager.getMarkerForID(dest_id);

    return function(evt) {
      console.log("polyline clicked");

      info_window.setContent(getInfoWindowContent(duration, distance));
      info_window.setPosition(evt.latLng);
      info_window.open(map);
    };
  }

  function registerInfoWindowEvents() {
    var info_window = map_base.info_window;
    var toggle_button = undefined;

    // Register toggle button click handler
    google.maps.event.addListener(info_window, 'domready', function registerButtonClickHandler(evt) {
      toggle_button = $('#src_dest_toggle_button');
      event_manager.register(toggle_button, 'click', function onToggleSrcDstButtonClicked() {
        console.log("toggle button clicked");
        
        // Remove route
        map_manager.deleteRoute(info_window.route_id);
        map_manager.deleteRouteInfo(info_window.route_id);

        // swap src and dest marker in info window
        swapInfoWindowMarkers();
        
        // Add new route
        var src_location = createRouteLocationFromMarker(info_window.src_marker);
        var dest_location = createRouteLocationFromMarker(info_window.dest_marker);
        map_base.addRoute(src_location, dest_location);

        // update info window
        setTimeout(function() {
          info_window.route_id = info_window.src_marker.id + "_" + info_window.dest_marker.id;
          var new_route_info = map_manager.getRouteInfo(info_window.route_id);
          var new_route_leg = new_route_info.routes[0].legs[0];
          info_window.setContent(getInfoWindowContent(new_route_leg.duration.text, new_route_leg.distance.text));
        }, 200);
      });
    });

    // Register info window close handler
    google.maps.event.addListener(info_window, 'closeclick', function unregisterButtonClickHandler(evt) {
      event_manager.unregister(toggle_button, 'click');
      toggle_button = undefined;
    });
  }

  function swapInfoWindowMarkers() {
    var info_window = map_base.info_window;
    var temp_marker = info_window.src_marker;
    info_window.src_marker = info_window.dest_marker;
    info_window.dest_marker = temp_marker;
  }

  function getInfoWindowContent(duration, distance) {
    return "Source: " + map_base.info_window.src_marker.title + "<br>" + 
      "Destination: " + map_base.info_window.dest_marker.title + "<br>" +
      "duration: " + duration + "<br>" + "distance: " + distance + "<br>" +
      "<button id='src_dest_toggle_button'>Toggle Src and Dst</button>";
  }

  function createRouteLocationFromMarker(marker) {
    return {
      id: marker.id,
      lat: marker.position.lat(),
      lng: marker.position.lng()
    };
  }

  function addCompanies(marker_info) {
    marker_info["Microsoft"] = {location: [{lat: 47.639960, lng: -122.125558}]};
    marker_info["Google"] = {location: [{lat: 47.670232, lng: -122.197222}]};
  }

  $scope.$on("onMarkerDataReady", function(event, data) {
    var marker_info = data.marker_info;
    addCompanies(marker_info);
    map_manager.addID(marker_info);
    console.log("Marker info:" + marker_info);
    
    map_base
      .clear()
      .reCenter(marker_info.house.location)
      .addTrafficLayer()
      .createMarkers(marker_info)
      .attachMarkers()
      .addAllRoutes(marker_info);
  });
  
  map_base.initMap();
});