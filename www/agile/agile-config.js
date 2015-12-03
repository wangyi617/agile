var agile = angular.module('agile', ['ionic', 'restangular']);

agile.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      window.StatusBar.styleDefault();
    }
  });
});

// --------------------config------------------------

agile.config(function(RestangularProvider) {
  // window.localStorage.agile_url = 'http://a.anasit.com';
  window.localStorage.agile_url = '/api';
  RestangularProvider.setBaseUrl(window.localStorage.agile_url + '/api/v1');
  RestangularProvider.setDefaultHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + window.localStorage.auth_token,
  });
  RestangularProvider.setDefaultHttpFields({'cache': true, 'withCredentials': true});
  RestangularProvider.setMethodOverriders(['put', 'patch']);
});

agile.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'http://anasit.com/**',
    'http://api.anasit.com/**',
    'http://bbs.anasit.com/**',
    'http://www.anasit.com/**',
  ]);
});
