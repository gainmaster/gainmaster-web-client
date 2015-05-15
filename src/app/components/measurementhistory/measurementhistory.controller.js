'use strict';

angular.module('gainmaster')
  .controller('MeasurementHistoryController', function ($scope, measurementFactory, accountFactory) {

    $scope.selectedMeasurement = '';
    $scope.direction = false;
    $scope.showArray = false;

    $scope.getArray = function() {
      measurementFactory.getMeasurement($scope.selectedMeasurement).then(function(response) {
        $scope.measurement = response;
        console.log($scope.measurement);
        $scope.showArray = true;
      });
    }

    $scope.sort = function(column) {
      if ($scope.orderProp === column) {
          $scope.direction = !$scope.direction;
        } else {
          $scope.orderProp = column;
          $scope.direction = false;
        }
    }

  });
