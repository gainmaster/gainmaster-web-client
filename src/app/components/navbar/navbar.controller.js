'use strict';

angular.module('gainmaster')
  .controller('NavbarController', function($scope, $location, $window, OAuth, ipCookie) {
    $scope.date = new Date();

    $scope.isActive = function(viewLocation) {
      var active = (viewLocation === $location.path());
      return active;
    };

    $scope.isAuthenticated = function() {
      return OAuth.isAuthenticated();
    };

    $scope.logout = function() {
      OAuth.revokeToken().then(function(response) {
        ipCookie.remove('measurementshref');
        ipCookie.remove('selfhref');
        ipCookie.remove('username');
          $window.location.reload();
      });
    };
  });
