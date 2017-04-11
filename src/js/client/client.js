import React from 'react'
import { render } from 'react-dom'
import ClientForm from './components/ClientForm.jsx'

const Root = () => {
  const socket = io('/'+document.body.getAttribute("data-slug")+'/client')
  return(
    <ClientForm
      socket={socket}
      board={{
        slug: document.body.getAttribute("data-slug"),
        feats: window.yogaFeats
      }} />
  )
}

render(<Root/>, document.getElementById("root"))
