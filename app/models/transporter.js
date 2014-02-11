var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Delivery = require('./delivery');

var transporterSchema = new mongoose.Schema({
    name: String,
    natl_id_num: String,
    phone: String,
    deliveries: [{ type: Schema.Types.ObjectId, ref: 'Delivery' }]
});

var Transporter = mongoose.model('Transporter', transporterSchema);

module.exports = Transporter;
