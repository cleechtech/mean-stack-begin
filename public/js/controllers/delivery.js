'use strict'

// all this crap should be in the service...............

app.controller('DeliveryCtrl', ['$scope', '$http', 'Delivery', function($scope, $http, Delivery){
		
	$scope.delivery = {};
	
	// get all deliveries
	$http.get('/api/deliveries')
		.success(function(data){
			// add all deliveries to deliveries scope
			$scope.deliveries = data;
		})
		.error(function(err){
			console.log('couldn\'t get /api/deliveries cuz: ' + err);
		});
	
	// $watch for changes to deliveries list
	// callback fires even when deliveries is undefined	
	$scope.$watch('deliveries', function(newDeliv){
		if(newDeliv){
			var deliveries = [];
			
			angular.forEach($scope.deliveries, function(deliv, index){
				deliveries.push(deliv.amount);	// currently deliv.amount is undefined
			});
			
			// draw something with d3 using 'deliveries' array..
			// http://www.ng-newsletter.com/posts/directives.html
			
		}
	});
	
	// create delivery
	$scope.addDelivery = function(transporterId){
		$scope.delivery.transporter = transporterId;
		
		$http.post('/api/deliveries', $scope.delivery)
			.success(function(data){
				$('input').val('');
				console.log($scope.delivery.amount.toString() + ' post to api/deliveries');
			})
			.error(function(data, err){
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
				// add json from server to deliveries scope
                $scope.deliveries = data;
            })
            .error(function(err){
                console.log('Couldn\'t delete delivery: ' + err);
            });
    };
}]);
