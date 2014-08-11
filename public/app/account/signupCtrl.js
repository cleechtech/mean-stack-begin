'use strict'

app.controller('SignupCtrl', ['$scope', '$location', 'Auth', 'storage', function($scope, $location, Auth, notifier){
	// $scope.user = {}
	//
	// // store this in local storage
	// // https://github.com/agrublev/angularLocalStorage
	// storage.bind($scope, 'user')

	$scope.signup= function(){
		var newUser = {
			name: $scope.name,
			username: $scope.email,
			password: $scope.password
		}

		Auth.createUser(newUser)
			.then(function(){
				notifier.notify('Sign up successful!')
				$location.path('/')
			}, function(reason){
				// something is wrong
				notifier.error(reason)
			})
	}
}])
