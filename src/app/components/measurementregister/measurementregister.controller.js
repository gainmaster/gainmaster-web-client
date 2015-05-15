'use strict';

angular.module('gainmaster')
  .controller('MeasurementRegisterController', function ($scope, $controller, measurementFactory) {

    angular.extend(this, $controller('BaseController', {$scope: $scope}));

    $scope.submitted = false;
    $scope.selectedMeasurement = '';
    $scope.MeasurementInput = {
       property: ''
      ,magnitude:''
      ,unit:''
    }

    $scope.unitFilter = function(selected) {
      if(selected == 'Height') {
        return 'cm';
      }
      return 'gram';
    }
    $scope.submitRegisterMeasurementForm = function() {
      if ($scope.registerMeasurementForm.$valid) {
        $scope.submitted = true;
        //create array of measurement input
        $scope.MeasurementInput.property = $scope.selectedMeasurement;
        $scope.MeasurementInput.unit = $scope.unitFilter($scope.selectedMeasurement);
        measurementFactory.addMeasurement($scope.MeasurementInput);
      } else {
        $scope.submitted = true;
      }
    };
  });
