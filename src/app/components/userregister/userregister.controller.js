'use strict';

angular.module('gainmaster')
  .controller('UserRegisterController', function ($scope, accountFactory) {

    $scope.username = "";
    $scope.password = "";
    $scope.password2 = "";
    $scope.email = "";

    $scope.submitted      = false;
    $scope.userData = [];
    $scope.users = [];
    $scope.userExist = false;
    $scope.usernameList = [];
    var hashedPassword = "";

    $scope.submitRegisterAccountForm = function() {
      if ($scope.registerAccountForm.$valid) {
        $scope.submitted = true;
        console.log("running usernametest");
        if(findUsername()!==true) {
          hashedPassword = $scope.password;
          $scope.userExist = false;
          accountFactory.addUser($scope.username, hashedPassword, $scope.email );
        }else{
          $scope.userExist = true;
        }
      } else {
        $scope.submitted = true;
      }
    };

    $scope.getUsernameList = function() {
      $scope.usernameList = accountFactory.getUsernameList();
    };


    function findUsername(){
      $scope.getUsernameList();
      console.log("usersize: " + $scope.usernameList.length);
      for(var i = 0; i<$scope.usernameList.length; i++){
        console.log("comparing username: " + $scope.usernameList[i] + " with " +  $scope.username);
       if($scope.usernameList[i] == $scope.username) {
         return true;
       }
      }
      return false;

    }

  });
