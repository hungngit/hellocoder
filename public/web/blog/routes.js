'use strict';

app.config(function ($stateProvider) {
  $stateProvider
    .state('index', {
        url: '', // Catch 'Admin Centre home page' Requests without '#' character.
        templateUrl: 'web/blog/modules/dashboard/dashboard-view.html',
        controller: 'DashboardCtrl as dashboardCtrl'
        // ,
        // resolve: {
	       //  mainService: function(MainService) {
	       //  	return MainService.initialize('readonly');
	       //  }
	    //}
    })
   ;
});
