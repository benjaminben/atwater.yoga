import React, { Component } from 'react'
import ImgUploadBlock from './ImgUploadBlock.jsx'

class ImgBlock extends Component {
  render() {
    console.log(this.props.feats)
    return(
      <div className={"image dashboard" + (this.props.open ? "" : " none")}>
        {
          this.props.feats.img_upload
          ?
          <ImgUploadBlock emit={this.props.emit} />
          :
          null
        }
      </div>
    )
  }
}

export default ImgBlock
