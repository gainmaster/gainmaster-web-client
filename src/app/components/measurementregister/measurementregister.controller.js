'use strict';

angular.module('gainmaster')
  .controller('MeasurementRegisterController', function ($scope, measurementFactory) {

    $scope.heightinput  = 0;
    $scope.weightinput  = 0;
    $scope.submitted = false;

    $scope.submitRegisterMeasurementForm = function() {
      if ($scope.registerMeasurementForm.$valid) {
        $scope.submitted = true;
        //create array of measurement input
        measurementFactory.addMeasurements();
      } else {
        $scope.submitted = true;
      }
    };




  });
