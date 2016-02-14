angular.module('newOnNetflix.controllers')
  .controller('TitleDetailsCtrl', function($scope, $stateParams, DateHelper, $cordovaLocalNotification, $ionicLoading, $ionicAnalytics, $ionicHistory) {
    $scope.title = $stateParams.title;
    console.log($scope);
    console.log($stateParams);

    $scope.windowObject = window;
    $scope.monthYear = DateHelper.getMonthAndYearByIndex(getTitleDate($scope.title).getMonth());

    $scope.addReminder = function (title) {
      var todayDate = new Date();
      var titleReleaseDate = getTitleDate(title);
      if (titleReleaseDate <= todayDate) {
        $ionicLoading.show({ template: title.Title + ' is already out!', noBackdrop: true, duration: 1400 });
        return false;
      }

      $scope.windowObject.localStorage['reminder' + title.Title] = $scope.windowObject.localStorage['reminder' + title.Title] !== 'true';
      if ($scope.windowObject.localStorage['reminder' + title.Title] === 'true') {
        addLocalNotification(title);
      }
    };

    function addLocalNotification (title) {
      $ionicAnalytics.track('Reminder Set', {
        item_id: 'lpdsx',
        item_name: title.Title + ' - Reminder set.'
      });

      var date = getTitleDate(title);

      $cordovaLocalNotification.isScheduled(title.Title + title.Year).then(function(isScheduled) {
        $ionicLoading.show({ template: 'Reminder set!', noBackdrop: true, duration: 1400 });

        $cordovaLocalNotification.schedule({
          id: title.Title + title.Year,
          at: date,
          text: "Released on Netflix today!",
          title: title.Title,
          icon: "http://streamsidekick.com/wp-content/uploads/2016/02/notificationIcon.png",
          sound: null,
          led: "BE272D"
        }).then(function () {
          console.log(title, "The notification has been set");
        });
      });

    }

    function getTitleDate (title) {
      var day = title.day;
      var monthYear = title.month;
      var month = monthYear.substring(0, title.month.length - 4);
      var monthIndex = DateHelper.getMonthIndexByName(month);
      var year = monthYear.substring(monthYear.length - 4, monthYear.length);
      return new Date(parseInt(year), monthIndex - 1, day);
    }

    $scope.myGoBack = function() {
      $ionicHistory.goBack();
    };

  }
);
