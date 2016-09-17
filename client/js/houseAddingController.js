houseTracking.controller("houseAddingController", function($scope, parser_factory) {
	$scope.add = function(event) {
		$scope.address = preprocess();
	};

	function preprocess() {
		return parser_factory.init($scope.address).trim().lower().value();
	}
});