import React, {Component} from 'react'

class DoodleBox extends Component {
  constructor(props) {
    super(props)

    this.plots = []

    this.inputStart = this.inputStart.bind(this)
    this.inputUpdate = this.inputUpdate.bind(this)
    this.inputEnd = this.inputEnd.bind(this)
    this.draw = this.draw.bind(this)
    this.clear = this.clear.bind(this)
  }

  componentDidMount() {
    this.context = this.map.getContext("2d")
    this.map.addEventListener("mousedown", this.inputStart)
    this.map.addEventListener("touchstart", this.inputStart)
  }

  inputStart(e) {
    this.inputUpdate(e)

    this.map.removeEventListener("mousedown", this.inputStart)
    this.map.removeEventListener("touchstart", this.inputStart)
    window.addEventListener("mousemove", this.inputUpdate)
    window.addEventListener("touchmove", this.inputUpdate)
    window.addEventListener("mouseup", this.inputEnd)
    window.addEventListener("touchend", this.inputEnd)
  }

  inputUpdate(e) {
    // prevent scrolling
    e.preventDefault()

    let evt = (e.type === "touchmove" || e.type === "touchstart")
              ? e.targetTouches[0] : e
    let rect = this.map.getBoundingClientRect()

    if (evt.clientX > rect.left && evt.clientX < rect.right &&
        evt.clientY > rect.top && evt.clientY < rect.bottom) {
      let coords = {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      }
      this.plots.push(coords)
      this.draw(this.plots, e.type)
    }
  }

  inputEnd(e) {
    this.plots = []

    window.removeEventListener("mousemove", this.inputUpdate)
    window.removeEventListener("touchmove", this.inputUpdate)
    window.removeEventListener("mouseup", this.inputEnd)
    window.removeEventListener("touchend", this.inputEnd)
    this.map.addEventListener("mousedown", this.inputStart)
    this.map.addEventListener("touchstart", this.inputStart)

    this.props.action(this.map.toDataURL("image/png"))
  }

  draw(plots, type) {
    this.context.strokeStyle = this.props.color
    this.context.lineJoin = "round"
    this.context.lineCap = "round"
    this.context.lineWidth = 4

    this.context.beginPath()

    for (let i = 0; i < plots.length; i++) {
      if (i) {
        this.context.moveTo(plots[i-1].x, plots[i-1].y)
      }
      this.context.lineTo(plots[i].x, plots[i].y)
      this.context.stroke()
    }
  }

  clear() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
    this.props.action(null)
  }

  render() {
    return(
      <div className="doodle-box">
        <canvas className="doodle-box"
                width="250px" height="250px"
                ref={(el) => this.map = el}></canvas>
        <button className="block clear" onClick={this.clear}>clear</button>
      </div>
    )
  }
}

export default DoodleBox
