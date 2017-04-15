import React, { Component } from 'react'
import ImgUploadBlock from './ImgUploadBlock.jsx'
import ImgUrlBlock from './ImgUrlBlock.jsx'

class ImgBlock extends Component {
  render() {
    return(
      <div className={"image dashboard" + (this.props.open ? "" : " none")}>
        {
          this.props.feats.img_url
          ?
          <ImgUrlBlock emit={this.props.emit} />
          :
          null
        }
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
