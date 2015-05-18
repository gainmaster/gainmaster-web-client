'use strict';

angular.module('gainmaster')
  .controller('UserLoginController', function($scope, $location, OAuth, accountFactory, ipCookie) {

    $scope.submitted = false;
    $scope.userData;
    $scope.userLoggedIn = OAuth.isAuthenticated();
    $scope.user = {};


    $scope.submitLoginForm = function() {
      if ($scope.loginForm.$valid) {
        $scope.submitted = true;
        OAuth.getAccessToken($scope.user).then(function() {
          accountFactory.getUserInfo($scope.user.username).then(function(response) {
            applyRemoteData(response);
            $scope.userLoggedIn = OAuth.isAuthenticated();
            accountFactory.setSelfHref($scope.userData._links.self.href);
            accountFactory.setMeasurementsHref($scope.userData._links.measurements.href);
            accountFactory.setUsername($scope.user.username);
            $location.path('/');
          });
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.deleteCookie = function() {
      OAuth.revokeToken().then(function(response) {
        $scope.userLoggedIn = OAuth.isAuthenticated();
      });
    };

    function applyRemoteData(userData) {
      $scope.userData = userData;
    };

  });
