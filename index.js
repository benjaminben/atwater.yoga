var express = require('express'),
    path    = require('path'),
    fs      = require('fs'),
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
    io_party = io.of('/'),
    io_party_form = io.of('/party'),
    prevEls = [],
    els = [];

app.get('/els', function(req, res){
  res.send(els);
});

io_party_form.on('connection', function(socket) {
  console.log('hello girl');

  socket.on('el', function(data){
    els.push(data.html);
    io_party.emit('push', data);
  });

  socket.on('func', function(data) {
    console.log("we got tha func",data)
    io_party.emit('func', data)
  })
});

io_party.on('connection', function(socket) {
  console.log('party!');
  socket.on('pop', function(data){
    els.shift()
  });
});

var current_log = fs.readFileSync(__dirname + '/els_log.txt', 'utf8');
fs.writeFileSync(__dirname + '/els_log.txt', (current_log ? current_log : ''));

setInterval(function(){
  for( var i = 0; i < els.length; i++ ){
    if( prevEls[i] !== els[i] ){
      var currentTime = new Date();
      fs.appendFile(__dirname + '/els_log.txt', '\n\n' + currentTime + '\n' + els, function(err){
        if ( err ) throw err;
        prevEls = els.slice(0);
      });
      break;
    }
  }
}, 1800000);
