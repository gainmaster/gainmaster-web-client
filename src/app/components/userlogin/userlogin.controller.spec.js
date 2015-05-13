describe('Testing UserLoginController:', function(){

  beforeEach(angular.mock.module('gainmaster'));
  beforeEach(module('gulpAngular'));
  var $scope, $location, OAuth, $controller;

  //INJECT
  beforeEach(inject(function($compile, $templateCache, $rootScope, _$controller_, OAuth){
    $scope = $rootScope.$new();
    $controller = _$controller_;
    $controller('UserLoginController', {$scope: $scope, $location: $location, OAuth: OAuth});

    templateHtml = $templateCache.get('app/components/userlogin/userlogin.html')
    element = angular.element(templateHtml);
    $compile(element)($scope);
    loginform = $scope.loginForm;
    $scope.$apply()
  }));

  describe('test loginform ', function(){

    it('should pass  with valid username', function() {
      loginform.username.$setViewValue('aa');
      $scope.$digest();
      expect($scope.user.username).toEqual('aa');
      expect(loginform.username.$valid).toBe(true);
    });

    it('should not pass with unvalid username', function() {
      loginform.username.$setViewValue('a');
      $scope.$digest();
      expect($scope.user.username).toBeUndefined();
      expect(loginform.username.$valid).toBe(false);
    });

    it('should pass with valid password', function() {
      loginform.password.$setViewValue('aa');
      $scope.$digest();
      expect($scope.user.password).toEqual('aa');
      expect(loginform.password.$valid).toBe(true);
    });

    it('should not pass with unvalid password', function() {
      loginform.password.$setViewValue('a');
      $scope.$digest();
      expect($scope.user.password).toBeUndefined();
      expect(loginform.password.$valid).toBe(false);
    });
  });

});
