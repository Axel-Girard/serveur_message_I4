// schema des thread
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  pseudo    : String,
  mdp       : String
});

module.exports = mongoose.model('user', userSchema);
