var houseTracking = angular.module('houseTracking', ['inputParser', 'requestCreator', "eventManager", "IDDistributor"])
  .config(function() {

  })
  .directive('list', function() {
  	return {
    	restrict: 'E',
  		templateUrl: '../view_snippets/property_list_pane/property_list_pane.html'
  	};
  })
  .directive('assignId', function() {
  	return {
  		restrict: 'A',
  		scope: {
  			id: '&getId'
  		},
  		link: function(scope, element, attributes) {
  			var id = scope.id();
  			element.attr("id", id);
  			element.on('click', function(event) {
  				window.alert(element.attr('id'));
  			});
  		}
  	};
  });