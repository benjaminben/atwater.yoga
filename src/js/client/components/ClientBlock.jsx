import React, {Component} from 'react'
import TextBlock from './TextBlock.jsx'
import ImgBlock from './ImgBlock.jsx'

class ClientBlock extends Component {
  render() {
    const blockType = (flav) => {
      let comp

      switch (flav) {
        case "text":
          comp = <TextBlock emit={this.props.emit} feats={this.props.feats} />
          break
        case "img":
          comp = <ImgBlock emit={this.props.emit} feats={this.props.feats} />
          break
      }

      return comp
    }

    return(
      <div className={"block " + this.props.flavor}>
        {
          blockType(this.props.flavor)
        }
      </div>
    )
  }
}

export default ClientBlock
