var mongoose = require('mongoose'),
  encrypt = require('../utils/encryption'),
	uniqueValidator = require('mongoose-unique-validator');

// schema
var userSchema = new mongoose.Schema({
	fname: { type: String, required: '{PATH} is required!' },
	lname: { type: String, required: '{PATH} is required!' },
	username: { type: String, required: '{PATH} is required!', index: { unique: true } },
	email: { type: String, required: '{PATH} is required!', unique: true },
	salt: { type: String, required: '{PATH} is required!' },
	hashed_pwd: { type: String, required: '{PATH} is required!' },
	roles: [String],

	// Account Locking
	// http://devsmash.com/blog/implementing-max-login-attempts-with-mongoose
	loginAttempts: { type: Number, required: true, default: 0 },
	lockUntil: { type: Number }
})

// plugins
// check for duplicat entries and report them as mongoose error
// https://github.com/blakehaswell/mongoose-unique-validator
userSchema.plugin(uniqueValidator, { message: 'Error: Expected {PATH} {VALUE} {TYPE} to be unique' });

// validation
// userSchema.pre('save', function(next){
// 	var user = this;
//
// 	// hash pwd if it has been modified or is new
// 	if(!user.isModified('password')) return next();
//
// 	// generate a salt
// 	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
// 		if (err) return next(err);
//
// 		// hash the password along with our new salt
// 		bcrypt.hash(user.password, salt, function(err, hash){
// 			if (err) return next(err);
//
// 			// override the cleartext password with the hashed one
// 			user.password = hash
// 			next()
// 		})
// 	})
// })

// methods for the model
userSchema.methods = {
	authenticate: function(passwordToMatch){
		// hash password, compare to database
		// this.salt == current user's salt
		return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
	},
	hasRole: function(role){
		return this.roles.indexOf(role) > -1
	}

}

// register the model
var User = mongoose.model('User', userSchema);









// create default users
exports.createDefaults = function(){
	User
		.find({})		// all documents from collection
		.exec(function(err, collection){
			// if no users in the collection
			if (collection.length === 0){
				var salt, hash
				salt = encrypt.createSalt()
				hash = encrypt.hashPwd(salt, 'connor')	// default user password is their name

				// create the default users
				User.create({
					name: 'coNnor JaMes lEEch',
					username: 'connorleech',
					salt: salt,
					hashed_pwd: hash,
					roles: ['admin']
				});
				salt = encrypt.createSalt()
				hash = encrypt.hashPwd(salt, 'jason')
				User.create({
					name: 'jason shark',
					username: 'jasonshark',
					salt: salt,
					hashed_pwd: hash
				})
			}
		})
}
