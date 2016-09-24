houseTracking.controller('paneController', function paneController($scope, id_distributor) {
  // TODO: This list is hard coded temporarily
  var house_data = {
    "redmond": [{
                  "address": "17325 NE 85th Pl",
                  "square_feet": 2100,
                  "bed_bath": "5 2.5",
                  "link": "www.google.com"
                }, 
                {
                  "address": "20120 SE 55th",
                  "square_feet": 2700,
                  "bed_bath": "5 3.5",
                  "link": "www.youtube.com"
                }],
    "bellevue": [{
                  "address": "9800 136th ave",
                  "square_feet": 2350,
                  "bed_bath": "4 2.25",
                  "link": "www.amazon.com"
                }],
    "kirkland": [{
                  "address": "aka 136th ave",
                  "square_feet": 2000,
                  "bed_bath": "3 2.25",
                  "link": "www.apple.com"
                }]
    };
    var regions = Object.keys(house_data);
    
    $scope.house_data = house_data;
    

});