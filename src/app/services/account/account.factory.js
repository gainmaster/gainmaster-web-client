'use strict';

angular.module('gainmaster').factory(
  'accountFactory',
  function( $http, $q ) {

    var urlBase       = 'http://api.hesjevik.im/';
    var usernameList  = [];
    var users         = [];
    var user          = [];
    var emailList     = [];

    function userHasToken() {
      if( user.token !== null ) {
        return true;
      }
      return false;
    }

    function addUser( name, username, password, email){
      addRemoteUser( name, username, password, email);

    }

    function getUsernameList(){
      usernameList = [];
      getUsers()
        .then( function (userData){applyRemoteData(userData);
        }).then(function (){generateUsernameList()});
      return usernameList;
    }

    function getEmailList(){
      emailList = [];
      getUsers()
        .then( function (userData){applyRemoteData(userData);
        }).then(function (){generateEmailList()});
      return emailList;
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



    function addRemoteUser( name, username, password, email){
      var request = $http({
      method: 'post',
      url: urlBase +'users/',
      headers: {'Content-Type': 'application/hal+json'},
      data: {
          name:name
        , username:username
        , email:email
        , password:password

      }
    });
      return(request.then(handleSuccess, handleError));
    }

    function handleSuccess( response ) {
      console.log("data: " + response.data);
      console.log("headers: " + response.headers);
      console.log("status: " + response.status);
      return( response.data );
    }

    function handleError( response ) {
      return( $q.reject( response.data.message ) );
    }

    function applyRemoteData( userData ) {
      users = userData;
    }

    function generateUsernameList(){
      for(var i = 0; i<users.numberOfElementsOnPage; i++){
        userList.push(users._embedded.users[i].username);
      }
    }

    function generateEmailList(){
        for(var i = 0; i<users.numberOfElementsOnPage; i++){
          emailList.push(users._embedded.users[i].email);

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
