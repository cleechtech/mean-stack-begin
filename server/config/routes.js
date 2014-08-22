var usersCtrl = require('../controllers/user'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  jwt = require('jwt-simple'),
  moment = require('moment'),
  config = require('./tokens');;

module.exports = function(app){

////////////////////////////////////////////////////////////////////////////////
// Log in with Email ///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

app.post('/auth/login', function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Wrong email and/or password' });
    }
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Wrong email and/or password' });
      }
      user = user.toObject();
      delete user.password;
      var token = createJwtToken(user);
      res.send({ token: token });
    });
  });
});


////////////////////////////////////////////////////////////////////////////////
// Create Email and Password Account ///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

app.post('/auth/signup', function(req, res) {
  var user = new User({
    email: req.body.email,
    password: req.body.password
  });
  user.save(function() {
    res.status(200).end();
  });
});

////////////////////////////////////////////////////////////////////////////////
// Log in with Facebook ////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

app.post('/auth/facebook', function(req, res) {
  console.log('post request to auth/facebook!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

  var accessTokenUrl = 'https://graph.facebook.com/oauth/access_token';
  var graphApiUrl = 'https://graph.facebook.com/me';

  var params = {
    client_id: req.body.clientId,
    redirect_uri: req.body.redirectUri,
    client_secret: config.FACEBOOK_SECRET,
    code: req.body.code
  };

  // Step 1. Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params }, function(error, response, accessToken) {
    accessToken = qs.parse(accessToken);

    // Step 2. Retrieve information about the current user.
    request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(error, response, profile) {
      User.findOne({ facebook: profile.id }, function(err, user) {
        if (user) {
          var token = createJwtToken(user);
          return res.send({ token: token });
        }
        user = new User({
          facebook: profile.id,
          firstName: profile.first_name,
          lastName: profile.last_name
        });
        user.save(function() {
          var token = createJwtToken(user);
          res.send({ token: token });
        });
      });
    });
  });
});


app.get('/api/me', ensureAuthenticated, function(req, res) {
  res.send(req.user);
});
  // not found error for undefined API routes
	app.all('/api/*', function(req, res){
		res.send(404)
	})

  // Everything else
  app.get('/*', function(req, res) {
    res.sendfile('./public/index.html')
  })


};




////////////////////////////////////////////////////////////////////////////////
// Login Required Middleware ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  var token = req.headers.authorization.split(' ')[1];
  var payload = jwt.decode(token, config.TOKEN_SECRET);

  if (payload.exp <= Date.now()) {
    return res.status(401).send({ message: 'Token has expired' });
  }

  req.user = payload.user;
  next();
}

////////////////////////////////////////////////////////////////////////////////
// Generate JSON Web Token /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function createJwtToken(user) {
  var payload = {
    user: user,
    iat: moment().valueOf(),
    exp: moment().add(7, 'days').valueOf()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}
