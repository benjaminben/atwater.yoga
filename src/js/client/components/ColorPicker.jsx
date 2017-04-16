import React, {Component} from 'react'

class ColorPicker extends Component {
  constructor(props) {
    super(props)

    this.inputStart = this.inputStart.bind(this)
    this.inputUpdate = this.inputUpdate.bind(this)
    this.inputEnd = this.inputEnd.bind(this)
    this.rgbToHex = this.rgbToHex.bind(this)
  }

  componentDidMount() {
    this.context = this.map.getContext("2d")
    let x = this.map.width / 2
    let y = this.map.height / 2
    let radius = 100
    let counterClockwise = false

    for (var angle = 0; angle <= 360; angle++) {
      let startAngle = (angle - 2)*Math.PI/180
      let endAngle = angle * Math.PI/180
      this.context.beginPath()
      this.context.moveTo(x, y);
      this.context.arc(x, y, radius, startAngle, endAngle, counterClockwise)
      this.context.closePath()

      let gradient = this.context.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, `hsl(${angle}, 10%, 100%)`)
      gradient.addColorStop(1, `hsl(${angle}, 100%, 50%)`)
      this.context.fillStyle = gradient
      this.context.fill()
    }

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
    let blob = this.context.getImageData(
                  (evt.clientX - rect.left),
                  (evt.clientY - rect.top),
                  1, 1
               ).data
    let hex = "#" + ("000000" + this.rgbToHex(blob[0], blob[1], blob[2])).slice(-6)
    this.props.action(hex)
  }

  inputEnd(e) {
    window.removeEventListener("mousemove", this.inputUpdate)
    window.removeEventListener("touchmove", this.inputUpdate)
    window.removeEventListener("mouseup", this.inputEnd)
    window.removeEventListener("touchend", this.inputEnd)
    this.map.addEventListener("mousedown", this.inputStart)
    this.map.addEventListener("touchstart", this.inputStart)
  }

  rgbToHex(r, g, b) {
      if (r > 255 || g > 255 || b > 255)
          throw "Invalid color component";
      return ((r << 16) | (g << 8) | b).toString(16);
  }

  render() {
    return(
      <canvas ref={(el) => this.map = el} className="color-picker" width="200px" height="200px"></canvas>
    )
  }
}

export default ColorPicker
