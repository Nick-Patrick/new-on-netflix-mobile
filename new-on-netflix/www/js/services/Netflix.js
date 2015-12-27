angular.module('newOnNetflix.services')

  .factory('Netflix', function ($http, $q) {

    var netflixData;

    function getAll () {
      var deferred = $q.defer();

      if (netflixData) {
        deferred.resolve(netflixData);
        return deferred.promise;
      }

      $http({
        method: 'GET',
        url: 'https://dazzling-inferno-1134.firebaseio.com/netflix.json'
      })
        .success(function (data, status) {
          if (status === 200) {
            netflixData = data;
            deferred.resolve(data);
          }
        })
        .error(function (data, status) {
          deferred.reject(status, data);
        });

      return deferred.promise;
    }

    return {
      all: getAll
    }

  });
