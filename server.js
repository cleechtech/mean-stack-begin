var express = require('express'),
	app = express(),
	env = process.env.NODE_ENV || 'development',
	envConfig = require('./server/config/environments')[env]

// EXPRESS
require('./server/config/express')(app, envConfig)

// DATABASE
require('./server/config/mongoose')(envConfig)

// ROUTES
require('./server/routes/transporter-api')(app)
require('./server/routes/delivery-api')(app)
require('./server/routes/routes')(app)

// start server
app.listen(envConfig.port, function(){
	console.log("Server started on port " + envConfig.port)
})