'use strict';

angular.module('gainmaster')
  .controller('UserRegisterController', function ($scope, accountFactory) {

    $scope.password2  = '';
    $scope.user       = {};

    $scope.submitted    = false;
    $scope.userExist    = false;
    $scope.userData     = [];
    $scope.users        = [];
    $scope.usernameList = [];
    var hashedPassword  = '';

    $scope.submitRegisterAccountForm = function() {
      if ($scope.registerAccountForm.$valid) {
        $scope.submitted = true;
        if(findUsername()!==true) {
          hashedPassword = $scope.user.password;
          $scope.userExist = false;
          var userToRegister ={
              name: $scope.user.name
            , username: $scope.user.username
            , password: hashedPassword
            , email: $scope.user.email}
            console.log(userToRegister);
          accountFactory.addUser(userToRegister);
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
      for(var i = 0; i<$scope.usernameList.length; i++){
        console.log("comparing with: " + $scope.usernameList[i]);
       if($scope.usernameList[i] === $scope.username) {
         return true;
       }
      }
      return false;

    }

  });
