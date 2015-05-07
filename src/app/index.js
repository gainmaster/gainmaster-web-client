'use strict';

angular.
  module('gainmaster', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'mm.foundation', 'oauth'])
    .config(function ($stateProvider, $urlRouterProvider) {
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
        .state('userregister', {
          url: '/register',
          templateUrl: 'app/components/userregister/userregister.html',
          controller: 'UserRegisterController'
        })
        ;

      $urlRouterProvider.otherwise('/');
    })
;
