var dairyDesk = angular.module('dairyDesk', [
	'ngRoute',
	'ui.router',
	'mainController',
	'transporterController', 
	'transporterService', 
	'deliveryService', 
	'deliveryController'
]);

dairyDesk.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider){
		$routeProvider
			.when('/transporters', {
				templateUrl: 'partials/transporters/index.html',
				controller: 'transporterController'
			})
			.when('/deliveries', {
				templateUrl: 'partials/deliveries/index.html',
				controller: 'deliveriesController'
			})
			.when('/main', {
				templateUrl: 'partials/main.html',
				controller: 'mainController'
			})
			.otherwise({
				redirectTo: ''
			});
		
		$locationProvider.html5Mode(true);
	}]);
