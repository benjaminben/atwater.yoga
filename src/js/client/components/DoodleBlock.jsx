import React, {Component} from 'react'
import DoodleBox from './DoodleBox.jsx'
import ColorPicker from './ColorPicker.jsx'

class DoodleBlock extends Component {
  constructor(props) {
    super(props)

    this.state = {
      color: "#000000",
      dataUrl: null,
    }

    this.updateColor = this.updateColor.bind(this)
    this.updateDataUrl = this.updateDataUrl.bind(this)
    this.conjureEl = this.conjureEl.bind(this)
  }

  updateColor(hex) {
    this.setState({
      color: hex
    })
  }

  updateDataUrl(data) {
    this.setState({
      dataUrl: data
    })
  }

  conjureEl() {
    let img = new Image()
    let dataUrl = this.state.dataUrl

    img.src = dataUrl
    img.className = "el"

    let widthVar = (Math.random() * 30).toFixed()
    img.style.width = `${widthVar}vw`
    img.style.height = "auto"

    img.style.top = `${(Math.random() * 80 - 10).toFixed()}%`
    img.style.left = `${(Math.random() * (100 - widthVar)).toFixed()}%`

    return img
  }

  render() {
    return(
      <div id="DoodleBlock"
           className={"dashboard text-center" + (this.props.open ? "" : " none")}>
        <div className="mods">
          <div className="inline-block v-middle mod">
            <DoodleBox color={this.state.color} action={this.updateDataUrl} />
          </div>
          <div className="inline-block v-middle mod color">
            <h1 className="text-center" style={{color: this.state.color}}>ink color</h1>
            <ColorPicker action={this.updateColor} />
          </div>
        </div>
        {
          this.state.dataUrl
          ?
          <button className="block submit"
                  onClick={
                    () => this.props.emit(this.conjureEl(this.state.dataUrl))
                  }>
            submit doodle
          </button>
          :
          null
        }
      </div>
    )
  }
}

export default DoodleBlock
