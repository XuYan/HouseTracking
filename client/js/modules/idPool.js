(function() {
	"use strict";
	angular.module("IDPool", [])
		.factory('id_distributor', function() {
			var next_available_id = 0;
			var id_distributor = (function() {
				return {
					getID: function() {
						return next_available_id++;
					}
				};
			}());

			return id_distributor;
		});
}());