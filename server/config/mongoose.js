var mongoose = require('mongoose');

// register models
require('../models/User');

module.exports = function(envConfig){
  mongoose.connect(envConfig.db);
};
