import io from 'socket.io-client'

const slug = document.body.getAttribute("data-slug")
const socket = io(`/${slug}/admin`)

const bg_yt_input = document.querySelector("#board_bg_admin input.youtube")
const bg_yt_submit = document.querySelector("#board_bg_admin button.youtube")
const bg_color_input = document.querySelector("#board_bg_admin input.color")
const bg_color_submit = document.querySelector("#board_bg_admin button.color")

bg_yt_submit.addEventListener("click", () => {
  if (bg_yt_input.value.length) {
    console.log("submitting yt")
    socket.emit("bg", {yt: bg_yt_input.value})
  }
})

bg_color_submit.addEventListener("click", () => {
  if (bg_color_input.value.length) {
    socket.emit("bg", {color: bg_color_input.value})
  }
})

const board_clear = document.getElementById("board_clear")
board_clear.addEventListener("click", () => {
  console.log("tryina wipee")
  socket.emit("wipe", {})
  // fetch(`/${slug}/admin/wipe`)
  // .then((res) => {
  //   console.log(res)
  // })
})
