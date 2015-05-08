'use strict';

angular.module('gainmaster')
  .controller('MeasurementHistoryController', function ($scope, measurementFactory, accountFactory) {

    $scope.hellooo     = 'hellooo';
    $scope.weightArray = [{date:'idag', magnitude:'masse'},{date:'imorra', magnitude:'mindre'}];
    $scope.heightArray = [{date:'idag', magnitude:'liten'},{date:'imorra', magnitude:'stooor'}];
    $scope.userArray   = [{date:'idag', property:'wight',magnitude:'liten'},{date:'imorra', property:'hieght',magnitude:'stooor'}];
    $scope.userid      = 0;

    $scope.selectedArray = 'all';
    $scope.orderProp = 'date';
    $scope.direction = false;

    $scope.showArray = function(choice) {
      return $scope.selectedArray == choice;
    }

    $scope.sort = function(column) {
      if ($scope.orderProp === column) {
          $scope.direction = !$scope.direction;
        } else {
          $scope.orderProp = column;
          $scope.direction = false;
        }
    }


    $scope.getAllWeight = function(){
      accountFactory.getUser
      $scope.weightArray = measurementFactory.getProperty(userid, 'weight');
    }

    $scope.getAllHeight = function(){
      $scope.heightArray = measurementFactory.getProperty(userid, 'height');
    }

    $scope.getUserMeasurements = function(){
      $scope.heightArray = measurementFactory.getProperty(userid, 'height');
    }





  });
