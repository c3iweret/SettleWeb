var mongoose = require('mongoose');
var express = require('express');


//connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://settle:settle@ds223738.mlab.com:23738/settle');

var inputSchema = mongoose.Schema({
    text:{
        type: String,
        required: true
    },
    username:{
      type: String,
      required: true
    }
});

//create message model
var messageSchema = mongoose.Schema(
  {
    input: [inputSchema],
    workspace_id: {
      type: String,
      required: true
    }
  });

module.exports = mongoose.model('Message', messageSchema);
