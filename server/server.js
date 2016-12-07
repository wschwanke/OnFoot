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
var googleUrl='https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=1500&types=restaurant%7Cgas_station%7C&sensor=false' 


var Yelp = require('yelp');

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

  request(`${googleUrl}&location=${location}&key=${mapKey}`, function (error, response, body) {
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
  var url = 'https://maps.googleapis.com/maps/api/directions/json?mode=walking';

  request(`${url}&origin=${origin}&destination=${destination}&key=${directionKey}`, function (error, response, body){
    if (!error && response.statusCode == 200) {
      res.json(body);
    }
  })
})
app.get('/fetchAPI',function(req,res){
  var API = process.env.imageKey || googleAPI.imageKey
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
app.get('/fetchmap/:start/:end/:waypoints',function(req,res) {
  var start = req.params.start
  var end = req.params.end
  var waypoints = req.params.waypoints
  var staticMapKey = process.env.staticMapKey || googleAPI.staticMapKey
  //we're basically just building a url with what we're passed
  var image = `https://maps.googleapis.com/maps/api/staticmap?size=600x300&path=${waypoints}&markers=label:A%7C${start}&markers=label:B%7C${end}&key=${staticMapKey}`
  res.send(image);
  })
//})
// app.listen(port,ip);
// console.log("Listening on port :", port);
app.listen(port);
console.log("The magic is happening on port:", port);

//MONOGODB Stuff below
// var options = {
//   user: credentials.user,
//   pass: credentials.pass
// };

// var mongoose = require('mongoose');
// mongoose.connect(googleAPI.dbUrl);

// var db = mongoose.connection;

// db.on('error', function (err) {
// //console.log('connection error', err);
// });
// db.once('open', function () {
// //console.log('connected to server.');
// });


// var Schema = mongoose.Schema;
// var userSchema = new Schema({
// name : String,
// age : Number,
// DOB : Date,
// isAlive : Boolean
// });

// userSchema.methods.isYounger = function () {
// return this.model('User').age < 50 ? true : false;
// };

// var User = mongoose.model('User', userSchema);

// var arvind = new User({
// name : 'Arvind',
// age : 99,
// DOB : '01/01/1915',
// isAlive : true
// });

// arvind.save(function (err, data) {
// if (err) console.log(err);
// //else console.log('Saved : ', data );
// }); //synchronicity issues - this is logging out last.

// //console.log('isYounger : ',arvind.isYounger());

// User.find(function(err, data) {
//   if (err) return console.error(err);
//   //console.log("I AM THE DATA!!!!!!!!!!!!!", data);
//    });

// User.find(function(err, data) {
//   if (err) return console.error(err);
//   //console.log("I AM THE DATA!!!!!!!!!!!!!", data);
//    });


// Below is a proposed model schema for our data - this has been tested and shown to work
//The properties are labeled to correspond as closely as possible to the properties of the data returned by the google API
// var restaurantSchema = new mongoose.Schema({
//   lat: Number,
//   long: Number,
//   name:  String,
//   rating: Number,
//   types: Array,
//   vicinity: String,
//   users: Array
// });


// restaurantSchema.methods.isRated = function () { //Sample function to check if a restaurant's rating is higher than 4
// return this.model('Restaurant').rating > 4 ? true : false;
// };

// var Restaurant = mongoose.model('Restaurant', restaurantSchema);

//Hardcoded sample data
// var Sheraton = new Restaurant({
// lat: 30.270508,
// long: -97.73433519999999,
// name : "Sheraton Austin at the Capitol",
// rating : 3.7,
// types: [ 'lodging',
//      'restaurant',
//      'food',
//      'point_of_interest',
//      'establishment' ],
// vicinity: "701 East 11th Street, Austin",
// users: ['Sheel', 'Ethan']
// });

// var Parkside = new Restaurant({
// lat: 30.267062,
// long: -97.74032299999999,
// name : "Parkside",
// rating : 4.2,
// types: [ 'bar',
//      'restaurant',
//      'food',
//      'point_of_interest',
//      'establishment' ],
// vicinity: "301 East 6th Street, Austin",
// users: ['Sheel', 'Ethan']
// });

// Sheraton.save(function (err, data) {
// if (err) console.log(err);
// else console.log('Saved 111111 : ', data );
// });

// Parkside.save(function (err, data) {
// if (err) console.log(err);
// else console.log('Saved 222222 : ', data );
// });

// console.log('isRated : ', Sheraton.name, " ", Sheraton.isRated(), Parkside.name, " ", Parkside.isRated());

// Restaurant.find(function(err, data) {
//   if (err) return console.error(err);
//   console.log("I AM THE DATA!!!!!!!!!!!!!", data);
// });

