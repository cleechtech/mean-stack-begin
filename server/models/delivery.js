// Delivery model
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var deliverySchema = new Schema({
    date: { 
		type: Date, 
		required: true,
		default: Date.now 
	},
    amount: { 
		type: Number, 
		required: true,
		min: 1,
		max: 100
	},
	comments: { type: String }
})

var Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery