describe('Testing UserRegisterController:', function(){

  beforeEach(angular.mock.module('gainmaster'));
  beforeEach(module('gulpAngular'));
  var $scope, $location, $controller;

  //INJECT
  beforeEach(inject(function($compile, $templateCache, $rootScope, _$controller_){
    $scope = $rootScope.$new();
    $controller = _$controller_;
    $controller('UserRegisterController', {$scope: $scope, $location: $location});

    templateHtml = $templateCache.get('app/components/userregister/userregister.html')
    element = angular.element(templateHtml);
    $compile(element)($scope);
    registeruserform = $scope.registerAccountForm;
    $scope.$apply()
  }));

  describe('test registerUserform ', function(){

    it('should pass with valid name', function() {
      registeruserform.name.$setViewValue('aa');
      $scope.$digest();
      expect($scope.user.name).toEqual('aa');
      expect(registeruserform.name.$valid).toBe(true);
    });

    it('should pass  with valid username', function() {
      registeruserform.username.$setViewValue('aa');
      $scope.$digest();
      expect($scope.user.username).toEqual('aa');
      expect(registeruserform.username.$valid).toBe(true);
    });

    it('should pass with valid password', function() {
      registeruserform.password.$setViewValue('aa');
      $scope.$digest();
      expect($scope.user.password).toEqual('aa');
      expect(registeruserform.password.$valid).toBe(true);
    });

    it('should pass with valid repeatpassword', function() {
      registeruserform.password2.$setViewValue('aa');
      $scope.$digest();
      expect($scope.password2).toEqual('aa');
      expect(registeruserform.password2.$valid).toBe(true);
    });

    it('should pass with valid email', function() {
      registeruserform.name.$setViewValue('aa');
      $scope.$digest();
      expect($scope.user.name).toEqual('aa');
      expect(registeruserform.name.$valid).toBe(true);
    });

    it('should not pass with to short name', function() {
      registeruserform.name.$setViewValue('a');
      $scope.$digest();
      expect($scope.user.name).toBeUndefined();
      expect(registeruserform.name.$valid).toBe(false);
    });

    it('should not pass with to short username', function() {
      registeruserform.username.$setViewValue('a');
      $scope.$digest();
      expect($scope.user.username).toBeUndefined();
      expect(registeruserform.username.$valid).toBe(false);
    });

    it('should not pass with to short password', function() {
      registeruserform.password.$setViewValue('a');
      $scope.$digest();
      expect($scope.user.password).toBeUndefined();
      expect(registeruserform.password.$valid).toBe(false);
    });

    it('should not pass with to short repeat password', function() {
      registeruserform.password2.$setViewValue('a');
      $scope.$digest();
      expect($scope.password2).toBeUndefined();
      expect(registeruserform.password2.$valid).toBe(false);
    });

    it('should not pass with to short email', function() {
      registeruserform.email.$setViewValue('a');
      $scope.$digest();
      expect($scope.user.email).toBeUndefined();
      expect(registeruserform.email.$valid).toBe(false);
    });

    it('should remove spaces in username', function() {
      registeruserform.username.$setViewValue('a a');
      $scope.$digest();
      expect($scope.user.username).toEqual('aa');
      expect(registeruserform.username.$valid).toBe(true);
    });

    it('should remove spaces in password', function() {
      registeruserform.password.$setViewValue('a a');
      $scope.$digest();
      expect($scope.user.password).toEqual('aa');
      expect(registeruserform.password.$valid).toBe(true);
    });



  });

});
