var path = require('path'),
  rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    env: 'development',
    root: rootPath,
    db: 'mongodb://localhost/mean_begin',
    port: process.env.PORT || 3000
  },
  test: {
    root: rootPath,
    db: 'mongodb://localhost/mean_begin_test'
  },
  production: {
    env: 'production',
    root: rootPath,
    db: process.env.MONGOHQ_URL,
    port: process.env.PORT || 80
  }
}
