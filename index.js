const express   = require('express')
const configure = require('./server/config')
const keys      = require('./keys')
const mdb       = require('./server/mongo_client')
const app       = express()

app = configure(app)

const server = app.listen(app.get('port'), function(){
  console.log('party on', app.get('port'));
});

const io = require('./server/io')(server)

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
        io.Namespace(b._id)
      })
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
