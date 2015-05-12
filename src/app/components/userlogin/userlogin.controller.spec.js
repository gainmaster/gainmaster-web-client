

describe('Testing UserLoginController', function(){
  var $scope, $location, oauth, $controller;

  beforeEach(angular.mock.module('gainmaster'));

  //INJECT
  beforeEach(inject(function($compile, $rootScope, _$controller_, OAuth){
    $scope = $rootScope.$new();
    $controller = _$controller_;
    $controller('UserLoginController', {$scope: $scope, $location: $location, OAuth: OAuth});

    var element = angular.element(
      '<form name="loginForm">' +
      '<input ng-model="user.username" name="username" ng-minlength="2" />' +
      '</form>'
    );
    $scope.model = { username: null }
    $compile(element)($scope);
    loginform = $scope.loginForm;



  }));
  describe('username', function() {
    it('should pass with valid input', function() {
      loginform.username.$setViewValue('aa');
      $scope.$digest();
      expect($scope.user.username).toEqual('aa');
      expect(loginform.username.$valid).toBe(true);
    });
    it('should not pass with unvalid input', function() {
      loginform.username.$setViewValue('a');
      $scope.$digest();
      expect($scope.user.username).toBeUndefined();
      expect(loginform.username.$valid).toBe(false);
    });
  });
  //logging in
  it('should have function submitLoginForm', function() {
    expect(angular.isFunction($scope.submitLoginForm)).toBe(true);
  });

  it('ensure invalid usernames are caught', function() {
    var invalidusernames = [
        'a'
      , 'a b'
      , ''
      ];
  });
  it('ensure valid username pass validation', function() {
    var validusernames = [
        'ab'
      , 'abc'
      , 'ab-c'
      ];
  });

  it('ensure invalid passwords are caught', function() {
    var invalidpasswords = [
        'a'
      , 'a b'
      , ''
      ];
  });
  it('ensure valid passwords pass validation', function() {
    var validpasswords = [
        'ab'
      , 'a@b'
      ];
  });


  it('should have function deleteCookie', function() {
    expect(angular.isFunction($scope.deleteCookie)).toBe(true);
  });


  it('store input in user array', function() {
    $scope.user.username = 'steinar';
    $scope.user.password = 'steinar';
    expect($scope.user).toEqual(Object({"username":"steinar","password":"steinar"}));
  });


});
