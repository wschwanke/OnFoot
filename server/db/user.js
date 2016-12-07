var mongoose = require('./db.js');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  id : Number,
  name : String,
  checkList : [ {placeId: String, place:String} ]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
