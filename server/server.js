var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//need to import request module for ajax call
var request = require('request')
var path = require('path');
var credentials = require('./env/config.js')
var createSession = require('./util.js');


var User = require('./db/user');


var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');


// config vars
var mapKey = process.env.mapKey || require( './env/config.js' ).mapKey ;

var port = process.env.PORT || 4040;

// var ip = '127.0.0.1';
// tryping to get real ip address
// var ip = req.headers["x-forwarded-for"];
//   if (ip){
//     var list = ip.split(",");
//     ip = list[list.length-1];
//   } else {
//     ip = req.connection.remoteAddress;
//   }


var ip = '127.0.0.1';


//Authentication ---------------------------
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
  clientID: credentials.facebook.clientID,
  clientSecret: credentials.facebook.clientSecret,
  callbackURL:credentials.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

app.use(passport.initialize());
app.use(passport.session());
app.use(session({ secret: 'on_foot' }));


app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){});

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { authType: 'reauthenticate',failureRedirect: '/' }),
  function(req, res) {
    createSession(req,res,req.user.id);
});


app.get('/login', function(req,res){
  res.redirect('/auth/facebook/callback');
})

app.get('/logout', function(req, res){
  req.session.destroy()
  req.logout()
  res.redirect('/')
});

app.get('/isLogin', function(req, res){
  var isLogin = req.session.userID ? true : false;
  res.send(isLogin);
})

//---------------------------Authentication



>>>>>>> Working Login And Logout
//serving react files
app.use(express.static(path.join(__dirname, '/public')));
app.use('/static', express.static(path.join(__dirname, '/../public/static')));

app.use(bodyParser.json());

//for cors error
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
     // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
});


app.get('/', function(req,res){
  console.log("auth", req.isAuthenticated());
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
})

// api call for google maps and modifies it to use our current location
app.get('/fetchData/:location',function(req,res){
  location = req.params.location
  var url='https://maps.credentialss.com/maps/api/place/nearbysearch/json?radius=1500&types=restaurant%7Cgas_station%7C&sensor=false'

  request(`${url}&location=${location}&key=${mapKey}`, function (error, response, body) {

    if (!error && response.statusCode == 200) {
      res.json(body);
    }
  })
})

//api call for direction from origin to destination
app.get('/directions/:origin/:destination', function(req, res){
  var directionKey = process.env.directionKey || googleAPI.directionKey
  var origin = req.params.origin;
  var destination = req.params.destination;
  var url = 'https://maps.credentialss.com/maps/api/directions/json?mode=walking';

  request(`${url}&origin=${origin}&destination=${destination}&key=${credentials.directionKey}`, function (error, response, body){

    if (!error && response.statusCode == 200) {
      res.json(body);
    }
  })
})

app.get('/fetchAPI',function(req,res){
  var API = process.env.imageKey || credentials.imageKey
  res.send(API)
})


//gets our address
app.get('/fetchAddress/:latlng',function(req,res){
  var latlng = req.params.latlng
  request(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}`,function (error, response, body){
    if (!error && response.statusCode == 200) {
      res.json(body);
    }
  })
})


app.post('/create', function(req,res){
  var user = new User({id:1232,name:"rrrrrr"}).save(function(err,data){
    res.send(data);
  })
})

app.get('/user', function(req, res){
  User.find().exec(function(err,found){
    res.send();
  })
})
app.listen(port);
console.log("The magic is happening on port:", port);
