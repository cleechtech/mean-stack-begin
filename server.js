// dependencies ============================
var express = require('express');
var mongoose = require('mongoose');
var database = require('./server/db_config');
var port  	 = process.env.PORT || 3000;

// validation: https://github.com/chriso/node-validator

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







// ===========================================================================
// ROUTING EXAMPLE : https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
// ===========================================================================

//~ var express = require('express');
//~ var app = express();
//~ 
//~ app.use('/js', express.static(__dirname + '/js'));
//~ app.use('/dist', express.static(__dirname + '/../dist'));
//~ app.use('/css', express.static(__dirname + '/css'));
//~ app.use('/partials', express.static(__dirname + '/partials'));
//~ 
//~ app.all('/*', function(req, res, next) {
    //~ // Just send the index.html for other files to support HTML5Mode
    //~ res.sendfile('index.html', { root: __dirname });
//~ });
//~ 
//~ app.listen(3006); //the port you want to use
