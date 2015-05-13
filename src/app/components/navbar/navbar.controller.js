'use strict';

angular.module('gainmaster')
  .controller('NavbarController', function($scope, $location, OAuth) {
    $scope.date = new Date();

    $scope.isActive = function(viewLocation) {
      var active = (viewLocation === $location.path());
      return active;
    };

    $scope.isAuthenticated = function() {
      return OAuth.isAuthenticated();
    };

    $scope.logout = function() {
      OAuth.revokeToken();
    };
  });
