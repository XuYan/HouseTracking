var houseTracking = angular.module('houseTracking', ['inputParser', 'requestCreator'])
  .config(function() {

  })
  .directive('yanxu', function() {
  	return {
    	restrict: 'E',
  		templateUrl: '../view_snippets/property_list_pane/property_list_pane.html'
  	};
  });