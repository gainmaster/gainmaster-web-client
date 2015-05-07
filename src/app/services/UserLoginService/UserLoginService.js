'use strict';

angular.module('gainmaster').service(
  'UserLoginService',
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
      var encodedString = btoa('client:secret');

      var request = $http({
        method: 'post',
        headers: {'Authorization': 'Basic Y2xpZW50OnNlcnZlcg==',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Access-Control-Allow-Origin': '*'},
        url: urlBase + 'oauth/token',
        params: {
          action: 'add'
        },

        data: {
          grant_type:"password",
          username: username,
          password: password
        }
      });
      return(request.then(handleSuccess, handleError));

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
