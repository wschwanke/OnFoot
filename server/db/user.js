var mongoose = require('./db.js');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  id : Number,
  name : String,
  checkList : [ {place_id: String, name:String, rating:Number, price_level:Number, vicinity: String, geometry:Object, notes:String} ]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
