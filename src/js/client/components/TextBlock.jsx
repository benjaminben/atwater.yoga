import React, { Component } from 'react'

class TextBlock extends Component {
  constructor(props) {
    super(props)

    // this.alchemy = this.alchemy.bind(this)
    this.conjureEl = this.conjureEl.bind(this)
  }

  // alchemy() {

  // }

  conjureEl(text) {
    let p = document.createElement("p")
    p.className = "el"
    p.textContent = text
    return p
  }

  render() {
    return(
      <div onClick={() => this.props.emit(this.conjureEl("bloobs"))}>
        text block
      </div>
    )
  }
}

export default TextBlock
