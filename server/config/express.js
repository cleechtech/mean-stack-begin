var express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override')

module.exports = function(app, envConfig){

		app.use(bodyParser())
		app.use(methodOverride())	// allows app.put() and app.delete()

		// static routing to public directory
		app.use(express.static(envConfig.root + '/public'))
}