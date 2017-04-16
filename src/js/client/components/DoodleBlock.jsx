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

    img.style.width = `${(Math.random() * 25 + 5).toFixed()}vw`
    img.style.height = "auto"

    img.style.top = `${(Math.random() * 100).toFixed()}%`
    img.style.left = `${(Math.random() * 100).toFixed()}%`

    return img
  }

  render() {
    return(
      <div id="DoodleBlock"
           className={"dashboard" + (this.props.open ? "" : " none")}>
        <div className="inline-block">
          <DoodleBox color={this.state.color} action={this.updateDataUrl} />
        </div>
        <div className="inline-block">
          <h1 style={{color: this.state.color}}>pick color</h1>
          <ColorPicker action={this.updateColor} />
        </div>
        {
          this.state.dataUrl
          ?
          <button className="block"
                  onClick={
                    () => this.props.emit(this.conjureEl(this.state.dataUrl))
                  }>
            submit
          </button>
          :
          null
        }
      </div>
    )
  }
}

export default DoodleBlock
