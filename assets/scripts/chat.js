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
    var $globalusername;


    $userForm.submit(function(e){
      var url = window.location.search;
      var getUserType = url.split('userType=')[1];

      e.preventDefault();
      var username = $username.val();
      window.globalusername = $username.val();
      console.log('username entered is ' + username);
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


    $messageForm.submit(function(e){
      e.preventDefault();
      socket.emit('send message', $message.val());

      var msgFormData = $('#messageForm').serialize();

      $message.val('');

      var display_message = function(data){
        $chat.append('<div class="card"><strong>'+data.user+'</strong>' +data.msg+ '</div>');
      };


      socket.on('new message', display_message);

      console.log("username is " + globalusername);

      $.post('/chatMsg?user='+window.globalusername, msgFormData, function(chatBotMsg){
          $chat.append('<div class="card"><strong>'+'Bot'+'</strong>' +chatBotMsg.output.text+ '</div>');
          if(chatBotMsg.output.text[0] === "Nice! Welcome to Canada. Please click the button so you can choose your potential mentor!"){
              $('#pick-matches').show();
              $messageForm.hide();
            }
          if(chatBotMsg.output.text[0] === "Thanks. Please wait while we match you with your mentee!"){
              $('#see-matches').show();
              $messageForm.hide();
            }
      });
    });

    socket.on('get users', function(data){
      var html = '';
      for(let i = 0; i < data.length; i++){
        html += '<li class="list-goup-item">' +data[i]+ '</li>';
      }

      $users.html(html);

    });

    $('#see-matches').click(function() {
        window.location.replace('/mentee');
    });

    $('#pick-matches').click(function() {
        window.location.replace('/mentee');
    });

  });
})
