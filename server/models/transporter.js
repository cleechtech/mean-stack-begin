// Transporter model
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Delivery = require('./delivery');

var transporterSchema = new Schema({
    name: {
		type: String, 
		required: true, 
		trim: true 
	},
    natl_id_num: { 
		type: String, 
		unique: true, 
		default: '', 
		trim: true 
	},
    phone: { 
		type: String, 
		trim: true,
		default: '' 
	},
    deliveries: [Delivery],
    modified: { 
		type: Date, 
		default: Date.now 
	}
});

// Statics
// add static 'class' methods to Models compiled from this Schema
transporterSchema.statics.load = function(id, callback){
	// find transporter and execute callback
	this.findOne({
		_id: id
	}).populate('delivery').exec(callback);	// Populates document references, executing the callback when complete
};

var Transporter = mongoose.model('Transporter', transporterSchema);

module.exports = Transporter;
