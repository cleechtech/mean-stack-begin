// Delivery model
var mongoose = require('mongoose');
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId,
	Transporter = require('./transporter.js');

var deliverySchema = new Schema({
    date: { 
		type: Date, 
		default: Date.now 
	},
    transporter: {
		type: Schema.ObjectId,
		ref: 'Transporter'
	},
    amount: { 
		type: Number, 
		required: true,
		min: 1,
		max: 100,
		validate: function(){
			// validate amount
		}
	}
})

/*
// middleware: text Transporter when a delivery is added
// http://mongoosejs.com/docs/2.8.x/docs/middleware.html
deliverySchema.pre('save', function (next) {
  text(this.transporter.phone, 'We received your delivery!');
  next();
});
*/

var Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery

// instance methods: http://dailyjs.com/2011/02/07/node-tutorial-12/
// deliverySchema.method('myMethod', function(){})
// or
// deliverySchem.methods.myMethod = function() {};

