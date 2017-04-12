import React, {Component} from 'react'
import TextBlock from './TextBlock.jsx'
import ImgBlock from './ImgBlock.jsx'
import BlockSwitch from './BlockSwitch.jsx'

class ClientBlock extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }

    this.toggleBlock = this.toggleBlock.bind(this)
  }

  toggleBlock() {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    const blockType = (flav) => {
      let comp

      switch (flav) {
        case "text":
          comp = <TextBlock emit={this.props.emit} feats={this.props.feats} />
          break
        case "image":
          comp = <ImgBlock emit={this.props.emit} feats={this.props.feats} />
          break
      }

      return comp
    }

    return(
      <div className={"client-block clear-both " + this.props.flavor}>
        <div className="label">
          <span className="inline-block v-middle">{this.props.flavor}</span>
          <BlockSwitch toggle={this.toggleBlock} open={this.state.open} />
        </div>
        {
          this.state.open
          ?
          blockType(this.props.flavor)
          :
          null
        }
      </div>
    )
  }
}

export default ClientBlock
