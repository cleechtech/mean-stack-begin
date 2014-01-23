angular.module('deliveryService', [])
	.factory('Delivery', function($http){
		return {
			get: function(){
				return $http.get('/api/deliveries');
			},
			create: function(deliveryData){
				return $http.post('/api/deliveries', deliveryData);
			},
			delete: function(id){
				return $http.delete('/api/deliveries/' + id);
			}
		}
	});
