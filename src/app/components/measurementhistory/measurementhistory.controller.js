'use strict';

angular.module('gainmaster')
  .controller('MeasurementHistoryController', function($scope, $controller, measurementFactory, accountFactory) {

    angular.extend(this, $controller('BaseController', {
      $scope: $scope
    }));

    $scope.selectedMeasurement = '';
    $scope.showArray = false;

    $scope.getArray = function() {
      measurementFactory.getMeasurement($scope.selectedMeasurement).then(function(response) {
        $scope.measurement = response;
        $scope.showArray = true;
      });
    };

    $scope.sort = function(column) {
      if ($scope.orderProp === column) {
        $scope.direction = !$scope.direction;
      } else {
        $scope.orderProp = column;
        $scope.direction = false;
      }
    };
  });
