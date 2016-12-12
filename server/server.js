var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//need to import request module for ajax call
var request = require('request')
var path = require('path');
// credentials = require('./env/config.js')
var createSession = require('./util.js');


if(!process.env.clientID) {
var credentials = require('./env/config.js')
} else {
 var deployedURL = `https://onf00t.herokuapp.com/auth/facebook/callback`
}

var User = require('./db/user');


var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');


// config vars

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

var clientID = process.env.clientID||credentials.facebook.clientID
var clientSecret = process.env.clientSecret||credentials.facebook.clientSecret
var callbackURL = deployedURL||credentials.facebook.callbackURL

passport.use(new FacebookStrategy({
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL:callbackURL
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
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    console.log("req",req.user);
    User.findOne({id:req.user.id}).exec(function(err,found){
      if(!found){
        var user = new User({id:req.user.id,name:req.user.displayName})
        .save(function(err,data){
          createSession(req,res,req.user.id);
        })
      }else{
        createSession(req,res,req.user.id);
      }
    })
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
  User.findOne({id:req.session.userID}).exec(function(err,user){
    console.log("found",user);
    var user = user ? user.name : ""
    var data = {isLogin:isLogin,name:user};
    res.json(data);
  })


})

//---------------------------Authentication


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

app.get('/fetchData/:location/:radius',function(req,res){
  var mapKey = process.env.mapKey || credentials.mapKey
  var location = req.params.location
   console.log('Request?', req.params);
   let radius = req.params.radius;
     //Data validation.
  if (radius < 250 ) {radius = 250};
  if (radius > 3000) {radius = 3000};
  //query starts after 'json', which defines the format of returned data
    //  mapKey from config.js = API key.
    //  radius = distance in meters
    //  types = restaurant/gas_station/etc
    // %7Cgas_station%7C&sensor=false
  //var url='https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=1500&types=restaurant'
  var url='https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=3000&types=restaurant';
  request(`${url}&location=${location}&key=${mapKey}`, function (error, response, body) {
    console.log(error);
    if (!error && response.statusCode == 200) {
      console.log(body);
      res.json(body);
    }
  })
})

//As above, but will accept a 'distance' value with which to set the search.
app.get('/variableDistanceSearch/:location/:distance',function(req,res){
  var mapKey = process.env.mapKey || credentials.mapKey
  console.log('Distance request?', req.params);
  location = req.params.location
  distance = req.params.distance;
  //Data validation.
  if (distance < 250 ) {distance = 250};
  if (distance > 3000) {distance = 3000};
  //query starts after 'json', which defines the format of returned data
    //  mapKey from config.js = API key.
    //  radius = distance in meters
    //  types = restaurant/gas_station/etc
    // %7Cgas_station%7C&sensor=false
  //var url='https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius='+distance+'&types=restaurant';
  var url='https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=3000&types=restaurant';
  request(`${url}&location=${location}&key=${mapKey}`, function (error, response, body) {
    console.log(error);
    if (!error && response.statusCode == 200) {
      console.log('body?', body);
      res.json(body);
    }
  })
})

//api call for direction from origin to destination
app.get('/directions/:origin/:destination', function(req, res){
  var directionKey = process.env.directionKey || credentials.directionKey
  var origin = req.params.origin;
  var destination = req.params.destination;
  var url = 'https://maps.googleapis.com/maps/api/directions/json?mode=walking';

  request(`${url}&origin=${origin}&destination=${destination}&key=${directionKey}`, function (error, response, body){

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

app.get('/fetchLatLong/:address', (req, res) => {
  var mapKey = process.env.mapKey || credentials.mapKey;
  let address = req.params.address;
  let url = 'https://maps.googleapis.com/maps/api/geocode/json?'
  request(`${url}&address=${address}&key=${mapKey}`, (err, response, body) => {
    console.log(err);
    if (!err && response.statusCode == 200) {
      res.json(body);
    }
  })
})


app.get('/username', function(req, res){
  console.log("user",req.session.userID);
  User.findOne().exec(function(err,found){
    console.log("found",found);
    res.send();
  })
})

app.post('/saveRestaurant', function(req, res){
  console.log("We are reaching server.js")
  var user = req.session.userID;
  console.log("Here is the request body!!!!!!!!!!!!!", req.body)
  var place_id = req.body.place_id;
  var name = req.body.name;
  var rating = req.body.rating;
  var price_level = req.body.price_level;
  var vicinity = req.body.vicinity;
  var geometry = req.body.geometry;
  //console.log("THE STUFF! ---->", user,place_id,name, rating, price_level, vicinity);
  User.findOneAndUpdate({id:user},{$push:{"checkList":{place_id:place_id, name:name, rating:rating, price_level:price_level, vicinity:vicinity, geometry:geometry, notes:null }}},
    {safe: true, upsert: true, new : true},
      function(err, model) {
        console.log(err);
        res.send("success");
       }
  )
})

app.get('/checkList', function(req, res){
  var user = req.session.userID;
  User.findOne({id:user}).exec(function(err,user){
    console.log("found",user);
    res.send(user);
  })
})




app.listen(port);
console.log("The magic is happening on port:", port);
