var Transporter = require('../models/transporter');

module.exports = function(app){

    // ====== API =========
    // all transporters
    app.get('/api/transporters', function(req, res){
        // ...
    });
    
    // create transporter
    app.post('/api/transporters', function(req, res){
        // ...
    });
    
    // delete transporter
    app.delete('/api/transporters/:transporter_id', function(req, res){
        // ...
    });
    
    // ===== application ======
    app.get('*', function(req, res) {
	    res.sendfile('./client/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    