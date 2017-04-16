import React, {Component} from 'react'
import DoodleBox from './DoodleBox.jsx'
import ColorPicker from './ColorPicker.jsx'

class DoodleBlock extends Component {
  constructor(props) {
    super(props)

    this.state = {
      color: "#000000"
    }

    this.updateColor = this.updateColor.bind(this)
  }

  updateColor(hex) {
    this.setState({
      color: hex
    })
  }

  render() {
    return(
      <div id="DoodleBlock"
           className={"dashboard" + (this.props.open ? "" : " none")}>
        <DoodleBox color={this.state.color} />
        <ColorPicker action={this.updateColor} />
      </div>
    )
  }
}

export default DoodleBlock
