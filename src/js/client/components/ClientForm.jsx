import React, { Component } from 'react'
import TextBlock from './TextBlock.jsx'
import ImgUrlBlock from './ImgUrlBlock.jsx'
import ImgUploadBlock from './ImgUploadBlock.jsx'

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
      <div className="client-form">
        <h1>{board.slug}</h1>
        {
          board.feats.text
          ?
          <TextBlock emit={this.emitEl} />
          :
          null
        }
        {
          board.feats.img_url
          ?
          <ImgUrlBlock />
          :
          null
        }
        {
          board.feats.img_upload
          ?
          <ImgUploadBlock />
          :
          null
        }
      </div>
    )
  }
}

export default ClientForm
