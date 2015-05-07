'use strict';

angular.module('gainmaster').factory(
  'accountFactory',
  function( $http, $q ) {

    var urlBase = 'http://api.hesjevik.im/';
    var userList = [];
    var users = [];

    function userHasToken() {
      if( user.token !== null ) {
        return true;
      }
      return false;
    }

    function addUser( username, password, email){
      var request = $http({
        method: 'post',
        url: urlBase +'users/',
        headers:{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },

        data: {
          name:'bjarneper',
          username:username,
          password:password,
          email:email
        }
      });
      return(request.then(handleSuccess, handleError));
    }


    function getUser( ID ) {
      var request = $http({
        method: 'get',
        url: urlBase +'users/' + ID,
        params: {
          action: 'get'
        }
      });
    return(request.then(handleSuccess, handleError));
    }

    function getUsers() {
      var request = $http({
        method: 'get',
        url: urlBase +'users/',
        params: {
          action: 'get'
        }
      });
      return(request.then(handleSuccess, handleError));
    }

    function getUsernameList(){
      getUsers()
        .then( function (userData){applyRemoteData(userData);
        }).then(function (){generateUsernameList()});
      return userList;
    }

    function handleSuccess( response ) {
      return( response.data );
    }

    function handleError( response ) {
      return( $q.reject( response.data.message ) );
    }

    function applyRemoteData( userData ) {
      users = userData;
    }

    function generateUsernameList(){
      console.log("generating list of: " + users.totalNumberOfElements);
      for(var i = 0; i<users.totalNumberOfElements; i++){
        userList.push(users._embedded.users[i].username);
      }
    }

    //Functions not listed here will be private
    return ({
      userHasToken: userHasToken,
      getUser: getUser,
      getUsers: getUsers,
      addUser: addUser,
      getUsernameList: getUsernameList
    });

  }
);
