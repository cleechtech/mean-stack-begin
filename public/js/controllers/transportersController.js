app.module('TransportersController', [])
    .controller('MainController', function($scope){
    
        $scope.transporters = [{name:'Joe'}, {name:'Fred'}];
    
        $scope.addTransporter = function(){
            $scope.transporters.push({ name: $scope.newTransporter.name});
        };

    });