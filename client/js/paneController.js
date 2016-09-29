houseTracking.controller('paneController', ['$scope', function paneController($scope) {
  $scope.property_data = ["redmond", "bellevue"];
  $scope.my_array = [1,2,3];

  var tabs = $scope.tabs = [];

  $scope.select = function(tab) {
    angular.forEach(tabs, function(tab) {
      tab.selected = false;
    });

    tab.selected = true;
  };

  this.addTab = function(tab) {
    if (tabs.length === 0) {
      $scope.select(tab);
    }
    tabs.push(tab);
  };
}]);