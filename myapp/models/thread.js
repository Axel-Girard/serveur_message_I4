// schema des thread
var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
  pseudo    : String,
  message   : String,
  date      : { type : Date, default : Date.now }
});

var threadSchema = new mongoose.Schema({
  createur      : String,
  title         : String,
  messages      : [ messageSchema ]
});

module.exports = mongoose.model('thread', threadSchema);
