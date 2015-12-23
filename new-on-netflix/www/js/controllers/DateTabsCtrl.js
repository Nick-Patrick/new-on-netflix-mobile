angular.module('newOnNetflix.controllers')
  .controller('DateTabsCtrl', function($scope, $stateParams, DateHelper) {
    setMonths();
    getViewMonth();

    function getViewMonth () {
      if ($stateParams.month === 'previous')  $scope.thisMonth = $scope.previousMonth;
      if ($stateParams.month === 'current')   $scope.thisMonth = $scope.currentMonth;
      if ($stateParams.month === 'next')      $scope.thisMonth = $scope.nextMonth;
    }

    function setMonths () {
      $scope.previousMonth = DateHelper.getPreviousMonth();
      $scope.currentMonth = DateHelper.getCurrentMonth();
      $scope.nextMonth = DateHelper.getNextMonth();
    }
  });
