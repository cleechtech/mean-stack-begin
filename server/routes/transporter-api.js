// Transporter routes
var Transporter = require('../models/transporter');
var Delivery = require('../models/delivery');
var transportersCtrl = require('../controllers/transporters');

module.exports = function(app){

    app.route('/api/transporters')
    	// all transporters
    	.get(transportersCtrl.all)
    	// create transporter
 		.post(transportersCtrl.create);
	
	app.route('/api/transporters/:transporter_id')
		// show transporter
		.get(transportersCtrl.show)
    	// delete transporter
    	.delete(transportersCtrl.destroy)
    	// edit transporter
    	// http://pixelhandler.com/blog/2012/02/09/develop-a-restful-api-using-node-js-with-express-and-mongoose/
    	.put(transportersCtrl.update);
};
