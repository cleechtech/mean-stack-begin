'use strict';

// Declare app level module
window.app = angular.module('mean-stack-begin', [
	'ngRoute',
	'ngResource',
	'ngCookies',
	'ui.bootstrap',
	'ui.router',
	'mainController',
	'transporterController', 
	'transporterService', 
	'deliveryService', 
	'deliveryController'
]);

// TODO: bundle dependencies
//~ window.angular.module('dairyDesk.controllers', []);
//~ window.angular.module('dairyDesk.services', []);
