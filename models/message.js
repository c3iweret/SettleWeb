var mongoose = require('mongoose');
var express = require('express');


//connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://settle:settle>@ds223738.mlab.com:23738/settle');

//create message model
var messageSchema = mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address1: {
      type: String,
      required: true
  },
  address2: {
      type: String
  },
  city: {
      type: String,
      required: true
  },
  state: {
      type: String,
      required: true
  },
  post: {
      type: String,
      required: true
  },
  country: {
      type: String,
      required: true
  }
});

module.exports = mongoose.model('Message', messageSchema);
