'use strict';

angular.module('gainmaster').factory(
  'measurementFactory',
  function( $http, $q, OAuthToken, accountFactory) {

    var urlBase = 'http://api.hesjevik.im/';

    var measurementsHref = accountFactory.getMeasurementsHref();;
    var remoteData = [];




    // REST REQUESTS

    function addMeasurement(input){
      var request = $http({
        method: 'put',
        url: measurementsHref,
        headers: {
           'Authorization': 'Bearer ' + OAuthToken.getAccessToken(),
           'Content-type' : 'Application/Json'
        }
        ,data:{
            "property" : input.property
          , "magnitude": input.magnitude
          , "unit"     : input.unit
        }
      });
      return(request.then(handleSuccess, handleError));
    }

    function getMeasurement( property ) {
      var request = $http({
        method: 'get',
        url: measurementsHref +"/"+ property,
        headers: {
           'Authorization': 'Bearer ' + OAuthToken.getAccessToken()
        }
      });
    return(request.then(handleSuccess, handleError));
    }

    function getMeasurements() {
      var request = $http({
        method: 'get',
        url: measurementsHref,
        headers: {
           'Authorization': 'Bearer ' + OAuthToken.getAccessToken()
        }
      });
      return(request.then(handleSuccess, handleError));
    }


    //private internal functions

    function handleSuccess( response ) {
      return( response.data );
    }

    function handleError(response) {
      if (response.status == '401') {
        console.log('NOT ALLOWED');
      }
      console.log(response);
      //return ($q.reject(response.data.message));
    };

    function applyRemoteData( incomingData ) {
      remoteData = incomingData;
    }

    //Functions not listed here will be private
    return ({
      getMeasurement: getMeasurement,
      addMeasurement: addMeasurement,
      getMeasurements: getMeasurements
    });

  }
);
