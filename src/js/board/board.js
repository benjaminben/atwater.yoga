import io from 'socket.io-client'

const slug = document.body.getAttribute("data-slug")
const socket = io(`/${slug}`)

let main = document.getElementById("Board")
let elCap = 75

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

socket.on('initEls', (data) => {
  console.log("initting", data)
  data.forEach(d => {
    pasteEl(d)
  })
})

socket.on('wipeEls', () => {
  console.log("potty trainin")
  Array.from(main.childNodes).forEach((el) => {
    el.className += " glow-out"
    setTimeout(() => {
      main.removeChild(el)
    }, 500);
  })
})

socket.on('el', (data) => {
  // console.log("new el:", data)
  pasteEl(data)
})
