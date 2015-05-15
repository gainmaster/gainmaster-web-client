'use strict';

angular.module('gainmaster')
  .controller('MypageController', function($scope, $controller, accountFactory, measurementFactory) {

    angular.extend(this, $controller('BaseController', {$scope: $scope}));

    accountFactory.getUserInfo('steinar').then(function(response) {
      $scope.user = response;
      console.log($scope.user);
    });

    measurementFactory.getMeasurements().then(function(response) {
      $scope.measurements = response;
      console.log($scope.measurements);
    })

  });
