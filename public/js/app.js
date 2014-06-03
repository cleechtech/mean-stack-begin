'use strict';

// TODO bootstrap application on page load

var app = angular.module('mean-stack-begin', [
	'ngRoute',
	'ngResource',
	'ngCookies'
]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider
		.when('/transporters', {
			templateUrl: 'views/transporters/index.html',
			controller: 'TransporterCtrl'
		})
		.when('/deliveries', {
			templateUrl: 'views/deliveries/index.html',
			controller: 'DeliveryCtrl'
		})
		.when('/', {
			templateUrl: 'views/partials/main.html',
			controller: 'MainCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
		
	$locationProvider.html5Mode(true);
}]);
