const mdb = require('./mongo_client')

module.exports = (server) => {
  var io = require('socket.io')(server)
  io.yogas = {}

  io.Namespace = (dbBoard, callback) => {
    console.log("making space")

    var slug = dbBoard._id
    var board  = io.of(`/${slug}`)
    var client = io.of(`/${slug}/client`)
    var admin = io.of(`/${slug}/admin`)
    var els = (dbBoard.els && dbBoard.els.length) ? dbBoard.els : []
    var discTO

    var deleteNsp = () => {
      board.removeAllListeners()
      client.removeAllListeners()
      admin.removeAllListeners()

      delete io.nsps[`/${slug}`]
      delete io.nsps[`/${slug}/client`]
      delete io.nsps[`/${slug}/admin`]

      console.log("deleted %s", slug)
    }

    var checkConnections = () => {
      var boardCnts = Object.keys(board.connected).length
      var clientCnts = Object.keys(client.connected).length
      var adminCnts = Object.keys(admin.connected).length

      if (boardCnts === 0 && clientCnts === 0 && adminCnts === 0) {
        discTO = setTimeout(() => {

	mdb
          .db()
          .collection("boards")
          .update({_id: slug}, {$set: {els: els}}, (err, result) => {
            if (err) {
              console.log("board update err", err)
              return
            }
            console.log(`board els updated ${result} deleting nsp`)
            deleteNsp()
          })
        
	}, 3000)
      }
    }

    board.on('connection', (socket) => {
      clearTimeout(discTO)
      console.log('%s board connected', slug)
      socket.on('disconnect', () => {
        console.log("%s board disconnect", slug)
        checkConnections()
      })
      socket.emit('initEls', els)
      socket.on('pop', (data) => {
        els.shift()
      })
    })

    client.on('connection', (socket) => {
      clearTimeout(discTO)
      console.log('%s client connected', slug)
      socket.on('disconnect', () => {
        console.log("%s client disconnect", slug)
        checkConnections()
      })
      socket.on('el', (data) => {
        els.push(data)
        board.emit('el', data)
      })
    })

    admin.on('connection', (socket) => {
      clearTimeout(discTO)
      console.log('%s admin connected', slug)
      socket.on('disconnect', () => {
        console.log("%s admin disconnect", slug)
        checkConnections()
      })
      socket.on('wipe', (data) => {
        els = []
        board.emit('wipeEls')
      })
    })

    if (callback) {
      callback()
    }
    return({
      board: board,
      client: client,
      admin: admin,
    })
  }

  return io
}
