var express = require('express'),
	bodyParser = require('body-parser'),
	logger = require('morgan'),
	methodOverride = require('method-override');

module.exports = function(app, envConfig){
	if(envConfig.env === 'development'){
		app.use(logger('dev'));
	}

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(methodOverride())	// allows app.put() and app.delete()

	// static routing to public directory
	app.use(express.static(envConfig.root + '/public'))
};
