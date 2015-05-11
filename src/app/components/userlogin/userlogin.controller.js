'use strict';

angular.module('gainmaster')
  .controller('UserLoginController', function($scope, tokenFactory, accountFactory, $http, OAuth, ipCookie) {

    $scope.submitted = false;
    $scope.userData = [];
    var hashedPassword = '';
    $scope.authed = OAuth.isAuthenticated();
    $scope.user = {};

    $scope.submitLoginForm = function() {
      if ($scope.loginForm.$valid) {
        //hash n salt?
        hashedPassword = $scope.user.password;
        $scope.submitted = true;
        tokenFactory.loginUser($scope.user.username, hashedPassword);
      } else {
        $scope.submitted = true;
      }
    };

    $scope.getUser = function(ID) {
      //accountFactory.getUser(ID)
      //  .then( function (userData){applyRemoteData(userData);
      //  });



    };

    function applyRemoteData(userData) {
      $scope.userData = userData;
    }
  });
