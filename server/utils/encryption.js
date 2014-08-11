var crypto = require('crypto');

// helper functions for hashing users' passwords
module.exports = {

	createSalt: function(){
		return crypto.randomBytes(128).toString('base64')
	},

	hashPwd: function(salt, pwd){
		// HMAC: Hash Message Authentication Code
		var hmac = crypto.createHmac('sha1', salt)	// sha1 algorithm
		return hmac.update(pwd).digest('hex')
	},

}
