angular.module('deliveryController', [])
	.controller('deliveryController', function($scope, $http){
		
		$scope.todaysDeliveries = [];
		
		
		$http.get('/api/deliveries')
			.success(function(data){
				// add all deliveries to deliveries scope
				$scope.deliveries = data;
			})
			.error(function(err){
				console.log('couldn\'t get /api/deliveries cuz: ' + err);
			});
		
		$scope.addDelivery = function(deliveryAmount, transporterId){
			// create delivery object
			var data = {};
			data.date = Date.now();
			data.amount = deliveryAmount;
			data.transporter = transporterId;
			
			$http({
				url: '/api/deliveries', 
				data: data,
				method: 'POST',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
				.success(function(data, status, headers, config){
					$('input').val('');
					console.log(data + ' added');
				})
				.error(function(data){
					console.log('couldn\'t post delivery: ' + err);
				});
		};

        
        // add all transporters to transporters scope
        $http.get('/api/transporters')
            .success(function(data){
                $scope.transporters = data;
            })
            .error(function(err){
                console.log('couldn\'t get /api/transporters cuz: ' + err);
            });
        
        
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
