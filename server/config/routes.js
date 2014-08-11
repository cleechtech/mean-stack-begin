var usersCtrl = require('../controllers/user'),
  passport = require('passport'),
  rolesUtil = require('../utils/roles');

module.exports = function(app){

  // Users
  app.get('/api/users', rolesUtil.requiresRole('admin'), usersCtrl.getUsers)
  app.post('/api/users', usersCtrl.createUser)
  app.put('/api/users', usersCtrl.updateUser)

	app.post('/login', usersCtrl.logUserIn)
	app.post('/logout', usersCtrl.logUserOut)

  // app.get('/api/users/:username', userCtrl.viewOne)
  // app.put('/api/users/:username', userCtrl.update)
  // app.delete('/api/users/:username', userCtrl.remove)

  // not found error for undefined API routes
	app.all('/api/*', function(req, res){
		res.send(404)
	})

  // Everything else
  app.get('/*', function(req, res) {
    res.sendfile('./public/index.html')
  })
}
