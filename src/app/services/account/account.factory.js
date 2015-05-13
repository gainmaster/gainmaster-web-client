'use strict';

angular.module('gainmaster').factory(
  'accountFactory',
  function($http, $q, OAuthToken) {

    var url = 'http://localhost:8080/users/';
    var headers = {
      'Authorization': 'Bearer ' + OAuthToken.getAccessToken()
    };

    //REQUESTS
    function getUserInfo(username) {
        var request = $http({
          method: 'GET',
          url: url + username,
          headers
        });
        return (request.then(handleSuccess, handleError));
    };

    function addUser(input) {
      var request = $http({
        method: 'post',
        url: urlBase + 'users/',
        headers: {
          'Content-Type': 'application/hal+json'
        },
        data: {
          name: input.name,
          username: input.username,
          email: input.email,
          password: input.password
        }
      });
      return (request.then(handleSuccess, handleError));
    };

    //RESPONSE HANDLING
    function handleSuccess(response) {
      console.log("status: " + response.status);
      console.log(response.data)
      return response.data;
    };

    function handleError(response) {
      if (response.status == '401') {
        console.log('NOT ALLOWED');
      }
      console.log(response);
      //return ($q.reject(response.data.message));
    };

    //PUBLIC FUNCTIONS
    return ({
      getUserInfo: getUserInfo,
      addUser: addUser,
    });
  }
);
