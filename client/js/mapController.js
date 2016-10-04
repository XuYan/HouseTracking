houseTracking.controller('mapController', function mapController($scope, request_creator, map_manager) {
  var map_base = {
    map: undefined,
    direction_service: undefined,
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

    addRoutes: function(marker_info) {
      function onResponseReceived(route_id) {
        return function(response, status) {
          if (status === 'OK') {
            var route_renderer = new google.maps.DirectionsRenderer({
              map: map,
              suppressMarkers: true /*Do not show default marker*/
            });
            map_manager.saveRouteRender(route_id, route_renderer);
            map_manager.saveRouteInfo(route_id, response);
            route_renderer.setDirections(response);

            //TODO: add clilck event listener to markers
          } else {
            console.log('Directions request failed due to ' + status);
          }
        }
      }

      var map = this.map;

      var src = this.createPoints(marker_info, "house")[0];
      var dsts = this.createPoints(marker_info, "movie_theater", "grocery_or_supermarket");

      for (var dst_index = 0; dst_index < dsts.length; dst_index++) {
        var dst = dsts[dst_index];
        this.direction_service.route({
          origin: {lat: src.lat, lng: src.lng},
          destination: {lat: dst.lat, lng: dst.lng},
          travelMode: 'DRIVING'
        }, onResponseReceived(dst.id));
      }
    },
    createMarkers: function(location_dict) {
      var location_types = Object.keys(location_dict);
      for (var t_index = 0; t_index < location_types.length; t_index++) {
        var type = location_types[t_index];
        var icon_image = "http://127.0.0.1:8080" + map_manager.icons[type];
        var locations = location_dict[type].location;
        for (var loc_index = 0; loc_index < locations.length; loc_index++) {
          var marker = new google.maps.Marker({
            position: locations[loc_index],
            icon: icon_image,
            title: type
          });
          map_manager.addMarker(locations[loc_index].id, marker);
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
      map_manager.clearRouteData();

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
    }
  }

  $scope.$on("onMarkerDataReady", function(event, data) {
    var marker_info = data.marker_info;
    map_manager.addID(marker_info);
    console.log("Marker info:" + marker_info);
    
    map_base
      .clear()
      .reCenter(marker_info.house.location)
      .addTrafficLayer()
      .createMarkers(marker_info)
      .attachMarkers()
      .addRoutes(marker_info);
  });
  
  map_base.initMap();
});