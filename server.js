// dependencies ============================
var express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	morgan = require('morgan'),
	mongoose = require('mongoose');

var database = require('./server/config/db_config');
var env = process.env.NODE_ENV || 'development'
var port = process.env.PORT || 3000;

var app = express();

// connect to database ============================
mongoose.connect(database.development.db)

// configure ============================
app.use(express.static(__dirname + '/public')); 		// set the static files location /client/img will be /img for users
						// log every request to the console
app.use(bodyParser()); 							// pull information from html in POST
app.use(methodOverride()); 						// simulate DELETE and PUT

// development only ============================
if (env === 'development') {
  app.use(morgan('development')); 
}

// ROUTES ============================
var router = express.Router();
router.use(function(req, res, next){
	// do this for every rout
	console.log('New route request');
	next();
})
require('./server/routes/transporter-api')(app);
require('./server/routes/delivery-api')(app);
require('./server/routes/routes')(app);	// keep this last

// start server ============================
app.listen(port);
console.log("Server started on port " + port);



// ===========================================================================
// ROUTING EXAMPLE : https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
// ===========================================================================
