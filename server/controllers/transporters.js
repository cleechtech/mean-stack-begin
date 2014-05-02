// Transporter controller
var mongoose = require('mongoose'),
	Transporter = mongoose.model('Transporter');

module.exports = {
	// show all transporters
	all: function(req, res){
		Transporter.find(function(err, transporters){
			if(err) res.send(err);
			res.json(transporters);
		});
	},
	// show individual transporter
	show: function(req, res){
		Transporter.findById(req.params.transporter_id, function(err, transporter){
			if (err) res.send(err);
			res.json(transporter);
		})
	},
	// delete transporter
	destroy: function(req, res){
	  Transporter.remove({
	  	_id: req.params.transporter_id
	  }, function(err, transporter){
	    	if (err) {
				res.send(err);
			} else {
				// return all Transporters
				Transporter.find(function(err, transporters){
					if(err) res.send(err);   
					res.json(transporters);
				});
			}
	  });
	},
	// create transporter
	create: function(req, res){
		var transporter = new Transporter(req.body);
		transporter.deliveries = req.body.deliveries;
		// save new transporter
		transporter.save(function(err, transporter, numAffected){
			// return json of all Transporters
			Transporter.find(function(err, transporters){
				res.jsonp(transporters);
			});
		});
	},
	// update transporter
	update: function(req, res){
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
	}
};