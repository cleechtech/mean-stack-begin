'use strict';

app.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', 'Identity', function($scope, $http, $location, notifier, Auth, Identity){
	$scope.identity = Identity
	$scope.signIn = function(username, password){
		Auth.authenticateUser(username, password).then(function(success){
			if(success){
				// show success notification
				// notifier.notify('You logged in successfully!')
				console.log('Great success!')
			} else {
				// notifier.error('Error logging in!')
				console.error('Boooooo :(')
			}
			$location.path('/')		// redirect
		})
	}

	$scope.logout = function(){
		Auth.logoutUser().then(function(){
			// reset fields
			$scope.username = ''
			$scope.password = ''
			// notifier.info('Log out successful!')
			$location.path('/')		// redirect
		})
	}
}])
