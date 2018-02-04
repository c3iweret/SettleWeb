var express = require('express');
var app = express();
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

module.exports = app;
