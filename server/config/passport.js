var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('../models/User');

module.exports = function(passport){
	// passport session setup - serialize and unserialize out of session
	passport.serializeUser(function(user, done){
		done(null, user.id)
	})

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user)
		})
	})

	// signup
	passport.use('local-signup', new LocalStrategy(
		function(username, password, done){
			User.findOne({ username: username }, function(err, user){
				if (err) return done(err);

				if (!user){
					return done(null, false, { message: 'Incorrect username' })
				}

				if(!user.validPassword(password)){
					return done(null, false, { message: 'Incorrect password' })
				}

				// create user etc here ...
				
				return done(null, user)
			})
		}
	))
}