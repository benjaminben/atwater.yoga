// var els = [];

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

module.exports = (server) => {
  var io = require('socket.io')(server)
  io.yogas = {}

  io.Namespace = (slug) => {
    console.log("making space")

    var board  = io.of(`/${slug}`)
    var client = io.of(`/${slug}/client`)
    var admin = io.of(`/${slug}/admin`)
    var els = []

    var deleteNsp = () => {
      board.removeAllListeners()
      client.removeAllListeners()
      admin.removeAllListeners()

      delete io.nsps[`/${slug}`]
      delete io.nsps[`/${slug}/client`]
      delete io.nsps[`/${slug}/admin`]
    }

    var checkConnections = () => {
      var boardCnts = Object.keys(board.connected).length
      var clientCnts = Object.keys(client.connected).length
      var adminCnts = Object.keys(admin.connected).length

      if (boardCnts === 0 && clientCnts === 0 && adminCnts === 0) {
        deleteNsp()
      }
    }

    board.on('connection', (socket) => {
      console.log('%s board connected', slug)
      socket.emit('initEls', els)
      socket.on('pop', (data) => {
        els.shift()
      })
      socket.on('disconnect', () => {
        checkConnections()
      })
    })

    client.on('connection', (socket) => {
      console.log('%s client connected', slug)
      socket.on('disconnect', () => {
        checkConnections()
      })
      socket.on('el', (data) => {
        els.push(data)
        board.emit('el', data)
      })
    })

    return({
      board: board,
      client: client,
      admin: admin,
    })
  }

  return io
}
