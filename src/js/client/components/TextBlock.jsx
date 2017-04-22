import React, { Component } from 'react'
import PctSlider from './PctSlider.jsx'
import ColorPicker from './ColorPicker.jsx'

class TextBlock extends Component {
  constructor(props) {
    super(props)

    this.fontSizeMin = 12
    this.fontSizeMax = 24
    this.fontSizeRange = this.fontSizeMax - this.fontSizeMin

    this.fontFams = [
      {
        value: 'courier',
        label: 'courier',
      },
      {
        value: 'arial',
        label: 'arial',
      },
      {
        value: 'serif',
        label: 'times new roman',
      },
      {
        value: '\"Comic Sans MS\", arial, /* Windows, MacOS */ helvetica, /* Unix+X, MacOS */ sans-serif',
        label: 'comic sans',
      },
      {
        value: '\"andale mono\", /* MS WebFont */ "monotype.com", /* MS WebFont, former name */ monaco, /* MacOS */ /* Fallback options */ "courier new", /* Windows, MacOS */ courier, /* Unix+X, MacOS */ monospace',
        label: 'andale'
      }
    ]

    this.state = {
      color: "#000000",
      fontScale: 0.8,
      fontFam: "arial",
    }

    this.updateColor = this.updateColor.bind(this)
    this.updateFontSize = this.updateFontSize.bind(this)
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
    p.style.color = this.state.color
    p.style.fontSize = `${(this.state.fontScale * this.fontSizeMin + this.fontSizeMin).toFixed()}px`
    p.style.fontFamily = this.state.fontFam

    let widthVar = Math.random() * (30)
    p.style.width = `${widthVar}%`

    p.style.top = `${(Math.random() * 100).toFixed()}%`
    p.style.left = `${(Math.random() * (100 - widthVar)).toFixed()}%`
    return p
  }

  updateFontSize(d) {
    this.setState({
      fontScale: d
    })
  }

  updateColor(hex) {
    this.setState({color: hex})
  }

  render() {
    let roundedFontSize = (this.state.fontScale * this.fontSizeRange +
                           this.fontSizeMin).toFixed()

    let inputStyle = {
      color: this.state.color,
      fontFamily: this.state.fontFam,
    }

    let sizeStyle = {
      color: this.state.color,
      fontSize: `${roundedFontSize}px`,
      fontFamily: this.state.fontFam,
    }

    return(
      <div id="TextBlock" className={"text text-center dashboard" + (this.props.open ? "" : " none")}>
        <input ref={(el) => this.txt = el} className="block sext width100" style={inputStyle} placeholder="Type something" defaultValue="Type something" />
        <div className="inline-block v-middle mod font">
          <select className="block" value={this.state.fontFam} onChange={this.updateFontFam}>
            {
              this.fontFams.map((f, i) => {
                return(
                  <option key={i} value={f.value}>{f.label}</option>
                )
              })
            }
          </select>

          <p style={sizeStyle}>{sizeStyle.fontSize}</p>
          <PctSlider pct={this.state.fontScale} action={this.updateFontSize} />
        </div>
        <div className="inline-block v-middle mod">
          <ColorPicker action={this.updateColor} />
        </div>
        <button className="block pointer submit" onClick={() => this.props.emit(this.conjureEl(this.txt.value))}>submit text</button>
      </div>
    )
  }
}

export default TextBlock

// onClick={() => this.props.emit(this.conjureEl("bloobs"))}
