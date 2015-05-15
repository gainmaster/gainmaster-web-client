'use strict';

angular.module('gainmaster')
  .controller('UserRegisterController', function ($scope, accountFactory) {

    $scope.password2  = '';
    $scope.user       = {};

    $scope.submitted    = false;
    $scope.user = {};


    $scope.submitRegisterAccountForm = function() {
      if ($scope.registerAccountForm.$valid) {
        $scope.submitted = true;
        //TODO Proper hashfunction
          accountFactory.addUser(user).then(function (){
            OAuth.getAccessToken($scope.user);
              $location.path('/');
          });
      } else {
        $scope.submitted = true;
      }
    };



  });
