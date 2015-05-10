'use strict';

angular.module('gainmaster')
  .controller('UserLoginController', function($scope, UserLoginService, accountFactory, $http, OAuth) {

    $scope.username = '';
    $scope.password = '';
    $scope.submitted = false;
    $scope.userData = [];
    var hashedPassword = '';

    $scope.submitLoginForm = function() {
      if ($scope.loginForm.$valid) {
        //hash n salt?

        hashedPassword = $scope.password;
        $scope.submitted = true;
        UserLoginService.loginUser($scope.username, hashedPassword);
      } else {
        $scope.submitted = true;
      }
    };

    $scope.getUser = function(ID) {
      //accountFactory.getUser(ID)
      //  .then( function (userData){applyRemoteData(userData);
      //  });

      //Test getting token
      var user = {
        username: 'steinar',
        password: 'steinar'
      }

      OAuth.getAccessToken(user).then(function(response) {
        //token = response.data
        applyRemoteData(response.data);
      });
    };

    function applyRemoteData(userData) {
      $scope.userData = userData;
    }
  });
