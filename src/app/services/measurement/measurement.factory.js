'use strict';

angular.module('gainmaster').factory(
  'measurementFactory',
  function( $http, $q, OAuthToken) {

    var urlBase = 'http://api.hesjevik.im/';
    var measurements = [];
    var height = [];
    var weight = [];
    var remoteData = [];

    //public functions



    // private REST functions

    function addMeasurement(input){
      var request = $http({
        method: 'put',
        url: urlBase +'users/'+ 'steinar' +'/measurements',
        headers: {
           'Authorization': 'Bearer ' + OAuthToken.getAccessToken()
        }
        ,data:{
            'property' : input.property
          , 'magnitude': input.magnitude
          , 'unit'     : input.unit
        }
      });
      return(request.then(handleSuccess, handleError));
    }

    function getMeasurement( property ) {
      var request = $http({
        method: 'get',
        url: urlBase +'users/'+ 'steinar' +'/measurements/' + property,
        headers: {
           'Authorization': 'Bearer ' + OAuthToken.getAccessToken()
        }
      });
    return(request.then(handleSuccess, handleError));
    }

    function getMeasurements() {
      var request = $http({
        method: 'get',
        url: urlBase +'users/'+ 'steinar' +'/measurements',
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
