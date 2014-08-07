'use strict';

var app = angular.module('coderhunt', [
	'ngCookies',
	'ui.router',
	'restangular',
	'angularLocalStorage'
])

// routes
app.config(function($locationProvider, $stateProvider, $urlRouterProvider){
	$locationProvider.html5Mode(true)

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'home/home.html',
			controller: 'HomeCtrl'
		})
		.state('login', {
			url: '/login',
			templateUrl: 'user/login.html',
			controller: 'LoginCtrl'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: 'user/signup.html',
			controller: 'SignupCtrl'
		})

	$urlRouterProvider.otherwise('/')
})