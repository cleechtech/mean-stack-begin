// transporters service is meant to interact with the node API
angular.module('transporterService', [])
    .factory('Transporter', function($http){
        // all return promise objects
        return {
            get: function(){
                return $http.get('/api/transporters');
            },
            create: function(transporterData){
                return $http.post('/api/transporters', transporterData);
            },
            delete: function(id){
                return $http.delete('/api/transporters/'+id);
            }
        }
    });