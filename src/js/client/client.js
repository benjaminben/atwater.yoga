(function() {
  console.log("client")
  var socket = io('/'+document.body.getAttribute("data-slug")+'/client')
})()
