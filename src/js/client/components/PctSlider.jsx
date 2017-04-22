import React, {Component} from 'react'

class PctSlider extends Component {
  constructor(props) {
    super(props)

    this.range = {start: 0, end: 100}

    this.inputStart = this.inputStart.bind(this)
    this.inputUpdate = this.inputUpdate.bind(this)
    this.inputEnd = this.inputEnd.bind(this)
  }

  componentDidMount() {
    this.slider.addEventListener("mousedown", this.inputStart)
    this.slider.addEventListener("touchstart", this.inputStart)
  }

  inputStart(e) {
    this.inputUpdate(e)

    this.slider.removeEventListener("mousedown", this.inputStart)
    this.slider.removeEventListener("touchstart", this.inputStart)

    // let startX = e.type === "touchstart" ? e.targetTouches[0].clientX : e.clientX
    // this.setState({startX: startX})

    window.addEventListener("mousemove", this.inputUpdate)
    window.addEventListener("touchmove", this.inputUpdate)
    window.addEventListener("mouseup", this.inputEnd)
    window.addEventListener("touchend", this.inputEnd)
  }

  inputUpdate(e) {
    let evt = (e.type === "touchmove" || e.type === "touchstart")
              ? e.targetTouches[0] : e

    let rect = this.slider.getBoundingClientRect()
    let target = evt.clientX - rect.left
    let ratio = (target / rect.width).toFixed(2)

    if (ratio >= 0 && ratio <= 1) {
      this.props.action(ratio)
    }
  }

  inputEnd(e) {
    window.removeEventListener("mousemove", this.inputUpdate)
    window.removeEventListener("touchmove", this.inputUpdate)
    window.removeEventListener("mouseup", this.inputEnd)
    window.removeEventListener("touchend", this.inputEnd)
    this.slider.addEventListener("mousedown", this.inputStart)
    this.slider.addEventListener("touchstart", this.inputStart)
  }

  render() {
    return(
      <svg className="slider-pct" width={this.range.end + this.range.start} height="40" viewBox={`0 0 ${this.range.end + this.range.start} 20`}>
        <g ref={(el) => this.slider = el}>
          <line x1={this.range.start} x2={this.range.end} y1={10} y2={10} strokeWidth="4" stroke="black" />
          <circle ref={(el) => this.circ = el}
                  cx={this.props.pct * (this.range.end + this.range.start)}
                  cy={10} r={8} strokeWidth="1" stroke="black" fill="white" />
        </g>
      </svg>
    )
  }
}

export default PctSlider
