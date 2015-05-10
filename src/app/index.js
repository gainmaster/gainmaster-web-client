'use strict';

angular.
module('gainmaster', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'mm.foundation', 'angular-oauth2', 'ipCookie'])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController'
      })
      .state('userlogin', {
        url: '/login',
        templateUrl: 'app/components/userlogin/userlogin.html',
        controller: 'UserLoginController'
      })
      .state('measurementregister', {
        url: '/measurementregister',
        templateUrl: 'app/components/measurementregister/measurementregister.html',
        controller: 'MeasurementRegisterController'
      })
      .state('measurementhistory', {
        url: '/measurementhistory',
        templateUrl: 'app/components/measurementhistory/measurementhistory.html',
        controller: 'MeasurementHistoryController'
      })
      .state('userregister', {
        url: '/register',
        templateUrl: 'app/components/userregister/userregister.html',
        controller: 'UserRegisterController'
      });

    $urlRouterProvider.otherwise('/');
    $httpProvider.defaults.useXDomain = true;
  })
  .config(['OAuthProvider', function(OAuthProvider) {
    OAuthProvider.configure({
      baseUrl: 'http://api.hesjevik.im',
      clientId: 'client',
      clientSecret: 'secret',
      grantPath: '/oauth/token',
      revokePath: '/oauth/revoke'
    });
  }])
  .config(['OAuthTokenProvider', function(OAuthTokenProvider) {
    OAuthTokenProvider.configure({
      name: 'mytoken',
      options: {
        secure: false
      }
    });
  }]);
