//window.app 
var app = angular.module('dairyDesk', []);

app.config(function($routeProvider){
    $routeProvider
        .when('/transporters',
            {
                controller: 'TransportersController',
                templateUrl: 'partials/transporters/index.html'
            })
        .otherwise({ redirectTo: '/' });
            
});