import React, {Component} from 'react'
import TextBlock from './TextBlock.jsx'
import ImgBlock from './ImgBlock.jsx'
import DoodleBlock from './DoodleBlock.jsx'
import BlockSwitch from './BlockSwitch.jsx'

class ClientBlock extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: true
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
      let emit  = this.props.emit
      let feats = this.props.feats
      let open  = this.state.open
      // important to use open to determine whether {display: none}
      // rather than not render component at all - this preserves
      // component input when user minimizes the block

      switch (flav) {
        case "text":
          comp = <TextBlock emit={emit}
                            feats={feats}
                            open={open} />
          break
        case "image":
          comp = <ImgBlock emit={emit}
                           feats={feats}
                           open={open} />
          break
        case "doodle":
          comp = <DoodleBlock emit={emit}
                              feats={feats}
                              open={open} />
      }

      return comp
    }

    return(
      <div className={"client-block clear-both " + this.props.flavor}>
        <div className="label">
          <span className="inline-block v-middle">{this.props.flavor}</span>
          <BlockSwitch toggle={this.toggleBlock} open={this.state.open} />
        </div>
        { blockType(this.props.flavor) }
      </div>
    )
  }
}

export default ClientBlock
