'use strict';

app.service('User', function(Restangular){
	// specify api/ as base
	Restangular.allUrl('api')
	
	var users = Restangular.all('users')

	var allUsers = users.getList()

	var createUser = users.post({})

	var user = Restangular.one('users', 'dsjfndskjfndsjkf')
	return {}
})
