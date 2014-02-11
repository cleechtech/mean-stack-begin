// Transporter routes
var Transporter = require('../models/transporter');
var Delivery = require('../models/delivery');
var transportersCtrl = require('../controllers/transporters');

module.exports = function(app){

    // all transporters
    app.get('/api/transporters', function(req, res){
        Transporter.find(function(err, transporters){
            if(err) res.send(err);
            
            res.json(transporters);
        });
    });
    
    // create transporter
    app.post('/api/transporters', transportersCtrl.create);
    
    // edit transporter
    // http://pixelhandler.com/blog/2012/02/09/develop-a-restful-api-using-node-js-with-express-and-mongoose/
    app.put('/api/transporters/:transporter_id', function(req, res){
		return Transporter.findById(req.params.id, function(err, transporter){
			transporter.name = req.body.name;
			transporter.natl_id_num = req.body.natl_id_num;
			transporter.phone = req.body.phone;
			transporter.deliveries = req.body.deliveries;
			return transporter.save(function(err){
				if (!err){
					console.log('transporter updated!');
				} else {
					console.log(err);
				}
				return res.send(transporter);
			});
		});
	});
	
	// show transporter
	app.get('/api/transporters/:transporter_id', transportersCtrl.show);
	
    // delete transporter
    app.delete('/api/transporters/:transporter_id', transportersCtrl.destroy);
    
    app.param('transporter_id', transportersCtrl.transporter);
};
