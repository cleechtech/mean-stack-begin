
// Authentication

app.factory('Identity', ['$window', 'User', function($window, User){
	var currentUser;

	// if the currentUserObj was supplied from the server
	if(!!$window.currentUserObj){

		currentUser = new User();

		// extend the object with info from the server
		angular.extend(currentUser, $window.currentUserObj);
	}

	return {
		currentUser: currentUser,
		isAuthenticated: function(){
			// this === parent object
			return !!this.currentUser
		},
		userHasRole: function(role){
			return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1
		}
	}
}])
