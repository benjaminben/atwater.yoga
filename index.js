const express = require('express')
const bp      = require('body-parser')
const path    = require('path')
const fs      = require('fs')
const app     = express()
const keys    = require('./keys')
const mdb     = require('./db/MongoClient')

app.set('port', process.env.PORT || 8080);
const server = app.listen(app.get('port'), function(){
  console.log('party on', app.get('port'));
  mdb.connect({user: keys.mongo_user, pw: keys.mongo_pw}, function() {
    console.log('Connected to MongoDB')
  })
});

app.use(express.static('public'))
app.use(bp.json())

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('create', {message: "hi pug"})
})

app.post('/board', (req, res) => {
  console.log(req.body)
  mdb
    .db()
    .collection('boards')
    .insert(req.body, (err) => {
      if (err) {
        console.log("board insertion err", err)
      }
      res.redirect(`/admin/${req.body.name}`)
    })
})

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/party.html');
// });

// app.get('/party', function(req, res){
//   res.sendFile(__dirname + '/party-form.html');
// });

// var io = require('socket.io')(server),
//     io_party = io.of('/'),
//     io_party_form = io.of('/party'),
//     prevEls = [],
//     els = [];

// app.get('/els', function(req, res){
//   res.send(els);
// });

// io_party_form.on('connection', function(socket) {
//   socket.on('el', function(data){
//     els.push(data.html);
//     io_party.emit('push', data);
//   });

//   socket.on('func', function(data) {
//     io_party.emit('func', data)
//   })
// });

// io_party.on('connection', function(socket) {
//   socket.on('pop', function(data){
//     els.shift()
//   });
// });
