import io from 'socket.io-client'
import YouTubeIframeLoader from 'youtube-iframe'

const slug = document.body.getAttribute("data-slug")
const socket = io(`/${slug}`)

const bg = document.getElementById("board_bg")
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

const createYtBg = (vid_id) => {
  var div = document.createElement("div")
  div.id = "bg_yt"

  bg.appendChild(div)

  YouTubeIframeLoader.load((YT) => {
    let ytPlayer = new YT.Player("bg_yt", {
      height: "390",
      width: "640",
      videoId: vid_id,
      playerVars: { 'controls' : 0, 'showinfo' : 0, 'modestbranding' : 1 },
      events: {
        onReady: () => {ytPlayer.playVideo()},
        onError: () => {
          bg.innerHTML = ""
        },
        onStateChange: (e) => {
          if( e.data === 2 ){
            bg.innerHTML = ""
          }
          if( e.data === 0 ){
            ytPlayer.pauseVideo();
            ytPlayer.seekTo(0);
          }
        }
      }
    })
  })
}

socket.on('bg', (data) => {
  console.log(data)

  if (data.color && /^#[0-9A-F]{6}$/i.test(data.color)) {
    bg.style.backgroundColor = data.color
  }

  if (data.yt) {
    bg.innerHTML = ""
    createYtBg(data.yt)
  }
})
