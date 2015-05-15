'use strict';

angular.module('gainmaster')
  .controller('MypageController', function($scope, accountFactory, measurementFactory) {

    accountFactory.getUserInfo('steinar').then(function(response) {
      $scope.user = response;
      console.log($scope.user);
    });

    measurementFactory.getMeasurements().then(function(response) {
      $scope.measurements = response;
      console.log($scope.measurements);
    })

  });
