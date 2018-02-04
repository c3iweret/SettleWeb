'use strict';

$(document).ready(function() {
  $('.mentee-button').click(function() {
    $.get('/chat', function(data) {
    })
  });

  $('.mentor-button').click(function() {
    $.get('/chat', function(data) {
    })
  });

})
