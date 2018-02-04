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

      var msgFormData = $('#messageForm').serialize();

      $message.val('');


      socket.on('new message', function(data){
        $chat.append('<div class="card"><strong>'+data.user+'</strong>' +data.msg+ '</div>');
        $.post('/chatMsg?user='+data.user, msgFormData, function(chatBotMsg){
            $chat.append('<div class="card"><strong>'+'Bot'+'</strong>' +chatBotMsg.output.text+ '</div>');
        });
      });
    });

    $userForm.submit(function(e){
      var url = window.location.search;
      var getUserType = url.split('userType=')[1];

      e.preventDefault();
      var username = $username.val();
      var userFormData = $('#userForm').serialize();

      socket.emit('new user', username, function(data){
        if(data){

          $.post('/chatUser?userType='+getUserType,userFormData, function(chatBotMsg){
              $chat.append('<div class="card"><strong>'+'Bot'+'</strong>' +chatBotMsg.output.text+ '</div>');
        });
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
