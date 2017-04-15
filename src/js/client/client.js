import React from 'react'
import { render } from 'react-dom'
import ClientForm from './components/ClientForm.jsx'

import Promise from 'promise-polyfill'
import 'whatwg-fetch'

if (!window.Promise) {
  window.Promise = Promise;
}

const Root = () => {
  const socket = io('/'+document.body.getAttribute("data-slug")+'/client')
  return(
    <ClientForm
      socket={socket}
      board={{
        slug: document.body.getAttribute("data-slug"),
        title: window.yogaTitle,
        feats: window.yogaFeats
      }} />
  )
}

render(<Root/>, document.getElementById("root"))
