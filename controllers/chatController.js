var express = require('express');
var app = express();
var Message = require('../models/message');
var ConversationV1 = require('watson-developer-cloud/conversation/v1');

var conversation = new ConversationV1({
  username: '3c468a6d-2d63-4fbf-92df-722453621327',
  password: 'z8p0KEHpeTR5',
  version_date: ConversationV1.VERSION_DATE_2017_05_26
});

// Main page.
app.get('/chat', function(req, res) {
	res.render('chat');
});

app.post('/chat', function(req, res) {
  var tempinput = {
    text: req.body.text,
    username: req.body.username
  }
	var message = new Message({
    input: tempinput,

  });
  console.log("req body is " + JSON.stringify(req.body));
  message.save(function(err, message){
    if(err){
      console.log(err);
    }
      else{
          console.log("message is " + message);
      }
  });
});


module.exports = app;
