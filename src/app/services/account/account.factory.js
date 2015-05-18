'use strict';

angular.module('gainmaster').factory(
  'accountFactory',
  function($http, $q, OAuthToken, ipCookie) {

    var url = 'http://api.hesjevik.im/users/';
    var selfHref;
    var measurementsHref;
    var username;

    //HREF REQUESTS

    function setMeasurementsHref(url){
      ipCookie('measurementshref', url);
    }
    function setSelfHref(url){
      ipCookie('selfhref', url);
    }

    function setUsername(username) {
      ipCookie('username', username);
    }

    function getMeasurementsHref(){
      return measurementsHref = ipCookie('measurementshref');
    }

    function getSelfHref(){

      return selfHref = ipCookie('selfhref');
    }

    function getUsername() {
      return username = ipCookie('username');
    }


    // REST REQUESTS
    function getUserInfo(username) {
        var request = $http({
          method: 'get',
          url: url + username,
          headers: {
             'Authorization': 'Bearer ' + OAuthToken.getAccessToken()
          }
        });
        return (request.then(handleSuccess, handleError));
    };

    function addUser(input) {
      var request = $http({
        method: 'post',
        url: 'http://api.hesjevik.im/users',
        headers: {
          'Content-Type': 'application/json'
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
      return response.data;
    };

    function handleError(response) {
      if (response.status == '401') {
        console.log('NOT ALLOWED');
      }
      console.log(response);
      //return ($q.reject(response.data.message));
    };

    //RETURN PUBLIC FUNCTIONS
    return ({
        getUserInfo: getUserInfo
      , addUser: addUser
      , getMeasurementsHref: getMeasurementsHref
      , setMeasurementsHref: setMeasurementsHref
      , getSelfHref: getSelfHref
      , setSelfHref: setSelfHref
      , getUsername: getUsername
      , setUsername: setUsername
    });
  }
);
