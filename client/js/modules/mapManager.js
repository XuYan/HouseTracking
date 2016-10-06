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
          // Get all markers or get all route polylines based on given store_name
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
          saveMarker: function(id, marker) {
            stores.marker_store[id] = marker;
          },
  				clearMarkers: function() {
  					var markers = this.getAll("marker_store");
  					for (var i = 0; i < markers.length; i++) {
        				markers[i].setMap(null);
					}
  					stores.marker_store = {};
  				},
          saveRoute: function(id, polylines) {
            stores.route_store[id] = polylines;
          },
          deleteRoute: function(id) {
            var polylines_to_delete = stores.route_store[id];
            for (var i = 0; i < polylines_to_delete.length; i++) {
              var polyline = polylines_to_delete[i];
              polyline.setMap(null);
            }

            delete stores.route_store[id];
          },
  				clearRoutes: function() {
					var routes = this.getAll("route_store");
  					for (var i = 0; i < routes.length; i++) {
              var route = routes[i];
              for (var j = 0; j < route.length; j++) {
                var segment = route[j];
                segment.setMap(null);
              }
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
          getRouteInfo: function(id) {
            return route_data[id];
          },
          deleteRouteInfo: function(id) {
            delete route_data[id];
          },
          clearAllRouteInfo: function() {
            route_data = {};
          },
          getMarkerForID: function(id) {
            return stores.marker_store[id];
          }
			};
		}());

		return map_manager;
	});
})();