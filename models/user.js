var mongoose = require('mongoose');


//create User model
var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
