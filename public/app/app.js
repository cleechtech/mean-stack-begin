'use strict';

var app = angular.module('coderhunt', [
	'ngCookies',
	'ui.router',
	'restangular',
	'angularLocalStorage'
])

// routes
app.config(function($locationProvider, $stateProvider, $urlRouterProvider){
	$locationProvider.html5Mode(true);

	// used for 'resolve' functions
	var checkRole = {
		admin: {
			// inject Auth service
			auth: function(Auth){
				// return true or an unresolved promise (which will trigger routeChangeError)
				return Auth.routeAccessFor('admin')
			}
		},
		user: {
			auth: function(Auth){
				return Auth.authorizeUserForRoute()
			}
		}
	};

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
})
