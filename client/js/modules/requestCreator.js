(function() {
	"use strict";
	angular.module("requestCreator", [])
	.factory('request_creator', function() {
		var req_creator_object = (function() {
			return {
				create: function(base_url, param_obj) {
						var request_url = base_url;
						var param_names = Object.keys(param_obj);
						console.log(param_obj);
						for (let i = 0; i < param_names.length; i++) {
							var delimeter = (i == 0) ? "?" : "&";
							var param_name = param_names[i];
							request_url += encodeURI(delimeter + param_name + "=" + param_obj[param_name]);
						}

						return request_url;
					}
			};
		}());

		return req_creator_object;
	});
})();