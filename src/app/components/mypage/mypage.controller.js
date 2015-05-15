'use strict';

angular.module('gainmaster')
  .controller('MypageController', function($scope, $controller, accountFactory) {

    angular.extend(this, $controller('BaseController', {$scope: $scope}));

    accountFactory.getUserInfo('steinar').then(function(response) {
      $scope.user = response;
    });
  });
