var path = require('path')
// var rootPath = path.resolve(__dirname + '../..')
// or
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    root: rootPath,
    db: 'mongodb://localhost/mean_begin',
    port: process.env.PORT || 3000
  },
  test: {
    root: rootPath,
    db: 'mongodb://localhost/mean_begin_test'
  },
  production: {
    root: rootPath,
    db: process.env.MONGOHQ_URL,
    port: process.env.PORT || 80
  }
}