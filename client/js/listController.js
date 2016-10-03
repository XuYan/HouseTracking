houseTracking.controller('listController', function listController($scope, $rootScope, $http, request_creator) {
  $scope.active_index = -1;

	$scope.collapse = function (event) {
		$(event.target).toggleClass("glyphicon-chevron-down");
    var detail_div = $($(event.target).attr('data-target'));
    detail_div.toggle();
    event.stopPropagation();
	};

  $scope.deleteHouse = function(index) {
    var house_to_delete = $scope.houses.splice(index, 1)[0];
    removeHouseRecord(house_to_delete._id);
    event.stopPropagation();
  }

  function removeHouseRecord(house_id) {
    var delete_req_url = "http://127.0.0.1:3000/houses/" + $scope.region + "/" + house_id;
    $http.delete(delete_req_url)
      .then(function deleteSuccessCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response.message);
      }, function deleteErrorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log("Error when deleting house from DB: " + response.message);
    });
  }

  $scope.onItemSelect = function(index) {
    var house = $scope.houses[index];
    $scope.active_index = index;
    var data_on_map = getDataForMap(house);
  }

  function addHouseData(data_for_map, house) {
    data_for_map["house"] = {
      "location": [{"lat": house.latitude, "lng": house.longitude}]
    }
  }

  function getDataForMap(house) {
    var url = request_creator.create("http://127.0.0.1:3000/others/", {
      longitude: house.longitude,
      latitude: house.latitude
    });

    $http.get(url)
      .then(
        function onNearbyDataObtained(response) {
          var data_for_map = response.data; // non-house data
          addHouseData(data_for_map, house);

          $rootScope.$broadcast("onMarkerDataReady", {
            marker_info: data_for_map
          });
        },
        function onNearbyDataFailed(response) {
          console.log("Fail to get nearby data: " + response.message);
        });
  }

  $scope.$on('TabChange', function (event, data) {
    $scope.active_index = -1;
  });

  $scope.$on("onNewHouseAdded", function(event, data) {
    var new_house = data.house;
    if (new_house["city"] === $scope.region) {
      $scope.houses.push(data.house);  
    }
  });

	var request_url = request_creator.create("http://127.0.0.1:3000/houses/" + $scope.region);
	$http({
  		method: 'GET',
  		url: request_url
	}).then(function successCallback(response) {
    	$scope.houses = response.data;
  	}, function errorCallback(response) {
    	console.log("Failed to get data for region " + $scope.region);
  	});
});