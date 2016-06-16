'use strict';

app.config(function ($stateProvider) {
  $stateProvider
    .state('index', {
        url: '', // Catch 'Admin Centre home page' Requests without '#' character.
        templateUrl: 'dashboard/dashboard-view.html',
        controller: 'DashboardCtrl'
    });
});
