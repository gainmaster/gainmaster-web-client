'use strict';

angular.module('gainmaster')
  .controller('NavbarController', function ($scope, $location) {
    $scope.date = new Date();

    $scope.isActive = function (viewLocation) {
     var active = (viewLocation === $location.path());
     return active;
    };

  });
