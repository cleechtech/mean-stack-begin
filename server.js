// dependencies ============================
var express = require('express');
var mongoose = require('mongoose');
var database = require('./config/db_config');
var port = process.env.PORT || 3000;

// create app ============================
var app = express();

// connect to database ============================
mongoose.connect(database.development.db)

// configure ============================
app.configure(function() {
	app.use(express.static(__dirname + '/public')); 		// set the static files location /client/img will be /img for users
	app.use(express.logger('dev')); 						// log every request to the console
	app.use(express.bodyParser()); 							// pull information from html in POST
	app.use(express.methodOverride()); 						// simulate DELETE and PUT
	app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
});

// development only ============================
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// load routes ============================
require('./app/routes/transporter')(app);
require('./app/routes/delivery')(app);
require('./app/routes/routes')(app);	// keep this last

// start server ============================
app.listen(port);
console.log("Server started on port " + port);



// ===========================================================================
// ROUTING EXAMPLE : https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
// ===========================================================================
