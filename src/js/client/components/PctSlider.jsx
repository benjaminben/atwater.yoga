import React, {Component} from 'react'

class PctSlider extends Component {
  constructor(props) {
    super(props)

    this.range = {start: 0, end: 100}

    this.state = {
      startX: null
    }

    this.inputStart = this.inputStart.bind(this)
    this.inputUpdate = this.inputUpdate.bind(this)
    this.inputEnd = this.inputEnd.bind(this)
  }

  componentDidMount() {
    this.circ.addEventListener("mousedown", this.inputStart)
    this.circ.addEventListener("touchstart", this.inputStart)
  }

  inputStart(e) {
    this.circ.removeEventListener("mousedown", this.inputStart)
    this.circ.removeEventListener("touchstart", this.inputStart)

    let startX = e.type === "touchstart" ? e.targetTouches[0].clientX : e.clientX
    this.setState({startX: startX})

    window.addEventListener("mousemove", this.inputUpdate)
    window.addEventListener("touchmove", this.inputUpdate)
    window.addEventListener("mouseup", this.inputEnd)
    window.addEventListener("touchend", this.inputEnd)
  }

  inputUpdate(e) {
    let evt = (e.type === "touchmove" || e.type === "touchstart")
              ? e.targetTouches[0] : e

    let delta = -(this.state.startX - evt.clientX)

    if ((delta / 100 + this.props.pct) <= (this.range.end / 100) &&
        (delta / 100 + this.props.pct) >= (this.range.start / 100)) {

      this.setState({startX: evt.clientX})
      this.props.action(delta / 100)
    }
  }

  inputEnd(e) {
    window.removeEventListener("mousemove", this.inputUpdate)
    window.removeEventListener("touchmove", this.inputUpdate)
    window.removeEventListener("mouseup", this.inputEnd)
    window.removeEventListener("touchend", this.inputEnd)
    this.circ.addEventListener("mousedown", this.inputStart)
    this.circ.addEventListener("touchstart", this.inputStart)
  }

  render() {
    return(
      <svg className="slider-pct" width={this.range.end + this.range.start} height="40" viewBox={`0 0 ${this.range.end + this.range.start} 20`}>
        <line x1={this.range.start} x2={this.range.end} y1={10} y2={10} strokeWidth="4" stroke="black" />
        <circle ref={(el) => this.circ = el}
                cx={this.props.pct * this.range.end + this.range.start}
                cy={10} r={8} strokeWidth="1" stroke="black" fill="white" />
      </svg>
    )
  }
}

export default PctSlider
