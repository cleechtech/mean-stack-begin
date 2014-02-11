var mongoose = require('mongoose');
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var Transporter = require('./transporter.js');

var deliverySchema = new Schema({
    date: { type: Date, default: Date.now },
    transporter: {
		type: ObjectId,
		ref: 'Transporter'
	},
    amount: Number
})

var Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery

// instance methods: http://dailyjs.com/2011/02/07/node-tutorial-12/
// deliverySchema.method('myMethod', function(){})
// or
// deliverySchem.methods.myMethod = function() {};

