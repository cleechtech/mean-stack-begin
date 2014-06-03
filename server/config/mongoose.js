var mongoose = require('mongoose')

module.exports = function(envConfig){

  
  mongoose.connect(envConfig.db)
}
