angular.module('deliveryController', [])
	.controller('deliveryController', function($scope, $http){
		$scope.formData = {};
		
		$http.get('/api/deliveries')
            .success(function(data){
                $scope.deliveries = data;
            })
            .error(function(err){
                console.log('couldn\'t get /api/deliveries cuz: ' + err);
            });
            
        $scope.createDelivery = function(){
            $http.post('/api/deliveries', $scope.formData)
                .success(function(data){
                    $('input').val('');
                    $scope.deliveries = data;
                })
                .error(function(data){
                    console.log('couldn\'t post delivery: ' + err);
                });
        };
        
        $scope.deleteDelivery = function(id){
            $http.delete('/api/deliveries/' + id)
                .success(function(data){
                    $scope.deliveries = data;
                })
                .error(function(err){
                    console.log('Couldn\'t delete delivery: ' + err);
                });
        };
	});
