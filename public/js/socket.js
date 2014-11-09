var socket = io(); 

$(document).ready(function(){ 

  function userTypingListener() {
    $('#chatmessage').one('keypress', function() {
      socket.emit('isTyping', name + " is typing...");
    });
  };

  userTypingListener();

  $('form').submit(function() {
    socket.emit('message', {name: name, message: $('#chatmessage').val()});
    $('#messages').append($('<div class="mine">').text(name + ": " + $('#chatmessage').val()));
    scrollDown(window);
    $('#chatmessage').val('');
    userTypingListener();
    return false;
  });

  function scrollDown(element) {
    $(element).scrollTop($(element).height());
  };

  socket.on('message', function(data){
    $('#messages').append($('<div class="yours">').text(data.name + ': ' + data.message));
    $('#type-message').empty()
  });

  socket.on('clientTyping', function(message){
    $('#type-message').append($('<div>').text(message));
  });
});
