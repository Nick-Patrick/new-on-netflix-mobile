angular.module('newOnNetflix.directives')
  .directive('title', function () {
    return {
      restrict: 'E',
      scope: {},
      replace: 'true',
      templateUrl: './templates/title.html'
    };
  });

