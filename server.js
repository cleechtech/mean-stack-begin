// dependencies ============================
var express = require('express');
var mongoose = require('mongoose');
var database = require('./server/db_config');
var port  	 = process.env.PORT || 3000;

// create app ============================
var app = express();

// connect to database ============================
mongoose.connect(database.development.db)

// configure ============================
app.configure(function() {
		app.use(express.static(__dirname + '/client')); 		// set the static files location /client/img will be /img for users
		app.use(express.logger('dev')); 						// log every request to the console
		app.use(express.bodyParser()); 							// pull information from html in POST
		app.use(express.methodOverride()); 						// simulate DELETE and PUT
});

// development only ============================
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// load routes ============================
require('./server/routes/routes')(app);

// start server ============================
app.listen(port);
console.log("App listening on port " + port);
