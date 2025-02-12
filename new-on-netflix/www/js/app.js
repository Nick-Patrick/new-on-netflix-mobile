
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('newOnNetflix.controllers', []);
angular.module('newOnNetflix.services', []);
angular.module('newOnNetflix.directives', []);
angular.module('newOnNetflix', ['ionic','ionic.service.core', 'firebase', 'ngCordova',  'newOnNetflix.controllers', 'newOnNetflix.services', 'newOnNetflix.directives', 'ion-sticky', 'ionic.service.analytics'])

.run(function($ionicPlatform, $ionicAnalytics) {
  $ionicPlatform.ready(function() {
    $ionicAnalytics.register();
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    var admobid = {
      banner: 'ca-app-pub-3981028455625793/9868380111',
      interstitial: 'ca-app-pub-3981028455625793/9728779310'
    };

    if (window.AdMob) {
      AdMob.createBanner({
        adId:admobid.banner,
        position:AdMob.AD_POSITION.BOTTOM_CENTER,
        autoShow:true
      });
    }

    if (AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );
    if (AdMob) AdMob.showInterstitial();
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.previous', {
    url: '/previous',
    params: {
      month: 'previous'
    },
    views: {
      'tab-previous': {
        templateUrl: 'templates/movieList.html',
        controller: 'MovieListCtrl'
      }
    }
  })
  .state('tab.current', {
    url: '/current',
    params: {
      month: 'current'
    },
    views: {
      'tab-current': {
        templateUrl: 'templates/movieList.html',
        controller: 'MovieListCtrl'
      }
    }
  })
  .state('tab.next', {
    url: '/next',
    params: {
      month: 'next'
    },
    views: {
      'tab-next': {
        templateUrl: 'templates/movieList.html',
        controller: 'MovieListCtrl'
      }
    }
  })
  .state('titleDetails', {
    url: '/titleDetails',
    cache: false,
    params: {
      title: {}
    },
    templateUrl: 'templates/titleDetails.html',
    controller: 'TitleDetailsCtrl'
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/current');

});
