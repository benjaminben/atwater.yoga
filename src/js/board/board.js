let main = document.querySelector("main")

const slug = document.body.getAttribute("data-slug")
console.log(`${slug} board`)

const socket = io(`/${slug}`)
socket.on('el', (data) => {
  console.log("new el:", data)

  let node = document.createElement("span")
  main.appendChild(node)
  node.outerHTML = data
})
