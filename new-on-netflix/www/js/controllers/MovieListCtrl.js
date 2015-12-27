angular.module('newOnNetflix.controllers')
  .controller('MovieListCtrl', function($scope, $stateParams, netflixTitles, DateHelper) {
    $scope.monthsTitles = [];
    setMonths();
    getViewMonth();
    getMonthsTitles();

    function getMonthsTitles () {
      console.log(netflixTitles);
      $scope.monthsTitles = netflixTitles[$scope.thisMonth.month.toLowerCase() + $scope.thisMonth.year];
      console.log($scope.monthsTitles);
    }

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
