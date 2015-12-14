angular.module('newOnNetflix.controllers', [])

.controller('DashCtrl', function($scope, $stateParams, Netflix, DateHelper) {
  setMonths();
  getViewMonth();
  getMonthsTitles();

  console.log('asda');
  function getMonthsTitles () {
    console.log('here', $scope.thisMonth.month.toLowerCase() + $scope.thisMonth.year);
    Netflix.all().then(function (response) {
      $scope.monthsTitles = response.netflix.months[$scope.thisMonth.month.toLowerCase() + $scope.thisMonth.year];
    });
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
