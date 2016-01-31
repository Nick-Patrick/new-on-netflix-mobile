angular.module('newOnNetflix.controllers')
  .controller('MovieListCtrl', function($scope, $stateParams, DateHelper, $firebaseObject, $firebaseArray, $location, $anchorScroll, $ionicScrollDelegate) {
    $scope.windowObject = window;
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
        })
        .catch(function (err) {
          console.log(err);
        });

      netflixFirebase.on("value", function(snapshot) {
        $scope.$apply(function () {
          $scope.data = snapshot.val();
          $scope.monthsTitles = $scope.data;
        });
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

    $scope.addReminder = function (title) {
      $scope.windowObject.localStorage['reminder' + title.Title] = $scope.windowObject.localStorage['reminder' + title.Title] !== 'true';
      console.log(title);
    };

    $scope.scrollToToday = function () {
      var todayDate = DateHelper.getToday();
      $location.hash('day' + todayDate);
      var handle = $ionicScrollDelegate.$getByHandle('content');
      handle.anchorScroll();


    }

  });
