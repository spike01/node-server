var socket = io(); 

$(document).ready(function(){ 

  function userTypingListener() {
    $('#chatmessage').one('keypress', function() {
      socket.emit('isTyping', "Someone is typing...");
    });
  };

  userTypingListener();

  $('form').submit(function() {
    socket.emit('message', $('#chatmessage').val());
    scrollDown(window);
    $('#chatmessage').val('');
    return false;
  });

  function scrollDown(element) {
    $(element).scrollTop($(element).height());
  };

  socket.on('message', function(data){
    $('#messages').append($('<div>').text(data.name + ': ' + data.message));
    userTypingListener();
  });

  socket.on('clientTyping', function(message){
    $('#messages').append($('<div>').text(message));
  });
});
