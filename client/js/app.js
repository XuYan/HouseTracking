var houseTracking = angular.module('houseTracking', ['inputParser', 'requestCreator', "eventManager"])
  .config(function() {

  })
  .directive('list', function() {
  	return {
    	restrict: 'E',
  		templateUrl: '../view_snippets/property_list_pane/property_list_pane.html'
  	};
  });