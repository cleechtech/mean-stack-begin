var dairyDesk = angular.module('dairyDesk', [
	'ngRoute',
	'ui.router',
	'transporterController', 
	'transporterService', 
	'deliveryService', 
	'deliveryController'
]);

dairyDesk.config(['$routeProvider', 
	function($routeProvider){
		$routeProvider
			.when('/transporters', {
				templateUrl: 'partials/transporters/index.html',
				controller: 'transporterController'
			})
			.when('/deliveries', {
				templateUrl: 'partials/deliveries/index.html',
				controller: 'deliveriesController'
			})
			.otherwise({
				redirectTo: ''
			});
	}
]);
