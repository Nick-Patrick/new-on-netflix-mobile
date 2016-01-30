angular.module('newOnNetflix.controllers')
  .controller('MovieListCtrl', function($scope, $stateParams, DateHelper, $firebaseObject, $firebaseArray) {
    $scope.monthsTitles = {
      days: [
        {
          title: 'fetching'
        }
      ]
    };
    setMonths();
    getViewMonth();
    getMonthsTitles();

    function getMonthsTitles () {
      var netflixFirebase = new Firebase('https://netflixtitles.firebaseio.com/netflix/months/' + $scope.thisMonth.month.toLowerCase() + $scope.thisMonth.year);
      $scope.data = $firebaseArray(netflixFirebase);

      $scope.data.$loaded()
        .then(function () {
          $scope.monthsTitles = $scope.data;
          //$scope.monthsTitles = $scope.data[$scope.thisMonth.month.toLowerCase() + $scope.thisMonth.year];
          console.log('big->', $scope.monthsTitles);
        })
        .catch(function (err) {
          console.log(err);
        });

      netflixFirebase.on("value", function(snapshot) {
        $scope.$apply(function () {
          $scope.data = snapshot.val();
          $scope.monthsTitles = $scope.data;
          //$scope.monthsTitles = $scope.data.months[$scope.thisMonth.month.toLowerCase() + $scope.thisMonth.year];
          console.log($scope.monthsTitles);
        });
      });


      //console.log(netflixTitles);
      //$scope.monthsTitles = netflixTitles[$scope.thisMonth.month.toLowerCase() + $scope.thisMonth.year];
      //console.log($scope.monthsTitles);
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
