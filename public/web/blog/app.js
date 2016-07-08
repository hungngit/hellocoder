'use strict';

// var app = angular.module('mmApp', [
//   'ui.router',
//   'ui.bootstrap',
//   'ngFileUpload',
//   'checklist-model',
//   'angular-jwt',
//   'frapontillo.bootstrap-switch',
//   'ngSanitize',
//   'ui.select',
//   'ui.tree',
//   'ngDragDrop',
//   'darthwade.loading',
//   'ui.bootstrap.datetimepicker',
//   'ng.shims.placeholder',
//   'tmh.dynamicLocale',
//   'daterangepicker',
//   'angular-timeline',
//   'angular-carousel'
// ]);

var app = angular.module('hellocoderApp', [
  'ui.router',
  'ui.bootstrap',
  'angular-jwt',
  'darthwade.loading'
]);

app.constant("Constants", {
  "MAX_LOGIN_ATTEMPTS_COUNT": 3
});

app.config(function ($urlRouterProvider, jwtInterceptorProvider, $httpProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/404');

  // Please note we're annotating the function so that the $injector works when the file is minified
  jwtInterceptorProvider.tokenGetter = ['$rootScope', function($rootScope) {
    return $rootScope.AuthToken;
  }];

    // Added no cache on http call in IE to prevent cached issue fired at MM-3025
    if (Util.isIE()) {

        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        //disable IE ajax request caching
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
        // extra
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    }

  // $locationProvider.html5Mode(true);
  $httpProvider.interceptors.push('jwtInterceptor');
  $httpProvider.interceptors.push('authInterceptor');
});

app.run(function($rootScope, $location, $state, $uibModalStack, jwtHelper, tokenService, $loading, CONSTANTS) {
  $rootScope.CONSTANTS= CONSTANTS;
  $rootScope.Util= Util;
  $rootScope.preference = {
    lang: 'VI'
  };
    
  $rootScope.servicePrefix = '/api';
  $rootScope.saveUserData = tokenService.saveUserData;
  $rootScope.tokenSave = tokenService.tokenSave;
  $rootScope.tokenGet = tokenService.tokenGet;
  $rootScope.tokenDelete = tokenService.tokenDelete;
  $rootScope.isAdmin = tokenService.isAdmin;
  // $rootScope.isMerchantAdmin = tokenService.isMerchantAdmin;
  // $rootScope.isMMUser = tokenService.isMMUser;
  // $rootScope.isMerchantUser = tokenService.isMerchantUser;
  // $rootScope.isSelf = tokenService.isSelf;
  // $rootScope.isPendingMerchant = tokenService.isPendingMerchant;
  // $rootScope.isInactiveMerchant = tokenService.isInactiveMerchant;
  //$rootScope.pageSide = 'admin';
  $rootScope.isPlainPages = tokenService.isPlainPages;

  $rootScope.signoutCleanup = tokenService.signoutCleanup;
  
  $rootScope.currentYear = moment().format('YYYY');

  if ($location.search().cc) {
    var pCC = $location.search().cc;
    $rootScope.language = pCC;
    sessionStorage.setItem('sessionLang', pCC);
    delete $location.$$search.cc;
    $location.$$compose();
  }
  
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    $state.previous = fromState;
    $state.previous.params = fromParams;
    // save the fromState and fromParams to $rootScope for use in some scenarios (e.g. logout).
    $rootScope.fromState = fromState;
    $rootScope.fromParams = fromParams;
    $uibModalStack.dismissAll();
  });

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    ////Migrated to routechangeChane start and support angualr 1.3 style rediredt via async
    var AuthToken = sessionStorage.getItem('AuthToken');
    var UserData = sessionStorage.getItem('UserData');

    $rootScope.language = "EN";
    var sessionLang = sessionStorage.getItem('sessionLang');
    if( sessionLang != null ){
      $rootScope.language = sessionLang;
    };

    if (AuthToken != null && UserData != null) {
      var payload = JSON.parse( UserData );

      if( payload.CultureCode ){
        if( payload.CultureCode !== $rootScope.language ){
          //update to DB
          if( $rootScope.language !== "EN" ){

            changeLanguageMain.change($rootScope.User.UserKey, $rootScope.language);
            if($rootScope.User && $rootScope.User.CultureCode){
              $rootScope.User.CultureCode = $rootScope.language;
            }

          }else{
              $rootScope.language = payload.CultureCode;
              sessionStorage.setItem('sessionLang', payload.CultureCode);
          }
        }
      }

      if(!payload.IsMm){
        event.preventDefault();
        //remove token if not permitted
        $rootScope.AuthToken = null;
        sessionStorage.removeItem('AuthToken');
        $rootScope.$broadcast('invalid.platform.login');
        $state.go('login');
      }
    }else {
      if (toState.authenticate) {
        event.preventDefault();
        $rootScope.$evalAsync(function() {
          $state.go('login');
        });
      }
    }
    
    if(Util.isIE()){
        $rootScope.$on('$viewContentLoaded', function() {
            $('body').updatePolyfill();
        });
    }

    // if ($rootScope.language === "CHS") {
    //   tmhDynamicLocale.set('zh-cn');
    // } else if ($rootScope.language === "CHT") {
    //   tmhDynamicLocale.set('zh-tw');
    // } else {
    //   tmhDynamicLocale.set('default');
    // }
  });

  $rootScope.isActive = function(viewLocation){
    return _.any(viewLocation, function (v) {
      return $state.current.url.indexOf(v) === 0;
    });
  };

  // now execute token get to make sure we have the most recent token!!!
  $rootScope.tokenGet(true);

  //loading spinner configuration setting
  var config = {
    // active: false, // Defines current loading state
    text: '', // Display text
    // className: '', // Custom class, added to directive
    overlay: false, // Display overlay
    spinner: true, // Display spinner
    spinnerOptions: {
      // lines: 12, // The number of lines to draw
      // length: 7, // The length of each line
      // width: 4, // The line thickness
      // radius: 10, // The radius of the inner circle
      // rotate: 0, // Rotation offset
      // corners: 1, // Roundness (0..1)
      // color: '#000', // #rgb or #rrggbb
      // direction: 1, // 1: clockwise, -1: counterclockwise
      // speed: 2, // Rounds per second
      // trail: 100, // Afterglow percentage
      // opacity: 1 / 4, // Opacity of the lines
      // fps: 20, // Frames per second when using setTimeout()
      // zIndex: 2e9, // Use a high z-index by default
      // className: 'dw-spinner', // CSS class to assign to the element
      top: '280', // Center vertically
      left: '628', // Center horizontally
      position: 'fixed' // Element position
    }
  };
  $loading.setDefaultOptions(config);
});
