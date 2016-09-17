angular.module("houseSearchAPI", [])
.factory('zillow_api', function() {
	var api = (function() {
		var 
		return {
			preprocess: function(input) {
				return input.trim().toLowerCase();
			}
		};
	}());

	return api;
});
