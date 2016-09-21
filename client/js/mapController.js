houseTracking.controller('mapController', function mapController($scope) {
  // Hard-coded remarkers to render on map
  // TODO: Should returned by server later
  var markers = {
    postcode: "98052",
    market: ["Safeway, FredMeyer", "Walmart"],
    workplace: ["Microsoft", "Google"],
    home: ["17325 Northeast 85th Place, Redmond, WA"],
    house: []
  };

  var map_base = {
    map: undefined,
    mapOptions: {
      center: new google.maps.LatLng(47.6739881, -122.121512),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false  
    },
    initMap: function() {
      if (this.map === void 0) {
        this.map = new google.maps.Map(document.getElementById("map"), this.mapOptions);
      }
      return this;
    },
    addMarker: function() {
      return this;
    }
  }
  
  map_base.initMap().addMarker();
});