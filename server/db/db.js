var mongoose = require('mongoose');
var mlab = require('../env/config.js');

mongoose.connect('mongodb://root:password123@ds117348.mlab.com:17348/on-foot');

var db = mongoose.connection;

db.on('error', function (err) {
  console.log('connection error', err);
});
db.once('open', function () {
  console.log('connected to database.');
});


module.exports = mongoose;
