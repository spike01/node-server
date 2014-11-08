var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http)

var expressLayouts = require('express-ejs-layouts')

var port = process.env.PORT || 3000;

app.use(expressLayouts)
app.use(express.static(__dirname + '/public'))

app.set('view engine', 'ejs');

app.get('/widget', function(request, response){
  response.render('widget');
  console.log('GET widget');
});

app.get('/settings', function(request, response){
  response.render('settings');
  console.log('GET settings');
});

http.listen(port, function(){
  console.log('listening on port ' + port);
});


io.on('connection', function(socket){

  socket.on('message', function(message){
    io.emit('message', message);
  });
});

