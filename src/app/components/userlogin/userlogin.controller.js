'use strict';

angular.module('gainmaster')
  .controller('UserLoginController', function($scope, $location, OAuth) {

    $scope.submitted = false;
    $scope.userData = [];
    $scope.userLoggedIn = OAuth.isAuthenticated();
    $scope.user = {};


    $scope.submitLoginForm = function() {
      $scope.loginForm.username.$setViewValue('aaaa');
      /*
      if ($scope.loginForm.$valid) {
        //hash n salt?
        $scope.submitted = true;

          OAuth.getAccessToken($scope.user).then(function(response){
          console.log(response.data);
            applyRemoteData(response.data);
            $scope.userLoggedIn = OAuth.isAuthenticated();
            $location.path('/');
          });
      } else {
        $scope.submitted = true;
        $scope.loginForm.username.$setViewValue('aaaa');
      }
      */
    };

    $scope.deleteCookie = function(){
      OAuth.revokeToken().then(function(response){
      console.log(response.data);
      console.log(OAuth.isAuthenticated());
      $scope.userLoggedIn = OAuth.isAuthenticated();
      });
    }

    function applyRemoteData(userData) {
      $scope.userData = userData;
    }
  });
