'use strict';

angular.module('gainmaster').factory(
  'measurementFactory',
  function( $http, $q ) {

    var urlBase = 'http://api.hesjevik.im/';
    var measurements = [];
    var height = [];
    var weight = [];
    var remoteData = [];

    //public functions

    function addMeasurements(formArray){
    //split array to fit remote http call
    }


    function getMeasurements(){
      getMeasurementsFromRemote()
        .then( function (incomingData){applyRemoteData(incomingData);
        }).then(function (){generateMeasurementsArray()});
      return measurements;
    }
    function getMeasurement(){
      getMeasurementsFromRemote()
        .then( function (incomingData){applyRemoteData(incomingData);
        }).then(function (){generateMeasurementsArray()});
      return measurements;
    }
    // private REST functions

    function addMeasurementToRemote(ID, property, magnitude, unit){
      var request = $http({
        method: 'post',
        url: urlBase +'/users/'+ ID +'/measurements',
        data:{
            'property' : property
          , 'magnitude': magnitude
          , 'unit'     : unit
        }


      });
      return(request.then(handleSuccess, handleError));
    }

    function getMeasurementFromRemote( ID, property ) {
      var request = $http({
        method: 'get',
        url: urlBase +'/users/'+ ID +'/' + property,
        params: {
          action: 'get'
        }
      });
    return(request.then(handleSuccess, handleError));
    }

    function getMeasurementsFromRemote(ID) {
      var request = $http({
        method: 'get',
        url: urlBase +'/users/'+ ID +'/measurements',
        params: {
          action: 'get'
        }
      });
      return(request.then(handleSuccess, handleError));
    }


    //private internal functions

    function handleSuccess( response ) {
      return( response.data );
    }

    function handleError( response ) {
      return( $q.reject( response.data.message ) );
    }

    function applyRemoteData( incomingData ) {
      remoteData = incomingData;
    }

    function generateUsernameList(){
      for(var i = 0; i<users.totalNumberOfElements; i++){
        userList.push(users._embedded.users[i].username);
      }
    }

    //Functions not listed here will be private
    return ({
      getMeasurement: getMeasurement,
      addMeasurements: addMeasurements,
      getMeasurements: getMeasurements
    });

  }
);
