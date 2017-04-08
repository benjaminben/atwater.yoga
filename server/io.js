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
    var cncts = 0

    board.on('connection', (socket) => {
      console.log('%s board connected', slug)
      cncts++

      socket.on('disconnect', () => {
        cncts--
        console.log('%s board disconnect: %s total cncts', slug, cncts)
      })
    })

    client.on('connection', (socket) => {
      console.log('%s client connected', slug)
      cncts++

      socket.on('disconnect', () => {
        cncts--
        console.log('%s client disconnect: %s total cncts', slug, cncts)
      })
    })

    return({
      board: board,
      client: client,
      admin: admin,
      cncts: cncts
    })
  }

  return io
}
