var express = require('express'),
    app     = express();


app.set('port', process.env.PORT || 8080);
var server = app.listen(app.get('port'), function(){
  console.log('party on', app.get('port'));
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/party.html');
});

app.get('/party', function(req, res){
  res.sendFile(__dirname + '/party-form.html');
});

var io = require('socket.io')(server),
    io_party = io.of('/');
    io_party_form = io.of('/party');
    els = [];

io_party_form.on('connection', function(socket) {
  console.log('hello girl');

  socket.on('img', function(data){
    console.log(data);
    var el = { type: 'img', src: data.src };
    els.push(el);
    io_party.emit('push', el)
  });
  socket.on('text', function(data){
    console.log(data);
    var el = { type: 'text', src: data.src };
    els.push(el);
    io_party.emit('push', el)
  });
});

io_party.on('connection', function(socket) {
  console.log('party!');
});
