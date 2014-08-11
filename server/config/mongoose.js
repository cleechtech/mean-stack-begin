var mongoose = require('mongoose'),
	User = require('../models/User')

module.exports = function(envConfig){

  // load models ..

  mongoose.connect(envConfig.db);

	User.createDefaults();
}
