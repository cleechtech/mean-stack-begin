var mongoose = require('mongoose'),
	uniqueValidator = require('mongoose-unique-validator');

var userSchema = new mongoose.Schema({
	fname: { type: String, required: true },
	lname: { type: String, required: true },
	username: { type: String, required: true, unique: true, index: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, default: 'user' }
})

// check for duplicat entries and report them as mongoose error
// https://github.com/blakehaswell/mongoose-unique-validator
userSchema.plugin(uniqueValidator, { message: 'Error: Expected {PATH} {VALUE} {TYPE} to be unique' });

// validation
userSchema.pre('save', function(next){

	// check check check
	if (true) next()
})

// methods for the model
userSchema.methods = {

}

// register the model
mongoose.model('User', userSchema)
