var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var path = require('path');
var googleAPI = require('./env/config.js')

app.use(express.static('Client'));
app.use(bodyParser.json());

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
  res.sendFile('index.html', {'root':__dirname+'/../client'});
})

app.get('/fetchData',function(req,res){
  request(googleAPI.url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json(body);
    }
  })
})

app.listen(4040,'127.0.0.1');
console.log("Listening to port :4040");
