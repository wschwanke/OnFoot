var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//need to import request module for ajax call
var request = require('request')
var path = require('path');
// var googleAPI = require('./env/config.js')

// config vars
var mapKey;
if(!process.env.mapKey){
 var googleAPI = require( './env/config.js' )
  mapKey= googleAPI.mapKey;
} else {
  mapKey= process.env.mapKey;
}

// assigning our nearby search url
googleAPI.url='https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=1500&types=restaurant%7Cgas_station%7C&sensor=false' 


var Yelp = require('yelp');

var port = 4040;

var ip = '127.0.0.1';
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
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
})

// api call for google maps and modifies it to use our current location
app.get('/fetchData/:location',function(req,res){
  location = req.params.location

  request(`${googleAPI.url}&location=${location}&key=${mapKey}`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json(body);
    }
  })
})

//api call for direction from origin to destination
app.get('/directions/:origin/:destination', function(req, res){
  var origin = req.params.origin;
  var destination = req.params.destination;
  var url = 'https://maps.googleapis.com/maps/api/directions/json?mode=walking';

  request(`${url}&origin=${origin}&destination=${destination}&key=${googleAPI.directionKey}`, function (error, response, body){
    if (!error && response.statusCode == 200) {
      res.json(body);
    }
  })
})
app.get('/fetchAPI',function(req,res){
  var API = process.env.imageKey || googleAPI.imageKey
  res.send(API)
})

app.listen(port,ip);
console.log("Listening to port :4040");


//MONOGODB Stuff below
// var options = {
//   user: credentials.user,
//   pass: credentials.pass
// };

var mongoose = require('mongoose');
mongoose.connect(googleAPI.dbUrl);

var db = mongoose.connection;

db.on('error', function (err) {
//console.log('connection error', err);
});
db.once('open', function () {
//console.log('connected to server.');
});


var Schema = mongoose.Schema;
var userSchema = new Schema({
name : String,
age : Number,
DOB : Date,
isAlive : Boolean
});

userSchema.methods.isYounger = function () {
return this.model('User').age < 50 ? true : false;
};

var User = mongoose.model('User', userSchema);

var arvind = new User({
name : 'Arvind',
age : 99,
DOB : '01/01/1915',
isAlive : true
});

arvind.save(function (err, data) {
if (err) console.log(err);
//else console.log('Saved : ', data );
}); //synchronicity issues - this is logging out last.

//console.log('isYounger : ',arvind.isYounger());

User.find(function(err, data) {
  if (err) return console.error(err);
  //console.log("I AM THE DATA!!!!!!!!!!!!!", data);
   });
