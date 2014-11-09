var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http)
// var bodyParser = require('body-parser')

var expressLayouts = require('express-ejs-layouts')

var port = process.env.PORT || 3000;

app.use(expressLayouts)
app.use(express.static(__dirname + '/public'))

app.set('view engine', 'ejs');

app.get('/widget/:id', function(request, response){
  response.render('widget');
  console.log(request.query);
  console.log(request.params)
});

app.get('/home', function(request, response){
   response.render('home');
   console.log('GET home');
})

app.get('/welcome', function(request, response){
  response.render('welcome');
  console.log('GET welcome');
});


app.get('/settings', function(request, response){
  response.render('settings');
});

http.listen(port, function(){
  console.log('listening on port ' + port);
});


io.on('connection', function(socket){

  socket.on('message', function(message){
    io.emit('message', {message: message});
  });

  socket.on('isTyping', function(message){
    io.emit('clientTyping', message);
  });
});

