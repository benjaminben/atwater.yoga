const express = require('express')
const bp      = require('body-parser')
const path    = require('path')
const fs      = require('fs')
const app     = express()
const keys    = require('./keys')
const mdb     = require('./db/MongoClient')

app.set('port', process.env.PORT || 8080)
app.use(express.static('public'))
app.use(bp.json())
app.set('view engine', 'pug')

const server = app.listen(app.get('port'), function(){
  console.log('party on', app.get('port'));
});

const io = require('socket.io')(server)

var Namespace = (slug) => {
  console.log("making space")

  var board  = io.of(`/${slug}`)
  var client = io.of(`/${slug}/client`)
  var admin = io.of(`/${slug}/admin`)

  board.on('connection', (socket) => {
    console.log('%s board connected', slug)
  })

  client.on('connection', (socket) => {
    console.log('%s client connected', slug)
    board.emit('client', Object.keys(board.sockets).length)
  })

  return({
    board: board,
    client: client,
    admin: admin
  })
}

mdb.connect({user: keys.mongo_user, pw: keys.mongo_pw}, function() {
  console.log('Connected to MongoDB')
  mdb
    .db()
    .collection('boards')
    .find()
    .toArray((err, results) => {
      if (err) throw err;
      results.forEach((b) => {
        // TODO: THIS IS PROBABLY STUPID,
        // BETTER TO CREATE NSP FOR ONLY
        // BOARDS WITH ACTIVE CONNECTIONS
        Namespace(b._id)
      })
    })
})

app.get('/', (req, res) => {
  res.render('create', {message: "hi pug"})
})

app.get('/favicon.ico', function(req, res) {
    res.status(204);
});

app.get('/:id', (req, res) => {
  mdb
    .db()
    .collection('boards')
    .findOne({_id : req.params.id}, (err, result) => {
      if (err) {
        console.log("board findOne err", err)
      }
      res.render('board', {board: result})
      // mdb.close()
    })
})

app.get('/board/:id', (req, res) => {
  console.log("querying mdb for", req.params.id)
  mdb
    .db()
    .collection('boards')
    .findOne({_id: req.params.id}, (err, result) => {
      if (err) {
        console.log("id check err", err)
        return res.status(500).json({err: "sigh, a vague error :("})
      }
      res.status(200).json({result: result})
    })
})

app.post('/board', (req, res) => {
  mdb
    .db()
    .collection('boards')
    .insertOne(req.body, (err, insert) => {
      if (err) {
        console.log("board insertion err", err)
      }
      res.status(200).json(insert.ops[0])
      // mdb.close()
    })
})

app.get('/:id/admin', (req, res) => {
  mdb
    .db()
    .collection('boards')
    .findOne({_id : req.params.id}, (err, result) => {
      if (err) {
        console.log("admin findOne err", err)
      }
      res.render('admin', {board: result})
      // mdb.close()
    })
})

app.get('/:id/party', (req, res) => {
  mdb
    .db()
    .collection('boards')
    .findOne({_id : req.params.id}, (err, result) => {
      if (err) {
        console.log("client findOne err", err)
      }
      res.render('client', {board: result})
      // mdb.close()
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
