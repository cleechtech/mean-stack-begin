var mongoose = require('mongoose');

module.exports = mongoose.model('Transporter', {
    name: String,
    natl_id_num: String,
    phone: String
});