'use strict';

angular.module('gainmaster').factory(
  'measurementFactory',
  function($http, $q, OAuthToken, accountFactory) {

    //Get url to measurements
    var measurementsHref = accountFactory.getMeasurementsHref();

    // REST REQUESTS
    function getMeasurement(property) {
      var request = $http({
        method: 'GET',
        url: measurementsHref + "/" + property,
        headers: {
          'Authorization': 'Bearer ' + OAuthToken.getAccessToken()
        }
      });
      return (request.then(handleSuccess, handleError));
    };

    function getMeasurements() {
      var request = $http({
        method: 'get',
        url: measurementsHref,
        headers: {
          'Authorization': 'Bearer ' + OAuthToken.getAccessToken()
        }
      });
      return (request.then(handleSuccess, handleError));
    };

    function addMeasurement(input) {
      var request = $http({
        method: 'PUT',
        url: measurementsHref,
        headers: {
          'Authorization': 'Bearer ' + OAuthToken.getAccessToken(),
          'Content-type': 'application/json'
        },
        data: {
          property: input.property,
          magnitude: input.magnitude,
          unit: input.unit
        }
      });
      return (request.then(handleSuccess, handleError));
    };

    //Private internal functions
    function handleSuccess(response) {
      return (response.data);
    };

    function handleError(response) {
      if (response.status == '401') {
        console.log('NOT ALLOWED');
      }
      console.log(response);
    };

    //Public functions
    return ({
      getMeasurement: getMeasurement,
      addMeasurement: addMeasurement,
      getMeasurements: getMeasurements
    });
  }
);
