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
    let evt = (e.type === "touchmove" || e.type === "touchstart")
              ? e.targetTouches[0] : e
    let rect = this.map.getBoundingClientRect()

    if (evt.clientX > rect.left && evt.clientX < rect.right &&
        evt.clientY > rect.top && evt.clientY < rect.bottom) {
      let coords = {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      }
      console.log(coords)
      this.plots.push(coords)
      this.draw(this.plots)
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
  }

  draw(plots) {
    console.log("bish")

    this.context.strokeStyle = this.props.color
    this.context.lineJoin = "round"
    this.context.lineWidth = 5

    this.context.beginPath()
    this.context.moveTo(plots[0].x, plots[0].y)

    for (let i = 0; i < plots.length; i++) {
      this.context.lineTo(plots[i].x, plots[i].y)
    }
    // this.context.closePath()
    this.context.stroke()
  }

  clear() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
  }

  render() {
    return(
      <div className="doodle-box">
        <canvas className="doodle-box"
                width="300px" height="300px"
                ref={(el) => this.map = el}></canvas>
        <button className="block" onClick={this.clear}>clear</button>
      </div>
    )
  }
}

export default DoodleBox
