/*!
 * Module dependencies.
 */

var path = require('path')
var rootPath = path.resolve(__dirname + '../..')

/**
 * Expose config
 */

module.exports = {
  development: {
    root: rootPath,
    //db: 'mongodb://localhost/your_app_db_dev',
    db: 'mongodb://ame:ame@mongo.onmodulus.net:27017/qurawu3R'
  },
  test: {
    root: rootPath,
    db: 'mongodb://localhost/your_app_db_test'
  },
  staging: {
    root: rootPath,
    db: process.env.MONGOHQ_URL
  },
  production: {
    root: rootPath,
    db: process.env.MONGOHQ_URL
  }
}