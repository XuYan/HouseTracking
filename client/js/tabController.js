houseTracking.controller('tabController', function tabController($scope, $rootScope, $element, event_manager) {
	var tab_index = $scope.$index;

	event_manager.register($element, "click", onTabChanged);
	
	function onTabChanged() {
		var active_tab = $scope.active_tab;
		if (tab_index !== active_tab.index) {
			active_tab.index = tab_index;
			$rootScope.$broadcast('onTabChange', {
				"region": $scope.region
			});
		}
	};
});