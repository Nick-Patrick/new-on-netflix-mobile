angular.module('newOnNetflix.services')

  .factory('Netflix', function ($http, $q, $firebaseArray) {
    var netflixData;

    function getFromFirebase () {

    }

    function getAll () {
      var deferred = $q.defer();

      if (netflixData) {
        deferred.resolve(netflixData);
        return deferred.promise;
      }

      $http({
        method: 'GET',
        url: 'https://netflixtitles.firebaseio.com/netflix/months.json'
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
      all: getAll,
      getFromFirebase: getFromFirebase
    }

  });
