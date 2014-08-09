// https://github.com/gomfunkel/node-mailchimp

var MailChimpAPI = require('mailchimp').MailChimpAPI,
	apiKey = '',
	listId = '';

try {
	var api = new MailChimpAPI(apiKey, { version: '2.0' })
} catch (err){
	console.log(err.message)
}

api.call('campaigns', 'list', { start: 0, limit: 25 }, function(err, data){
	if (err){
		console.log(err.message)
	} else {
		// do something with data
		console.log(JSON.stringify(data))
	}
})

// MailChimp Webhooks
var MailChimpWebhook = require('mailchimp').MailChimpWebhook,
	webhook = new MailChimpWebhook();

webhook.on('error', function(err){
	console.log(err.message)
})

webhook.on('subscribe', function(data, meta){
	console.log(data.email + ' subscribed to newsletter')
})

webhook.on('unsubscribe', function(data, meta){
	console.log(data.email + ' unsubscribed')
})


// Route example
app.post('/subscribe', function(req, res){
	// api.call('lists', 'subscribe', { id: "YOUR_LIST_ID", email: { email: req.param('email') } }, function (error, data) {
	api.listSubscribe({ 
		id: listId,
		email_address: req.body.email,
		double_optin: false
	}, function(err, data){
		if (err){
			console.log(err)
			res.send('Error with mailchimp')
		} else {
			console.log(data)
			res.send('Thanks for signing up')
		}
	})
})