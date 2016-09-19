houseTracking.controller("houseAddingController", function($scope, $http, us_address_parser, request_creator) {
	var addr_parser = us_address_parser;
	$scope.add = function(event) {
		var addr_str = addr_parser.preprocess($scope.address);
		var addr_obj = addr_parser.verify(addr_str);
		var base_url = "http://localhost:3000/getPropertyDetail"
		if (addr_obj) {
			var request_url = request_creator.create(base_url, addr_obj);
			console.log(request_url);

			$http.get(request_url)
				.then(
					function onRequestSucceed(response) {
						console.log("Request succeed");
						console.log(response.data);
					},
					function onRequestFailed(response) {
						console.log("Request failed");
					});
		} else {
			// TODO: Tell user what's the expected input format
			console.log("User input isn't in expected format");
		}
	};
});