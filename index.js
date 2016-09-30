var express = require('express'),
    path    = require('path'),
    app     = express();

// console.log(path.resolve(__dirname));

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

app.get('/els', function(req, res){
  res.send(els);
});

io_party_form.on('connection', function(socket) {
  console.log('hello girl');

  // socket.on('img', function(data){
  //   console.log(data);
  //   var el = { type: 'img', src: data.src };
  //   io_party.emit('push', el)
  // });
  // socket.on('text', function(data){
  //   console.log(data);
  //   var el = { type: 'text', src: data.src };
  //   io_party.emit('push', el)
  // });

  socket.on('el', function(data){
    els.push(data.html);
    io_party.emit('push', data);
  });
});

io_party.on('connection', function(socket) {
  console.log('party!');

  // socket.on('open', function(id, data){
  //   console.log('id party',id);
  //   socket.broadcast.to(id).emit('els', els);
  // });

  // socket.broadcast.to(id).emit('els', els);

  // socket.on('el', function(data) {
  //   els.push(data.html);
  //   console.log('els', els);
  // });
});
