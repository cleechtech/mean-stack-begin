'use strict';

var app = angular.module('coderhunt', [
	'ui.router',
	'Satellizer',
	'mgcrea.ngStrap',
	'ngResource',
	'ngMessages',
	'restangular',	// switch to this.
	'angularLocalStorage'
])

// routes
app.config(function($authProvider, $locationProvider, $stateProvider, $urlRouterProvider){

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'app/home/home.html',
			controller: 'HomeCtrl'
		})
		.state('login', {
			url: '/login',
			templateUrl: 'app/account/login.html',
			controller: 'LoginCtrl'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: 'app/account/signup.html',
			controller: 'SignupCtrl'
		})

	$urlRouterProvider.otherwise('/')

	$authProvider.facebook({
		clientId: '636702029715779'
	});
});