var houseTracking = angular.module('houseTracking', ['inputParser', 'requestCreator', "eventManager", "IDPool", "mapManager"])
  .config(function() {

  })
  .directive('assignId', ["id_distributor", function(id_distributor) {
    return {
      restrict: 'A',
      link: function(scope, element, attributes) {
        var id = id_distributor.getID();
        element.attr("id", id);
      }
    }
  }])
  .directive('pane', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: 'paneController'/*should be quoted*/,
      templateUrl: '../view_snippets/property_list_pane/pane.html'
    };
  })
  .directive('tab', function() {
    return {
      require: '^^pane',
      restrict: 'E',
      transclude: true,
      scope: {
        title: '@'
      },
      link: function(scope, element, attrs, paneCtrl) {
        paneCtrl.addTab(scope);
      },
      templateUrl: '../view_snippets/property_list_pane/tab.html'
    };
  })
  .directive('list', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        region: '@'
      },
      controller: 'listController',
      templateUrl: '../view_snippets/property_list_pane/list.html'
    };
  });