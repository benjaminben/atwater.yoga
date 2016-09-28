var express = require('express'),
    app     = express();


app.set('port', process.env.PORT || 8000);
var server = app.listen(app.get('port'), function(){
  console.log('party on', app.get('port'));
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/party.html');
});

app.get('/party', function(req, res){
  res.sendFile(__dirname + '/party-form.html');
});

var io = require('socket.io')(server);
io.on('connection', function(socket) {
  console.log('hello girl');
  socket.on('img', function(data){
    console.log(data);
  });
  socket.on('text', function(data){
    console.log(data);
  });
})
