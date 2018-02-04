var express = require('express');
var app = express();
var Message = require('../models/message');
var User = require('../models/user');
var ConversationV1 = require('watson-developer-cloud/conversation/v1');

var conversation = new ConversationV1({
  username: '3c468a6d-2d63-4fbf-92df-722453621327',
  password: 'z8p0KEHpeTR5',
  version_date: ConversationV1.VERSION_DATE_2017_05_26
});

var nameuser;
// Main page.
app.get('/chat', function(req, res) {
	res.render('chat', {user: nameuser});
});

app.post('/chatUser', function(req,res){
  console.log('req body for username' + req.body.username);
  nameuser = req.body.username;
  if (req.query.userType != undefined) {
    var user = new User({
      username: req.body.username,
      type: req.query.userType
    })
    user.save(function(err, data){
      if(err){
        console.log(err);
      }
        else{
            console.log("the user just created is " + data);
        }
    });

    if(req.query.userType == 'mentee'){
      conversation.message(
  {
    workspace_id: 'a28add6d-4f47-4164-bfab-098f01d53f24'
  },
  function(err, response) {
    if (err) {
      console.error(err);
    } else {
      res.send(response);
    }
  }
);
    }

    if(req.query.userType == 'mentor'){

      conversation.message(
  {
    workspace_id: '9063318d-fed8-4194-81ea-36db8c800bb9'
  },
  function(err, response) {
    if (err) {
      console.error(err);
    } else {
      res.send(response);
    }
  }
);
    }

  }
})

app.post('/chatMsg', function(req, res) {
  console.log('user where are u');
  console.log(req.query.user);
  console.log(req.body.message);

    var tempinput = {
      text: req.body.message,
      username: req.query.user
    }

    console.log(tempinput);

    User.findOne({
        'username': req.query.user
    }, function(err, user){
      console.log('user ' + user);
      var type = user.type;


    if(type == 'mentee'){
    	var message = new Message({
        input: tempinput,
        workspace_id: 'a28add6d-4f47-4164-bfab-098f01d53f24'

      });
      conversation.message(
  {
    input: { text: tempinput.text },
    workspace_id: 'a28add6d-4f47-4164-bfab-098f01d53f24'
  },
  function(err, response) {
    if (err) {
      console.error(err);
    } else {
      res.send(response);
    }
  }
);
    }

    if(type == 'mentor'){
    	var message = new Message({
        input: tempinput,
        workspace_id: '9063318d-fed8-4194-81ea-36db8c800bb9'

      });
      conversation.message(
  {
    input: { text: tempinput.text },
    workspace_id: '9063318d-fed8-4194-81ea-36db8c800bb9'
  },
  function(err, response) {
    if (err) {
      console.error(err);
    } else {
      res.send(response);
    }
  }
);
    }

    console.log("req body is " + JSON.stringify(req.body));
    message.save(function(err, message){
      if(err){
        console.log(err);
      }
        else{
            console.log("message is " + message);
        }
    });
  })
});


module.exports = app;
