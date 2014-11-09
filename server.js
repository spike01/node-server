var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http)
//var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
var Mailgun = require('mailgun').Mailgun;
var email = new Mailgun(process.env.MAILGUN_KEY);
var expressLayouts = require('express-ejs-layouts')
var S = require('string');

var port = process.env.PORT || 3000;

app.use(expressLayouts)
  app.use(express.static(__dirname + '/public'))

  app.set('view engine', 'ejs');

  app.get('/widget/:constant', function(request, response){
    var text = 'http://localhost:3000/' + request.params.id
      var name = request.query.name;
    response.render('widget', { user: "'"+name+"'" });
  });

app.get('/owner', function(request, response){
  response.render('owner');
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
    socket.broadcast.emit('message', message);
  });

  socket.on('isTyping', function(message){
    socket.broadcast.emit('clientTyping', message);
  });
});

function sendMail(){
  email.sendText('spike01@outlook.com', 'Business owner <spike1602@hotmail.com>',
      'Live customer support request',
      'Please go to http://textsupport.com/owner to speak directly to your customer',
      'spike01@outlook.com', {},
      function(err) {
        if (err) console.log('Oh noes: ' + err);
        else     console.log('Oh yays');
      });
};
//function sendText(){
//client.sendMessage({



//to:'+447889072164', // Any number Twilio can deliver to
//from: '+441773252038', // A number you bought from Twilio and can use for outbound communication
//body: 'yo'  // body of the SMS message

//}, function(err, responseData) { //this function is executed when a response is received from Twilio

//if (!err) { // "err" is an error received during the request, if any

//          "responseData" is a JavaScript object containing data received from Twilio.
//         A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
//        http://www.twilio.com/docs/api/rest/sending-sms#example-1

//console.log(responseData.from); // outputs "+14506667788"
//console.log(responseData.body); // outputs "word to your mother."

//}
//});

//}
