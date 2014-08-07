var mongoose = require('mongoose'),
	User = mongoose.model('User')

module.exports = {
	all: function(req, res){
		User.find(function(err, users){

		})
	},
	viewOne: function(req, res){
		User.findOne({ username: req.params.username })
			// same as using a callback
			.exec(function(err, user){

			})
	},
	create: function(req, res){
		var user = new User({
			// details
		})
		user.save(function(err){

		})
	},
	update: function(req, res){
		User.findOneAndUpdate()
	},
	remove: function(req, res){
		User.findOneAndRemove()
	}
}

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