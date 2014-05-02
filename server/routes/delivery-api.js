// Delivery routes
var Delivery = require('../models/delivery'),
	deliveriesCtrl = require('../controllers/deliveries');

module.exports = function(app){
	// all deliveries
    app.get('/api/deliveries', deliveriesCtrl.all);
    
    // create delivery
    app.post('/api/deliveries', deliveriesCtrl.create);
    
    // delete delivery
    app.delete('/api/deliveries/:delivery_id', function(req, res){
        Delivery.remove({
            _id: req.params.delivery_id
        }, function(err, delivery){
            if (err) res.send(err);
            // return all Deliveries
            Delivery.find(function(err, deliveries){
                if(err) res.send(err);
                res.json(deliveries);
           }); 
        });
    });
};
