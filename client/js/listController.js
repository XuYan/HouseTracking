houseTracking.controller('listController', function listController($scope, $http, request_creator) {
	$scope.collapse = function (event) {
		$(event.target).toggleClass("glyphicon-chevron-down");
	};

	var request_url = request_creator.create("http://127.0.0.1:3000/houses/" + $scope.region);
	$http({
  		method: 'GET',
  		url: request_url
	}).then(function successCallback(response) {
    	$scope.houses = response.data;
  	}, function errorCallback(response) {
    	console.log("Failed to get data for region " + $scope.region);
  	});

	$scope.products = [{
                       "productid": 1001456,
                       "address": "Spring Season Gift",
                       "amount": 250,
                       "orderDate": "2015-02-15T00:00:00Z",
                       "availablity":1,
                       "items": [
                                       {"prodDetailId": 17890,
                                           "prodDetailDesc": "PS 3",
                                           "amount": "150",
                                           "qty":1
                                       },{"prodDetailId": 17891,
                                           "prodDetailDesc": "Heart shape Ring",
                                           "amount": "100",
                                           "qty": 1
                                       },]
                        },{"productid": 1001457,
                            "address": "Christmas Season Gift",
                            "amount": 349,
                            "orderDate": "2015-04-15T00:00:00Z",
                            "availablity": 1,
                            "items": [{
                                                "prodDetailId": 17900,
                                                "prodDetailDesc": "Choclate Giftbox",
                                                "amount": "150",
                                                "qty": 1
                                            },{
                                                "prodDetailId": 17901,
                                                "prodDetailDesc": "Xbox 360",
                                                "amount": "199",
                                                "qty": 1

                                            },]
                        },{
                            "productid": 1001458,
                            "productname": "Birthday Gift",
                            "availablity": "N/A",
                            "amount": 200
                        }];
});