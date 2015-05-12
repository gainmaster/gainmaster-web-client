
'use strict';

describe('Testing UserLoginController', function(){
  var $scope, $location, oauth, $controller;

  beforeEach(angular.mock.module('gainmaster'));

  //INJECT
  beforeEach(inject(function($rootScope, _$controller_, OAuth){
    $scope = $rootScope.$new();
    $controller = _$controller_;
    $controller('UserRegisterController', {$scope: $scope, $location: $location, OAuth: OAuth});
  }));

  //Register account
  it('should have function submitRegisterAccountForm', function() {
    expect(angular.isFunction($scope.submitRegisterAccountForm)).toBe(true);
  });

  it('ensure invalid email addresses are caught', function() {
    var invalidEmails = [
        'a@testcom',
        'a@ b.com',
        'a@b.com.',
        'a@b@a.com',
        ''
      ];
  });

  it('ensure valid email addresses pass validation', function() {
    var validEmails = [
        'aa@a.com',
        'abcd@asdf@no',
        'test39d0jasd-asdfdsf.dfdf@.dfdfef.com'
      ];
  });

  it('ensure invalid names are caught', function() {});
  it('ensure valid names pass validation', function() {});

  it('ensure invalid usernames are caught', function() {});
  it('ensure valid username pass validation', function() {});

  it('ensure invalid passwords are caught', function() {});
  it('ensure valid passwords pass validation', function() {});

});
