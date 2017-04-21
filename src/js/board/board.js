import io from 'socket.io-client'

let main = document.querySelector("main")
let elCap = 10

const slug = document.body.getAttribute("data-slug")
console.log(`${slug} board`)

const pasteEl = (html) => {
  let node = document.createElement('span');
  main.appendChild(node);
  node.outerHTML = html;

  let mainLen = main.childNodes.length
  if (mainLen > elCap) {
    main.childNodes[0].className += ' glow-out';
    setTimeout(() => {
      main.removeChild(main.childNodes[0]);
      socket.emit('pop', {el : main.childNodes[0]});
    }, 500);
  }
}

const socket = io(`/${slug}`)
socket.on('initEls', (data) => {
  data.forEach(d => {
    pasteEl(d)
  })
})

socket.on('el', (data) => {
  // console.log("new el:", data)
  pasteEl(data)
})
