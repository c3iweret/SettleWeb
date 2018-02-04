'use strict';

$(document).ready(function() {
  $(function(){
    var socket = io.connect();
    var $messageForm = $('#messageForm');
    var $message = $('#message');
    var $messageArea = $('#messageArea');
    var $chat = $('#chat');
    var $userFormArea = $('#userFormArea');
    var $userForm = $('#userForm');
    var $users = $('#users');
    var $username = $('#username');


    $messageForm.submit(function(e){
      e.preventDefault();
      socket.emit('send message', $message.val());
      $message.val('');
    });

    socket.on('new message', function(data){
      $chat.append('<div class="card"><strong>'+data.user+'</strong>' +data.msg+ '</div>');
    });

    $userForm.submit(function(e){
      e.preventDefault();
      socket.emit('new user', $username.val(), function(data){
        if(data){
          console.log("new user is" + data);
          $userFormArea.hide();
          $messageArea.show();
        }
      });
      $username.val('');
    });

    socket.on('get users', function(data){
      var html = '';
      for(let i = 0; i < data.length; i++){
        html += '<li class="list-goup-item">' +data[i]+ '</li>';
      }

      $users.html(html);

    });

  });
})
