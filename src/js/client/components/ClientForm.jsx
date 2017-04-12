import React, { Component } from 'react'
import ClientBlock from './ClientBlock.jsx'

class ClientForm extends Component {
  constructor(props) {
    super(props)

    // this.conjureEl = this.conjureEl.bind(this)
    this.emitEl = this.emitEl.bind(this)
  }

  // conjureEl() {

  // }

  emitEl(el) {
    console.log("emittens", el)
    this.props.socket.emit("el", el.outerHTML)
  }

  render() {
    const board = this.props.board
    return(
      <div id="ClientForm">
        <header>
          <h1 className="title text-center">{board.title}</h1>
          <p className="sub flex">@yoga</p>
        </header>
        {
          board.feats.text
          ?
          <ClientBlock flavor={"text"} feats={board.feats} emit={this.emitEl} />
          :
          null
        }
        {
          board.feats.img_url || board.feats.img_upload
          ?
          <ClientBlock flavor={"image"} feats={board.feats} />
          :
          null
        }
        {
          board.feats.doodle
          ?
          <ClientBlock flavor={"doodle"} feats={board.feats} />
          :
          null
        }
      </div>
    )
  }
}

export default ClientForm
