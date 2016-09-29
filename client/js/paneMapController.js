houseTracking.controller('paneMapController', function paneMapController($scope, event_manager) {
  $scope.is_pane_open = false; // By default, hide property list pane
  $scope.getToggleButtonStyle = function() {
    return this.is_pane_open ? "fa-chevron-left" : "fa-chevron-right";
  };

  $scope.getPaneStyle = function() {
    return this.is_pane_open ? "" : "my_custom_container_hide";
  };

  $scope.getMapFrameStyle = function() {
    return this.is_pane_open ? "" : "map_extend";
  };
    
  setupEventListeners();

  function setupEventListeners() {
    var toggle_button = $('#paneToggler');
    event_manager.register(toggle_button, "click", function onToggleButtonClicked() {
      $scope.$apply(function() {
        $scope.is_pane_open = !$scope.is_pane_open; // flip pane state
      });
    });
  }
});