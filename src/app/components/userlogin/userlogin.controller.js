'use strict';

angular.module('gainmaster')
  .controller('UserLoginController', function($scope, $location, OAuth, accountFactory) {

    $scope.submitted = false;
    $scope.userData = [];
    $scope.userLoggedIn = OAuth.isAuthenticated();
    $scope.user = {};


    $scope.submitLoginForm = function() {
      if ($scope.loginForm.$valid) {
        $scope.submitted = true;
          OAuth.getAccessToken($scope.user).then(function(response){
            applyRemoteData(response.data);
            $scope.userLoggedIn = OAuth.isAuthenticated();
            $location.path('/');
          });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.deleteCookie = function(){
      OAuth.revokeToken().then(function(response){
      $scope.userLoggedIn = OAuth.isAuthenticated();
      });
    }

    $scope.getUserInfo = function(){
        console.log(accountFactory.getUserInfo('steinar'));
    }

    function applyRemoteData(userData) {
      $scope.userData = userData;
    }

  });
