var express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	passport = require('passport');

module.exports = function(app, envConfig){
	app.use(cookieParser())
	app.use(bodyParser())
	app.use(methodOverride())	// allows app.put() and app.delete()

	app.use(session({ secret: 'c0der14hUn!T@' }))
	app.use(passport.initialize())
	app.use(passport.session())		// persistent login sessions

	// static routing to public directory
	app.use(express.static(envConfig.root + '/public'))
};
