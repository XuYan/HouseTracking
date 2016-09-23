(function() {
	"use strict";
	angular.module("eventManager", [])
		.factory('event_manager', function() {
			var event_manager = (function() {
				var eventStore = new EventStore();

				function EventStore() {
					this.event_element_mapping = {};
					this.element_event_mapping = {};

					this.add = function(event_type, element_id) {
						if (!this.event_element_mapping[event_type]) {
							this.event_element_mapping[event_type] = [];
						}
						if (!this.element_event_mapping[element_id]) {
							this.element_event_mapping[element_id] = [];
						}
						
						this.event_element_mapping[event_type].push(element_id);
						this.element_event_mapping[element_id].push(event_type);
					}

					this.remove = function(event_type, element_id) {
						var id_index = this.event_element_mapping[event_type].indexOf(element_id);
						if (id_index !== -1) {
							this.event_element_mapping[event_type].splice(id_index, 1);
							if (this.event_element_mapping[event_type].length === 0) {
								delete this.event_element_mapping[event_type];
							}
						}
						
						var type_index = this.element_event_mapping[element_id].indexOf(event_type); 
						if (type_index !== -1) {
							this.element_event_mapping[element_id].splice(type_index, 1);
							if (this.element_event_mapping[element_id].length === 0) {
								delete this.element_event_mapping[element_id];
							} 
						}
					}
				}

				// TODO: Complete the checking
				function validate(element_id) {
					return true;
				}

				return {
					register: function(element, event_type, callback) {
						var element_id = element.attr("id");
						var isValid = validate(element_id);
						if (isValid) {
							try {
								eventStore.add(event_type, element_id);
								element.on(event_type, callback); // Use event bubbling model
							} catch (exception) {
								console.log("Error when registering event handler...");
							}	
						}
					},
					unregister: function(element, event_type, callback) {
						var element_id = element.attr("id");
						var isValid = validate(element_id);
						if (isValid) {
							try {
								eventStore.remove(event_type, element_id);
								element.off(event_type, callback);
							} catch (exception) {
								console.log("Error when unregister event handler...");
							}	
						}
					}
				};
			}());

			return event_manager;
		});
}());