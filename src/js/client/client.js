// (function() {
//   console.log("client")
//   var socket = io('/'+document.body.getAttribute("data-slug")+'/client')
// })()
import React from 'react'
import { render } from 'react-dom'

const Root = () => {
  return(
    <div>
      hello
    </div>
  )
}

render(<Root/>, document.getElementById("root"))
