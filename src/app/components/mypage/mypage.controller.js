'use strict';

angular.module('gainmaster')
  .controller('MypageController', function($scope, accountFactory) {

    accountFactory.getUserInfo('steinar').then(function(response) {
      $scope.user = response;
    });
  });
