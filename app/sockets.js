var io = require('../server');

io.on('connection', function(socket){

  socket.on('message', function(message){
    io.emit('message', message);
  });
});

module.exports = io;
