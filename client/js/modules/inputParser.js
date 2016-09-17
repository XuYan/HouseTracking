angular.module("inputParser", [])
.factory('us_address_parser', function() {
	var input_object = (function() {
		var address = "";
		var city = "";
		var state = "";
		var zipCode = "";

		return {
			preprocess: function(input) {
				return input.trim().toLowerCase();
			},
			verify: function(input) {
				var addr_regex = /^([^,]+), ([a-z]+), ([a-z]{2}) ((\d{5}))$/;
				regex_result = addr_regex.exec(input);
				if (regex_result) {
					address = regex_result[1];
					city = regex_result[2];
					state = regex_result[3];
					zipCode = regex_result[4];

					return true;
				}
				return false;
			},
			getAddress: function(input) {
				return address;
			},
			getCity: function(input) {
				return city;
			},
			getState: function(input) {
				return state;
			},
			getZipCode: function(input) {
				return zipCode;
			}
		};
	}());

	return input_object;
});
