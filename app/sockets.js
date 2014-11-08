http = require('../server.js')
io = require('socket.io')(http)

io.on('connection', function(socket){

  socket.on('message', function(message){
    io.emit('message', messsage);
  });
});

module.exports = io;
