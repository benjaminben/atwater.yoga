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
  }

  inputStart(e) {
    this.circ.removeEventListener("mousedown", this.inputStart)
    console.log("down", e.clientX)
    this.setState({startX: e.clientX})
    window.addEventListener("mousemove", this.inputUpdate)
    window.addEventListener("mouseup", this.inputEnd)
  }

  inputUpdate(e) {
    // console.log(this.state.startX, e.clientX)
    let delta = (this.state.startX - e.clientX) *
                (e.clientX < this.state.startX ? 1 : -1)

    if ((delta / 100 + this.props.pct) <= (this.range.end / 100) &&
        (delta / 100 + this.props.pct) >= (this.range.start / 100)) {

      console.log(delta / 100)
      this.props.action(delta / 100)
    }
  }

  inputEnd(e) {
    console.log("up", e.clientX)
    window.removeEventListener("mousemove", this.inputUpdate)
    window.removeEventListener("mouseup", this.inputEnd)
    this.circ.addEventListener("mousedown", this.inputStart)
  }

  render() {
    return(
      <svg width={this.range.end + this.range.start} height="40" viewBox={`0 0 ${this.range.end + this.range.start} 20`}>
        <line x1={this.range.start} x2={this.range.end} y1={10} y2={10} strokeWidth="4" stroke="black" />
        <circle ref={(el) => this.circ = el}
                cx={this.props.pct * this.range.end + this.range.start}
                cy={10} r={8} strokeWidth="1" stroke="black" fill="white" />
      </svg>
    )
  }
}

export default PctSlider
