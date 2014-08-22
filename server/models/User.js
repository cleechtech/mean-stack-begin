var mongoose = require('mongoose');

// schema
var userSchema = new mongoose.Schema({
	email: { type: String, unique: true, lowercase: true },
	password: String,
	firstName: String,
	lastName: String,
	facebook: String,
	github: String,
	linkedin: String
});

// validation
userSchema.pre('save', function(next){
	var user = this;

	// hash pwd if it has been modified or is new
	if(!user.isModified('password')) return next();

	// generate a salt
	bcrypt.genSalt(10, function(err, salt){
		if (err) return next(err);

		// hash the password along with our new salt
		bcrypt.hash(user.password, salt, function(err, hash){
			if (err) return next(err);

			// override the cleartext password with the hashed one
			user.password = hash
			next();
		})
	})
})

// methods for the model
userSchema.methods.comparePassword = function(password, done){
	bcrypt.compare(password, this.password, function(err, isMatch){
		done(err, isMatch);
	})
};

// register the model
mongoose.model('User', userSchema);
