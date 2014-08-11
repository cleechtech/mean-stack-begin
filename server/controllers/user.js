var User = require('mongoose').model('User'),
	passport = require('passport'),
	encrypt = require('../utils/encryption');

module.exports = {

	getUsers: function(req, res){
		User.find({}).exec(function(err, usersCollection){
			res.send(usersCollection)
		})
	},

	createUser: function(req, res, next){
		var userData = req.body

		// lowercase username
		userData.username = userData.username.toLowerCase()

		userData.salt = encrypt.createSalt()
		userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password)

		// create user in db with mongoose
		User.create(userData, function(err, user){
			// check for errors
			if (err){
				// check if user is a duplicate
				// MongoDB error code here
				// MO MONEY MO PROBLEMS
				if (err.toString().indexOf('E11000') > -1){
					err = new Error('That username is already taken')
				}
				res.status(400)
				return res.send({ reason: err.toString()})
			}

			// no error. log user in (via passport), send to client
			req.logIn(user, function(err){
				if (err){ return next(err) }

				res.send(user)
			})

		})
	},

	updateUser: function(req, res){
		// get data from request
		var userUpdates = req.body

		// security check (is logged in and is not admin)
		if(req.user._id != userUpdates._id && !req.user.hasRole('admin')){
			res.status(403)
			console.log('failed security check')
			return res.end()
		}

		// update current user
		req.user.name = userUpdates.name
		req.user.username = userUpdates.username

		if(userUpdates.password && userUpdates.password.length > 0){
			// if they changed their password, make new hashed pwd
			req.user.salt = encrypt.createSalt()
			req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userUpdates.password)
		}

		// update database
		req.user.save(function(err){
			// error updating database
			if (err){
				res.status(400);
				return res.send({ reason: err.toString() })
			}

			res.send(req.user)
		})
	},

	// XHR post login
	logUserIn: function(req, res, next){
		req.body.username = req.body.username.toLowerCase()

		var auth = passport.authenticate('local', function(err, user){
			if (err) { return next(err) }
			if (!user){ res.send({ success: false }) }

			// user found, log them in
			req.logIn(user, function(err){
				if (err){ next(err) }
				res.send({ success: true, user: user })
			})
		})

		// passport authenticate creates a function
		auth(req, res, next)
	},

	logUserOut: function(req, res, next){
		req.logout()	// method added by passport
		res.end()	// end response
	}
};

// mongoose tips:
// =============
// Get total count of a particular field from all documents
// Suppose that each user has a votes field and you would like to count the total number of votes in your database across all users
// User.aggregate({ $group: { _id: null, total: { $sum: '$votes' } } }, function(err, votesCount) {
//   console.log(votesCount.total);
// });

// 5 most recent user accounts:
// User
//   .find()
//   .sort({ _id: -1 })
//   .limit(5)
//   .exec(function(err, users) {
//     console.log(users);
//   });

// query by author's name and book's title. If document is found that matches both fields, it will be returned in a callback:
// Book.findOne({ $and: [{ author: 'Richelle Mead' }, { title: 'Vampire Academy' }] }, function(err, book) {
// 	console.log(book);
// });
