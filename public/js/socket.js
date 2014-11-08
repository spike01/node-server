var socket = io(); 

$(document).ready(function(){ 

  function userTypingListener() {
    $('#chatmessage').one('keypress', function() {
      socket.emit('isTyping', "Someone is typing...");
    });
  };

  userTypingListener();

  $(document).keypress(function (event) {
    if (event.which == 13) {
      $('form').submit();
      socket.emit('message', $('#chatmessage').val());
      scrollDown(window);
      $('#chatmessage').val('');
      return false;
    }
  });

  function scrollDown(element) {
    $(element).scrollTop($(element).height());
  };

  socket.on('message', function(message){
    $('#messages').append($('<li>').text(message));
    userTypingListener();
  });

  socket.on('clientTyping', function(message){
    $('#messages').append($('<li>').text(message));
  });
});
