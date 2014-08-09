'use strict';

app.controller('SignupCtrl', function($scope, User, storage){
	$scope.user = {}

	// store this in local storage
	// https://github.com/agrublev/angularLocalStorage
	storage.bind($scope, 'user')

	// save user to database
	$scope.addUser = function(user){
		User.create(user)
		$scope.user = {}

		// reroute
	}
})