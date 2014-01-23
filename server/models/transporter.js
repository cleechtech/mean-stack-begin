var mongoose = require('mongoose');
var Delivery = require('./delivery');

var transporterSchema = new mongoose.Schema({
    name: String,
    natl_id_num: String,
    phone: String,
    deliveries: [Delivery]
});

var Transporter = mongoose.model('Transporter', transporterSchema);

module.exports = Transporter;
