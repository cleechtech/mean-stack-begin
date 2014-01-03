var app = angular.module('dairyDesk', []);

angular.module('dairyDesk', ['TransportersController']);

// app.config(function($routeProvider){
//     $routeProvider
//         .when('/transporters',
//             {
//                 controller: 'TransportersController',
//                 templateUrl: 'partials/transporters/index.html'
//             })
//         .otherwise({ redirectTo: '/' });
//             
// });