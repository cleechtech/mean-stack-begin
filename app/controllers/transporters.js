// Transporter controller
var mongoose = require('mongoose'),
	Delivery = mongoose.model('Delivery'),
	Transporter = mongoose.model('Transporter');
	
// map route parameter to a Transporter
exports.transporter = function(req, res, next, id){
	Transporter.load(id, function(err, transporter){
		if(err) return next(err);
		if(!transporter) return next(new Error('failed to load ' + id));
		req.transporter = transporter;
		next();
	});
};

// show all transporters
exports.all = function(req, res){
	Transporter.find(function(err, transporters){
		if(err) res.send(err);
		res.json(transporters);
	});
};

// show individual transporter
exports.show = function(req, res){
	res.jsonp(req.transporter);
};

// delete transporter
exports.destroy = function(req, res){
  var transporter = req.transporter;
  // delete Transporter
  transporter.remove(function(err){
    if (err) {
		res.render('error', {status: 500});
	} else {
		// return all Transporters
		Transporter.find(function(err, transporters){
			if(err) res.send(err);   
			res.json(transporters);
		});
	}
  });
};

// create transporter
exports.create = function(req, res){
	var transporter = new Transporter(req.body);
	transporter.deliveries = req.body.deliveries;
	// save new transporter
	transporter.save(function(err, transporter, numAffected){
		// return json of all Transporters
		Transporter.find(function(err, transporters){
			res.jsonp(transporters);
		});
	});
};

//~ exports.update = function(req, res){
  //~ var article = req.article
  //~ article = _.extend(article, req.body)
//~ 
  //~ article.save(function(err) {
  	//~ res.jsonp(article)
  //~ })
//~ }
