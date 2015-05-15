'use strict';

angular.module('gainmaster')
  .controller('MeasurementHistoryController', function ($scope, measurementFactory, accountFactory) {

    var measurementObject   = measurementFactory.getMeasurements();
    $scope.measurementArray = splitObject('all');
    $scope.weightArray      = splitObject('weight');
    $scope.heightArray      = splitObject('height;')

    $scope.selectedArray = 'all';
    $scope.orderProp = 'date';
    $scope.direction = false;

    $scope.showArray = function(selected) {

      return $scope.selectedArray == selected;
    }

    $scope.sort = function(column) {
      if ($scope.orderProp === column) {
          $scope.direction = !$scope.direction;
        } else {
          $scope.orderProp = column;
          $scope.direction = false;
        }
    }

    function splitObject(selected) {
      measurementObject = measurementFactory.getMeasurements();
      
    }

  });
