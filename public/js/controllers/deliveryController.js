angular.module('deliveryController', [])
	.controller('deliveryController', function($scope, $http){
		$scope.formData = {};
		
		// get all deliveries to deliveries scope
		$http.get('/api/deliveries')
            .success(function(data){
                $scope.deliveries = data;
            })
            .error(function(err){
                console.log('couldn\'t get /api/deliveries cuz: ' + err);
            });
            
        // add all transporters to transporters scope
        $http.get('/api/transporters')
            .success(function(data){
                $scope.transporters = data;
            })
            .error(function(err){
                console.log('couldn\'t get /api/transporters cuz: ' + err);
            });
        
        // create delivery..
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
        
        // delete delivery..
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
