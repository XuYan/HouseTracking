(function() {
	"use strict";
	angular.module("mapManager", ['IDPool'])
	.factory('map_manager', function(id_distributor) {
		var map_manager = (function() {
			var stores = {
				marker_store: {},
				route_store: {},
			}
      var route_data = {};
			return {
				icons: {
    				"Microsoft": "/resources/Google_Icon.png",
    				"Google": "/resources/Microsoft_Icon.png",
    				"movie_theater": "/resources/MovieTheatre_Icon.png",
    				"grocery_or_supermarket": "/resources/Store_Icon.png",
    				"house": "/resources/Home_Icon.png"
  				},
  				addMarker: function(id, marker) {
  					stores.marker_store[id] = marker;
  				},
  				getAll: function(store_name) {
  					var objs_on_map = [];
  					var store = stores[store_name];
  					// TODO: replace with Object.values(store) after upgrading to chrome 52
  					for (var id in store) {
  						if (store.hasOwnProperty(id)) {
  							objs_on_map.push(store[id]);
  						}
  					}
  					return objs_on_map;
  				},
  				clearMarkers: function() {
  					var markers = this.getAll("marker_store");
  					for (var i = 0; i < markers.length; i++) {
        				markers[i].setMap(null);
					}
  					stores.marker_store = {};
  				},
  				saveRouteRender: function(id, direction_renderer) {
  					stores.route_store[id] = direction_renderer;
  				},
  				clearRoutes: function() {
					var routes = this.getAll("route_store");
  					for (var i = 0; i < routes.length; i++) {
        			routes[i].setMap(null);
            }
  					stores.route_store = {};
  				},
  				// Assign a unique ID to each location object
  				addID: function(location_dict) {
  					var location_types = Object.keys(location_dict);
    				for (var t_index = 0; t_index < location_types.length; t_index++) {
      					var type = location_types[t_index];
      					var locations = location_dict[type].location; // location objects of given type 
      					for (var l_index = 0; l_index < locations.length; l_index++) {
        					locations[l_index].id = id_distributor.getID();
      					}
    				}
  				},
          saveRouteInfo: function(id, data) {
            route_data[id] = data;
          },
          clearRouteData: function() {
            route_data = {};
          }
			};
		}());

		return map_manager;
	});
})();