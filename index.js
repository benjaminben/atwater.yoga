var express = require('express')
var path    = require('path')
var fs      = require('fs')
var app     = express()
var keys    = require(__dirname + '/keys')
var db      = require(__dirname + '/db/MongoClient')(keys.mongo_user, keys.mongo_pw)

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
  socket.on('el', function(data){
    els.push(data.html);
    io_party.emit('push', data);
  });

  socket.on('func', function(data) {
    io_party.emit('func', data)
  })
});

io_party.on('connection', function(socket) {
  socket.on('pop', function(data){
    els.shift()
  });
});
