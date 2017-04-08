module.exports = (server) => {
  var io = require('socket.io')(server)

  io.Namespace = (slug) => {
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

  return io
}
