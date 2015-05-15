'use strict';

angular.module('gainmaster')
  .controller('MypageController', function($scope, $controller, accountFactory, measurementFactory) {

    angular.extend(this, $controller('BaseController', {$scope: $scope}));

    accountFactory.getUserInfo(accountFactory.getUsername()).then(function(response) {
      $scope.user = response;
    });

    measurementFactory.getMeasurements().then(function(response) {
      $scope.measurements = response;
    })

  });
