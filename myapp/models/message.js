// schema des thread
var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
  pseudo    : String,
  message   : String,
  date      : { type : Date, default : Date.now }
});

module.exports = mongoose.model('message', messageSchema);
