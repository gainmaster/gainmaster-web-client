'use strict';

angular.module('gainmaster').factory(
  'tokenFactory',
  function($http, $q) {

    var urlBase = 'http://api.hesjevik.im/';
    var dataObject = [];

    function loginUser(username, password) {
      postTokenRequest(username, password)
        .then( function (userData) {
          applyRemoteData(userData)
        });

    }
    function postTokenRequest(username, password){
      //Test getting token
      var user = {
        username: 'steinar',
        password: 'steinar'
      }

      if(!OAuth.isAuthenticated()){
        console.log('User is not authenticated. Fetching token')
        OAuth.getAccessToken(user).then(function(response) {
          //token = response.data
          applyRemoteData(response.data);
          console.log('Has logged in, should be true');
          console.log(OAuth.isAuthenticated());
          $scope.authed = OAuth.isAuthenticated();
        });

      }else{
        if(OAuth.isAuthenticated()){console.log('user is really authenticated');}
        applyRemoteData('Already logged in. Logging out.');
        ipCookie.remove('mytoken');
        //OAuth.revokeToken(); //Will not work since we don't have a /revoke endpoint yet.
        console.log('Has logged out, should be false');
        console.log(OAuth.isAuthenticated());
      }

    }
    function applyRemoteData( receivedData ) {
      dataObject = receivedData;
      console.log("received data: " + dataObject);
    }

    function handleSuccess( response ) {
      return( response.data );
    }

    function handleError( response ) {
      return( $q.reject( response.data.message ) );
    }

    // Returns list of public functions
    return ({
      loginUser: loginUser

    });
  }
);
