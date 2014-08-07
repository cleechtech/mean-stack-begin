var userCtrl = require('../controllers/user')

module.exports = function(app){
    
	// Users
    app.get('/api/users', userCtrl.all)
    app.get('/api/users/:username', userCtrl.viewOne)
    app.post('/api/users', userCtrl.create)
    app.put('/api/users/:username', userCtrl.update)
    app.delete('/api/users/:username', userCtrl.remove)


    // catch all angular route
    app.get('/*', function(req, res) {
	    res.sendfile('./public/index.html')
	})
}