// middleware to check if user is authenticated
exports.requiresApiLogin = function(req, res, next){
	if( !req.isAuthenticated() ){	// passport method
		// not authenticated, send them home
		res.render('index', {
			currentUser: req.user
		})
	} else {
		next()
	}
}

exports.requiresRole = function(role){
	return function(req, res, next){
		// user not authenticated or role is not found
		if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1){
			// not authenticated, send them home
			res.render('index', {
				currentUser: req.user
			})
		} else {
			next()
		}
	}
}