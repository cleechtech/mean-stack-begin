var mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 10,	// will default to 10 if not specified
	uniqueValidator = require('mongoose-unique-validator');

// schema
var userSchema = new mongoose.Schema({
	fname: { type: String, required: true },
	lname: { type: String, required: true },
	username: { type: String, required: true, index: { unique: true } },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, default: 'user' },
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
userSchema.pre('save', function(next){
	var user = this;

	// hash pwd if it has been modified or is new
	if(!user.isModified('password')) return next();

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if (err) return next(err);

		// hash the password along with our new salt
		bcrypt.hash(user.password, salt, function(err, hash){
			if (err) return next(err);

			// override the cleartext password with the hashed one
			user.password = hash
			next()
		})
	})
})

// methods for the model
userSchema.methods = {
	generatehash: function(password){
		return brcypt.hash(password, bcrypt.genSalt(SALT_WORK_FACTOR), null)
	},
	validPassword: function(password){

	},
	comparePassword: function(candidatePwd, cb){
		bcrypt.compare(candidatePwd, this.password, function(err, isMatch){
			if (err) return cb(err);

			cb(null, isMatch)
		})
	}
}

// register the model
module.exports = mongoose.model('User', userSchema)
