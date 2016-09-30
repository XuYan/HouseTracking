houseTracking.controller('paneController', function paneController($scope) {
  var tabs = $scope.tabs = [];
  var current_tab = undefined;

  $scope.select = function(tab) {
    if (current_tab !== tab) {
      console.log("Tab changes...");
      current_tab = tab;
      
      angular.forEach(tabs, function(tab) {
        tab.selected = false;
      });

      tab.selected = true;
      $scope.$broadcast("TabChange");
    }
  };

  this.addTab = function(tab) {
    if (tabs.length === 0) {
      $scope.select(tab);
    }
    tabs.push(tab);
  };
});