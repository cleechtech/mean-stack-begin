var Delivery = require('../models/delivery');

module.exports = function(app){
	// all deliveries
    app.get('/api/deliveries', function(req, res){
        Delivery.find(function(err, deliveries){
            if(err) res.send(err);
            
            res.json(deliveries);
        });
    });
    
    // create delivery
    app.post('/api/deliveries', function(req, res){
		
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
		
		
		var transporter = Transporter.findOne(transporterId);
		transporter.deliveries.push(deliveryObj);
		
        Delivery.create({
            date: req.body.date,
            transporter: req.body.transporter,
            amount: req.body.amount
        }, function(err, delivery){
            if(err) res.send(err);
            
            Delivery.find(function(err, deliveries){
                if(err) res.send(err);
            
                res.json(deliveries);
            });
        });
    });
    
    // delete delivery
    app.delete('/api/deliveries/:delivery_id', function(req, res){
        Delivery.remove({
            _id: req.params.delivery_id
        }, function(err, delivery){
            if (err) res.send(err);
            
            Delivery.find(function(err, deliveries){
                if(err) res.send(err);
                
                res.json(deliveries);
           }); 
        });
    });
};
