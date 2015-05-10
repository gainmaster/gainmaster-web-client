'use strict';

angular.module('gainmaster')
  .controller('UserLoginController', function($scope, UserLoginService, accountFactory, $http, OAuth, ipCookie) {

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

      if(!OAuth.isAuthenticated()){
        console.log('User is not authenticated. Fetching token')
        OAuth.getAccessToken(user).then(function(response) {
          //token = response.data
          applyRemoteData(response.data);
        });

      }else{
        applyRemoteData('Already logged in. Logging out.');
        ipCookie.remove('mytoken');
        //OAuth.revokeToken(); //Will not work since we don't have a /revoke endpoint yet.
      }
    };

    function applyRemoteData(userData) {
      $scope.userData = userData;
    }
  });
