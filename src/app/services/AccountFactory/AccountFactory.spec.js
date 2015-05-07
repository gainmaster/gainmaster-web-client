'use strict';

describe('accountFactory', function(){
  var accountFactory;

  beforeEach(function () {
    module('gainmaster');

    inject(function(_accountFactory_) {
      accountFactory = _accountFactory_;
    });
  });

  it('should have an getUser function', function () {
    expect(angular.isFunction(accountFactory.getUser)).toBe(true);
  });

  it('should have an getUsers function', function () {
    expect(angular.isFunction(accountFactory.getUsers)).toBe(true);
  });

  it('should have an userHasToken function', function () {
    expect(angular.isFunction(accountFactory.userHasToken)).toBe(true);
  });


  it('should get result from getUser Function', function (){
    var result = accountFactory.getUser(1);
    expect(result.name).toBe('Kent Roger');
  });


});
