angular.module('newOnNetflix.directives')
  .directive('title', function () {
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: './templates/title.html'
    };
  });

