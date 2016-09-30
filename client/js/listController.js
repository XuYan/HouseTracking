houseTracking.controller('listController', function listController($scope, $http, request_creator) {
  $scope.active_index = -1;

	$scope.collapse = function (event) {
		$(event.target).toggleClass("glyphicon-chevron-down");
    var detail_div = $($(event.target).attr('data-target'));
    detail_div.toggle();
    event.stopPropagation();
	};

  $scope.onItemSelect = function(index) {
    var house = $scope.houses[index];
    $scope.active_index = index;
    console.log("onItemSelected");
  }

  $scope.$on('TabChange', function (event, data) {
    $scope.active_index = -1;
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