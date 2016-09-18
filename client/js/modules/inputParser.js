(function() {
	"use strict";
	angular.module("inputParser", [])
		.factory('us_address_parser', function() {
			var input_object = (function() {
				var addr_obj_fields = ["", "address", "city", "state", "zipCode"];

				return {
					preprocess: function(input) {
						return input.trim().toLowerCase();
					},
					verify: function(input) {
						var addr_regex = /^([^,]+), ([a-z]+), ([a-z]{2}) ((\d{5}))$/;
						var regex_result = addr_regex.exec(input);
						if (regex_result) {
							var addr_obj = {};
							for (let i = 1; i < addr_obj_fields.length; i++) {
								Object.defineProperty(addr_obj, addr_obj_fields[i], {
		  							enumerable: true,
		  							writable: false,
		  							value: regex_result[i]
		  						});
							}
							return addr_obj;
						}
						return undefined;
					}
				};
			}());

			return input_object;
		});
}());