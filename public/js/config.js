window.app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider
		.when('/transporters', {
			templateUrl: 'views/transporters/index.html',
			controller: 'transporterController'
		})
		.when('/deliveries', {
			templateUrl: 'views/deliveries/index.html',
			controller: 'deliveriesController'
		})
		.when('/', {
			templateUrl: 'views/partials/main.html',
			controller: 'mainController'
		})
		.otherwise({
			redirectTo: '/'
		});
		
	$locationProvider.html5Mode(true);
}]);
