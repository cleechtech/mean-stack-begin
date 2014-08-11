
app.service('Auth', ['$http', '$q', 'Identity', 'User', function($http, $q, Identity, User){
	return {
		authenticateUser: function(username, password){
			// returns a promise
			var deferred = $q.defer()

			// send request to server
			$http.post('/login', { username: username, password: password })
				.then(function(response){
					if(response.data.success){
						// put user object from server into client model..
						var user = new User()
						angular.extend(user, response.data.user)

						// set current user
						Identity.currentUser = user 	// has .isAdmin method
						deferred.resolve(true)
					} else {
						// error logging in
						deferred.resolve(false)
					}
				});

			return deferred.promise;
		},

		createUser: function(userData){
			var newUser = new User(userData)

			var dfd = $q.defer()

			newUser.$save().then(function(){
				// log user in
				Identity.currentUser = newUser

				dfd.resolve()
			}, function(response){
				// user not created, pass in reason
				dfd.reject(response.data.reason)
			})

			return dfd.promise
		},


		updateCurrentUser: function(newData){
			var dfd = $q.defer()

			// create new user object
			var updatedUser = angular.copy(Identity.currentUser)
			angular.extend(updatedUser, newData)

			updatedUser.$update()	// custom PUT request for our $resource
				.then(function(){
					// update current user
					Identity.currentUser = updatedUser

					dfd.resolve()
				}, function(reason){

					dfd.reject(reason)
				})
			return dfd.promise
		},

		logoutUser: function(){
			var dfd = $q.defer()
			// params must be added to post req or angular will turn it into a get
			$http.post('/logout', { logout: true }).then(function(){
				Identity.currentUser = undefined
				dfd.resolve()
			})
			return dfd.promise
		},

		routeAccessFor: function(role){
			// check that user has role
			if(Identity.userHasRole(role)){
				return true
			} else {
				// route change error
				return $q.reject('not authorized')
			}
		},
		authorizeUserForRoute: function(){
			if(Identity.isAuthenticated()){
				// if user is authenticated allow access to route
				return true
			} else {
				return $q.reject('not authorized')
			}
		}
	}
}]);
