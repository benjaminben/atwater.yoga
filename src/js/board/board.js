import io from 'socket.io-client'

let main = document.querySelector("main")

const slug = document.body.getAttribute("data-slug")
console.log(`${slug} board`)

const makeEl = (data) => {
  let node = document.createElement("span")
  main.appendChild(node)
  node.outerHTML = data
}

const socket = io(`/${slug}`)
socket.on('initEls', (data) => {
  data.forEach(d => {
    makeEl(d)
  })
})
socket.on('el', (data) => {
  console.log("new el:", data)
  makeEl(data)
})
