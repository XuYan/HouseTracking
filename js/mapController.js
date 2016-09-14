houseTracking.controller('mapController', function mapController($scope) {
  // Hard-coded render info
  // TODO: Moved to database later
  var renderInfo = {
    postcode: "98052",
    market: ["Safeway, FredMeyer", "Walmart"],
    workplace: ["Microsoft", "Google"],
    house: ["17325 Northeast 85th Place, Redmond, WA"]
  };

  var map;
  
  // map config
  var mapOptions = {
    center: new google.maps.LatLng(50, 102),
    zoom: 4,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false
  };
        
  // init the map
  function initMap() {
    if (map === void 0) {
      map = new google.maps.Map(document.getElementById("map"), mapOptions);
    }
  }

  initMap();    

  //AIzaSyCvCXMnA1WTo5rCY-PpvF5xJWRK-XLs_6k
});