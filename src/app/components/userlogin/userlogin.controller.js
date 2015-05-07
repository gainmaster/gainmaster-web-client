'use strict';

angular.module('gainmaster')
  .controller('UserLoginController', function ($scope, UserLoginService, accountFactory) {

    $scope.username = "";
    $scope.password = "";
    $scope.submitted      = false;
    $scope.userData = [];
    var hashedPassword = "";

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
      accountFactory.getUser(ID)
        .then( function (userData){applyRemoteData(userData);
        });
    };

    function applyRemoteData( userData ) {
      $scope.userData = userData;
    }
  });
