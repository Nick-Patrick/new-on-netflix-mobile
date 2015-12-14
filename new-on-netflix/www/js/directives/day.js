angular.module('newOnNetflix.directives')
  .directive('day', function () {
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: './templates/day.html'
    };
  });

