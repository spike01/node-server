var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http)
// var bodyParser = require('body-parser')

var expressLayouts = require('express-ejs-layouts')

var port = process.env.PORT || 3000;
var id

app.use(expressLayouts)
app.use(express.static(__dirname + '/public'))

app.set('view engine', 'ejs');

app.get('/widget/:id', function(request, response){
  response.render('widget');
  console.log(request.query);
  console.log(request.params)
  id = request.params;
});

app.get('/welcome', function(request, response){
  response.render('welcome');
  console.log(request.query);
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
   console.log(id)
    io.emit('message', {message: "message", id: id });
  });
});

