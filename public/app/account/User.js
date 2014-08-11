'use strict'

app.service('User', ['$resource', function($resource){
	// User model
	var userResource = $resource('/api/users/:userId', { _id: '@id'}, {
		// PUT requets for updating user
		update: {
			method: 'PUT',
			isArray: false	// expect a single object
		}
	});

	// adds isAdmin to every instance of $resource
	userResource.prototype.isAdmin = function(){
		// users has 'admin' in their roles propery
		return this.roles && this.roles.indexOf('admin') > -1
	};

	return userResource;
}]);




// Restangular
// ===========

// app.service('User', function(Restangular){
// 	// specify api/ as base
// 	Restangular.allUrl('api')
//
// 	var users = Restangular.all('users')
//
// 	var allUsers = users.getList()
//
// 	var createUser = users.post({})
//
// 	var user = Restangular.one('users', 'dsjfndskjfndsjkf')
// 	return {}
// })
