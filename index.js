'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var users = [];
var connections = [];

app.set('view engine', 'ejs');
app.use(express.static(__dirname));


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var chatController = require('./controllers/chatController');
var index = require('./controllers/indexController');


app.use('/',chatController);
app.use('/', index);

io.sockets.on('connection', function(socket){
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);

  //disconnect
  socket.on('disconnect', function(data){
    users.splice(users.indexOf(socket.username), 1);
    updateUsernames();
    connections.splice(connections.indexOf(socket), connections.length);
    console.log('Disconnected: %s sockets connected', connections.length);
  });

  //send message
  socket.on('send message', function(data){
    console.log('data is ' + data);
    io.sockets.emit('new message', {msg: data, user: socket.username});
  });

  socket.on('new user', function(data, callback){
    callback(true);
    socket.username = data;
    users.push(socket.username);
    updateUsernames();
  });

  function updateUsernames(){
    io.sockets.emit('get users', users);
  };


});
//Routes

/*app.get('/applicants', ta.findAll);

app.post('/applicants', ta.addOne);

app.delete('/applicants', ta.delOne);

app.get('/courses', ta.findWithCourses);*/


// Start the server
server.listen(3000);
console.log('Listening on port 3000');
