import React, { Component } from 'react'
import PctSlider from './PctSlider.jsx'

class TextBlock extends Component {
  constructor(props) {
    super(props)

    this.fontSizeMin = 12

    this.state = {
      color: "#000000",
      fontScale: 0.5,
      fontFam: "arial",
    }

    this.slideFontSize = this.slideFontSize.bind(this)
    this.updateFontFam = this.updateFontFam.bind(this)
    this.conjureEl = this.conjureEl.bind(this)
  }

  updateFontFam(e) {
    this.setState({
      fontFam: e.target.value
    })
  }

  conjureEl(text) {
    let p = document.createElement("p")
    p.className = "el"
    p.textContent = text
    return p
  }

  slideFontSize(d) {
    this.setState({
      fontScale: this.state.fontScale + d
    })
  }

  render() {
    let inputStyle = {
      color: this.state.color,
      fontFamily: this.state.fontFam,
    }

    let sizeStyle = {
      color: this.state.color,
      fontSize: `${this.state.fontScale * this.fontSizeMin + this.fontSizeMin}px`,
    }

    return(
      <div className="block text">
        <input className="block" style={inputStyle} defaultValue="Type something" />
        <div className="inline-block">
          <select className="block" value={this.state.fontFam} onChange={this.updateFontFam}>
            <option value="courier" style={{fontFamily: 'courier'}}>courier</option>
            <option value="arial" style={{fontFamily: 'arial'}}>arial</option>
            <option value="sans-serif" style={{fontFamily: 'sans-serif'}}>sans-serif</option>
          </select>

          <p style={sizeStyle}>{`${this.state.fontScale * this.fontSizeMin + this.fontSizeMin}px`}</p>
          <PctSlider pct={this.state.fontScale} action={this.slideFontSize} />
        </div>
      </div>
    )
  }
}

export default TextBlock

// onClick={() => this.props.emit(this.conjureEl("bloobs"))}
