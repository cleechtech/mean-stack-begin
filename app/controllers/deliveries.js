// Deliveries controller
var mongoose = require('mongoose'),
	Delivery = mongoose.model('Delivery'),
	Transporter = mongoose.model('Transporter');

exports.all = function(req, res){
	Delivery.find(function(err, deliveries){
		if(err) res.send(err);
		res.json(deliveries);
	});
};
    	
exports.create = function(req, res){
	var delivery = new Delivery(req.body);
	
	// save delivery
	delivery.save(function(err, delivery){
		if(err) res.send('Couldn\'t save delivery: ' + err);
		
		// add delivery to transporter
		Transporter.findByIdAndUpdate(
			req.body.transporter, 
			{$push: {deliveries: delivery}},
			function(err, transporter){
				console.log('model is: ' + transporter);
			});
		
		// return all deliveries
		Delivery.find(function(err, deliveries){
			if(err) res.send(err);
			res.json(deliveries);
		});
	});
};





// add delivery to transporter
		// Mongoose embedded documents: http://mongoosejs.com/docs/2.8.x/docs/embedded-documents.html

// http://blog.modulus.io/getting-started-with-mongoose	
//~ // Find a single movie by name.
//~ Movie.findOne({ title: 'Thor' }, function(err, thor) {
  //~ if (err) return console.error(err);
  //~ console.dir(thor);
//~ });
//~ 
//~ // Find all movies.
//~ Movie.find(function(err, movies) {
  //~ if (err) return console.error(err);
  //~ console.dir(movies);
//~ });
//~ 
//~ // Find all movies that have a credit cookie.
//~ Movie.find({ hasCreditCookie: true }, function(err, movies) {
  //~ if (err) return console.error(err);
  //~ console.dir(movies);
//~ });
//~ // static helper functions
//~ movieSchema.statics.findAllWithCreditCookies = function(callback) {
  //~ return this.find({ hasCreditCookie: true }, callback);
//~ };
