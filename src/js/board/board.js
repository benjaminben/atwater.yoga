(function() {
  console.log("board")
  var socket = io('/'+document.body.getAttribute("data-slug"))
  socket.on('client', function(data) {
    console.log(data)
  })
})()
