var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http)
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
var expressLayouts = require('express-ejs-layouts')
var S = require('string');

var port = process.env.PORT || 3000;
var id
var name = {customer: null, owner: null}

app.use(expressLayouts)
app.use(express.static(__dirname + '/public'))

app.set('view engine', 'ejs');

app.get('/widget/:id', function(request, response){
  var text = 'http://localhost:3000gi/' + request.params.id
  sendText(text);
  response.render('widget');
  console.log(request.query);
  console.log(request.params)
  name.customer = request.query.name;
  id = request.params.id;
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
   console.log(id)
    io.emit('message', {name: name.customer, message: message});
  });

  socket.on('isTyping', function(message){
    io.emit('clientTyping', message);
  });
});

function sendText(text){
		client.sendMessage({

		

	    to:'+447889072164', // Any number Twilio can deliver to
	    from: '+441773252038', // A number you bought from Twilio and can use for outbound communication
	    body: text  // body of the SMS message

		}, function(err, responseData) { //this function is executed when a response is received from Twilio

	    if (!err) { // "err" is an error received during the request, if any

	        // "responseData" is a JavaScript object containing data received from Twilio.
	        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
	        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

	        console.log(responseData.from); // outputs "+14506667788"
	        console.log(responseData.body); // outputs "word to your mother."

	    }
	});

}
