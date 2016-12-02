var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var path = require('path');
var googleAPI = require('./env/config.js')

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


// api call for google maps
app.get('/fetchData',function(req,res){
  request(googleAPI.url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json(body);
    }
  })
})
app.listen(port,ip);
console.log("Listening to port :4040");


//DB Stuff below 
var options = {
  user: googleAPI.user,
  pass: googleAPI.pass
};

var mongoose = require('mongoose');
mongoose.connect(googleAPI.dbUrl, options);
 
var db = mongoose.connection;
 
db.on('error', function (err) {
console.log('connection error', err);
});
db.once('open', function () {
console.log('connected to server.');
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
else console.log('Saved : ', data );
});

console.log('isYounger : ',arvind.isYounger());
