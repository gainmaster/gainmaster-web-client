'use strict';

angular.module('gainmaster')
  .controller('UserRegisterController', function($scope, accountFactory, $state) {

    $scope.submitted = false;
    $scope.user = {};


    $scope.submitRegisterAccountForm = function() {
      if ($scope.registerAccountForm.$valid) {
        $scope.submitted = true;
        //TODO: Proper hashfunction
        accountFactory.addUser($scope.user).then(function() {
          $state.go('userlogin');
        });
      } else {
        $scope.submitted = true;
      }
    };
  });
