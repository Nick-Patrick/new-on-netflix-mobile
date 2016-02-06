angular.module('newOnNetflix.controllers')
  .controller('MovieListCtrl', function($scope, $stateParams, DateHelper, $firebaseObject, $firebaseArray, $location, $anchorScroll, $ionicScrollDelegate, $cordovaLocalNotification, $ionicLoading) {

    $scope.windowObject = window;
    init();

    function init () {
      setUser();
      setMonths();
      getViewMonth();
      getMonthsTitles();
    }

    function setUser () {
      Ionic.io();
      var user = Ionic.User.current();
      if (!user.id) {
        user.id = Ionic.User.anonymousId() + new Date().getTime().toString();
      }
      var push = new Ionic.Push({});
      push.register(function (token) {
        push.addTokenToUser(user);
      });
      user.save();
    }

    function setLoading () {
      $ionicLoading.show({
        template: 'Fetching Netflix Titles...'
      });
    }

    function removeLoading () {
      $ionicLoading.hide();
    }

    function getMonthsTitles () {
      var localData = false;
      if (window.localStorage && window.localStorage[$scope.thisMonth.month + 'data']) {
        localData = JSON.parse(window.localStorage[$scope.thisMonth.month + 'data']);
        $scope.data = localData;
        $scope.monthsTitles = localData;
      } else {
        setLoading();
      }

      var netflixFirebase = new Firebase('https://netflixtitles.firebaseio.com/netflix/months/' + $scope.thisMonth.month.toLowerCase() + $scope.thisMonth.year);
      netflixFirebase.authAnonymously(function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          $scope.data = $firebaseArray(netflixFirebase);

          if (!localData) {
            $scope.data.$loaded()
              .then(function () {
                $scope.monthsTitles = $scope.data;
                window.localStorage[$scope.thisMonth.month + 'data'] = JSON.stringify($scope.monthsTitles);
                removeLoading();
              })
              .catch(function (err) {
                console.log(err);
              });
          }

          netflixFirebase.orderByKey().on("value", function(snapshot) {
            $scope.$apply(function () {
              $scope.data = snapshot.val();
              $scope.monthsTitles = $scope.data;
              window.localStorage[$scope.thisMonth.month + 'data'] = JSON.stringify($scope.monthsTitles);
            });
          });
        }
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

    function getTitleDate (title) {
      var day = title.day;
      var monthYear = title.month;
      var month = monthYear.substring(0, title.month.length - 4);
      var monthIndex = DateHelper.getMonthIndexByName(month);
      var year = monthYear.substring(monthYear.length - 4, monthYear.length);
      return new Date(parseInt(year), monthIndex - 1, day);
    }

    function addLocalNotification (title) {
      var date = getTitleDate(title);

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

    $scope.scrollToToday = function () {
      var todayDate = DateHelper.getToday();
      $location.hash('day' + todayDate);
      var handle = $ionicScrollDelegate.$getByHandle('content');
      handle.anchorScroll();
    }

  });
