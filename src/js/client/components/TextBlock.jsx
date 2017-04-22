import React, { Component } from 'react'
import PctSlider from './PctSlider.jsx'
import ColorPicker from './ColorPicker.jsx'

class TextBlock extends Component {
  constructor(props) {
    super(props)

    this.fontSizeMin = 12

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
        value: 'sans-serif',
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

    p.style.top = `${(Math.random() * 100).toFixed()}%`
    p.style.left = `${(Math.random() * 100).toFixed()}%`
    return p
  }

  updateFontSize(d) {
    this.setState({
      fontScale: this.state.fontScale + d
    })
  }

  updateColor(hex) {
    this.setState({color: hex})
  }

  render() {
    let roundedFontSize = (this.state.fontScale * this.fontSizeMin +
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
      <div className={"text dashboard" + (this.props.open ? "" : " none")}>
        <input ref={(el) => this.txt = el} className="block" style={inputStyle} defaultValue="Type something" />
        <div className="inline-block">
          <select className="block" value={this.state.fontFam} onChange={this.updateFontFam}>
            {
              this.fontFams.map((f, i) => {
                return(
                  <option key={i} value={f.value}>{f.label}</option>
                )
              })
            }
          </select>

          <p style={sizeStyle}>{`${roundedFontSize}px`}</p>
          <PctSlider pct={this.state.fontScale} action={this.updateFontSize} />
        </div>
        <div className="inline-block">
          <ColorPicker action={this.updateColor} />
        </div>
        <button className="block" onClick={() => this.props.emit(this.conjureEl(this.txt.value))}>submit</button>
      </div>
    )
  }
}

export default TextBlock

// onClick={() => this.props.emit(this.conjureEl("bloobs"))}
