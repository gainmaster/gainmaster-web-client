'use strict';

angular.module('gainmaster')
  .controller('BaseController', function($scope, $rootScope, $state, OAuth) {
    $rootScope.$on('oauth:error', function(event, rejection) {

      // Ignore `invalid_grant` error - should be catched on `LoginController`.
      if ('invalid_grant' === rejection.data.error) {
        return;
      }

      // Refresh token when a `invalid_token` error occurs.
      if ('invalid_token' === rejection.data.error) {
        //return OAuth.getRefreshToken();
        return;
      }

      console.log(rejection.data.error);
      return;
    });

    if (!OAuth.isAuthenticated()) $state.go('userlogin'); // go to login
    
  });
