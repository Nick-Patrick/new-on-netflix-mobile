angular.module('newOnNetflix.controllers')
  .controller('MovieListCtrl', function($scope, $stateParams, DateHelper, $firebaseObject, $firebaseArray, $location, $anchorScroll, $ionicScrollDelegate, $cordovaLocalNotification, $ionicLoading) {
    $scope.windowObject = window;
    setLoading();
    setMonths();
    getViewMonth();
    getMonthsTitles();

    function setLoading () {
      $ionicLoading.show({
        template: 'Fetching Netflix Titles...'
      });
    }

    function removeLoading () {
      $ionicLoading.hide();
    }

    function getMonthsTitles () {
      var netflixFirebase = new Firebase('https://netflixtitles.firebaseio.com/netflix/months/' + $scope.thisMonth.month.toLowerCase() + $scope.thisMonth.year);
      $scope.data = $firebaseArray(netflixFirebase);

      $scope.data.$loaded()
        .then(function () {
          $scope.monthsTitles = $scope.data;
          console.log($scope.monthsTitles);
          removeLoading();
        })
        .catch(function (err) {
          console.log(err);
        });

      netflixFirebase.orderByKey().on("value", function(snapshot) {
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

    function addLocalNotification (title) {
      var day = title.day;
      var monthYear = title.month;
      var month = monthYear.substring(0, title.month.length - 4);
      var monthIndex = DateHelper.getMonthIndexByName(month);
      var year = monthYear.substring(monthYear.length - 4, monthYear.length);
      var date = new Date(parseInt(year), monthIndex - 1, day);

      $cordovaLocalNotification.isScheduled(title.Title + title.Year).then(function(isScheduled) {
        $ionicLoading.show({ template: 'Reminder set!', noBackdrop: true, duration: 1400 });

        $cordovaLocalNotification.schedule({
          id: title.Title + title.Year,
          at: date,
          text: "Released on Netflix today!",
          title: title.Title,
          autoCancel: true,
          icon: "http://streamsidekick.com/wp-content/uploads/2016/02/notificationIcon.png",
          sound: null,
          led: "BE272D"
        }).then(function () {
          console.log(title, "The notification has been set");
        });
      });

    }

    $scope.addReminder = function (title) {
      $scope.windowObject.localStorage['reminder' + title.Title] = $scope.windowObject.localStorage['reminder' + title.Title] !== 'true';

      if ($scope.windowObject.localStorage['reminder' + title.Title] === 'true') {
        addLocalNotification(title);
      }
    };

    $scope.scrollToToday = function () {
      var todayDate = DateHelper.getToday();
      $location.hash('day' + todayDate);
      var handle = $ionicScrollDelegate.$getByHandle('content');
      handle.anchorScroll();


    }

  });
