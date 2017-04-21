import io from 'socket.io-client'

const slug = document.body.getAttribute("data-slug")
const socket = io(`/${slug}/admin`)

const board_clear = document.getElementById("board_clear")
board_clear.addEventListener("click", () => {
  console.log("tryina wipee")
  socket.emit("wipe", {})
  // fetch(`/${slug}/admin/wipe`)
  // .then((res) => {
  //   console.log(res)
  // })
})
