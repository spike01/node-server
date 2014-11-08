var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('./src/sockets.js');
var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'))

app.get('/widget', function(request, response){
  response.render('widget');
});

app.get('/settings', function(request, response){
  response.render('settings');
});


http.listen(port, function(){
  console.log('listening on port ' + port);
});

module.exports = http;
