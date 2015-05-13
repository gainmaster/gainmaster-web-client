'use strict';

describe('accountFactory', function(){
  var accountFactory;

  beforeEach(function () {
    module('gainmaster');

    inject(function(_accountFactory_) {
      accountFactory = _accountFactory_;
    });
  });

  it('should have an getUserInfo function', function () {
    expect(angular.isFunction(accountFactory.getUserInfo)).toBe(true);
  });
});
