houseTracking.controller('mapController', function mapController($scope) {
  var icons = {
    "Microsoft": "/resources/Google_Icon.png",
    "Google": "/resources/Microsoft_Icon.png",
    "movie_theater": "/resources/MovieTheatre_Icon.png",
    "grocery_or_supermarket": "/resources/Store_Icon.png",
    "house": "/resources/Home_Icon.png"
  };

  var map_base = {
    map: undefined,
    direction_service: undefined,
    direction_display: undefined,
    markers: undefined,
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
        this.direction_display = new google.maps.DirectionsRenderer({map: this.map});
        this.markers = [];
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
    addRoutes: function() {
        // // Display the route between the initial start and end selections.
        // calculateAndDisplayRoute(
        //     directionsDisplay, directionsService, markerArray, stepDisplay, map);
    },
    createMarkers: function(marker_info) {
      var types = Object.keys(marker_info);
      for (var i = 0; i < types.length; i++) {
        var type = types[i];
        var icon_image = "http://127.0.0.1:8080" + icons[type];
        var markers = marker_info[type];
        for (var j = 0; j < markers.location.length; j++) {
          this.markers.push(new google.maps.Marker({
            position: markers.location[j],
            icon: icon_image,
            title: type
          }));
        }
      }
      return this;
    },
    attachMarkers: function() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(this.map);
      }
    },
    clearMarkers: function() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
      return this;
    },
    addTrafficLayer: function() {
      new google.maps.TrafficLayer().setMap(this.map);
      return this;
    }
  }

  // function calculateAndDisplayRoute(directionsDisplay, directionsService,
  //         markerArray, stepDisplay, map) {
  //       // First, remove any existing markers from the map.
  //       for (var i = 0; i < markerArray.length; i++) {
  //         markerArray[i].setMap(null);
  //       }

  //       // Retrieve the start and end locations and create a DirectionsRequest using
  //       // WALKING directions.
  //       directionsService.route({
  //         origin: document.getElementById('start').value,
  //         destination: document.getElementById('end').value,
  //         travelMode: 'WALKING'
  //       }, function(response, status) {
  //         // Route the directions and pass the response to a function to create
  //         // markers for each step.
  //         if (status === 'OK') {
  //           document.getElementById('warnings-panel').innerHTML =
  //               '<b>' + response.routes[0].warnings + '</b>';
  //           directionsDisplay.setDirections(response);
  //           showSteps(response, markerArray, stepDisplay, map);
  //         } else {
  //           window.alert('Directions request failed due to ' + status);
  //         }
  //       });

  $scope.$on("onMarkerDataReady", function(event, data) {
    console.log("Data:" + data["marker_info"]);
    map_base.clearMarkers()
      .reCenter(data.marker_info.house.location)
      .addTrafficLayer()
      .createMarkers(data.marker_info)
      .attachMarkers();
      //.addRoutes();
  });
  
  map_base.initMap();
});