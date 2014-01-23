angular.module('transporterController', [])
    .controller('mainController', function($scope, $http){
        $scope.formData = {};
        
        $http.get('/api/transporters')
            .success(function(data){
                $scope.transporters = data;
            })
            .error(function(err){
                console.log('couldn\'t get /api/transporters cuz: ' + err);
            });
            
        $scope.createTransporter = function(){
            $http.post('/api/transporters', $scope.formData)
                .success(function(data){
                    $('input').val('');
                    $scope.transporters = data;
                })
                .error(function(data){
                    console.log('couldn\'t post transporter: ' + err);
                });
        };
        
        $scope.deleteTransporter = function(id){
            $http.delete('/api/transporters/' + id)
                .success(function(data){
                    $scope.transporters = data;
                })
                .error(function(err){
                    console.log('Couldn\'t delete transporter: ' + err);
                });
        };
        
    });
