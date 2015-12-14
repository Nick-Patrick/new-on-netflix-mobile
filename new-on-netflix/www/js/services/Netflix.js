angular.module('newOnNetflix.services')


  .factory('Netflix', function ($http, $q) {

    function getAll () {
      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: 'https://api.myjson.com/bins/32y5l'
      })
        .success(function (data, status) {
          if (status === 200) {
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


