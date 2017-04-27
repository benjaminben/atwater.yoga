import React, { Component } from 'react'
import ImgUploadBlock from './ImgUploadBlock.jsx'
import ImgUrlBlock from './ImgUrlBlock.jsx'

class ImgBlock extends Component {
  constructor(props) {
    super(props)

    this.conjureEl = this.conjureEl.bind(this)
  }

  conjureEl(src, filter) {
    let img = document.createElement("img")
    img.className = "el"
    img.src = src

    let widthVar = (Math.random() * 25).toFixed()
    img.style.width = `${widthVar}vw`
    img.style.height = "auto"

    img.style.top = `${(Math.random() * 80 - 10).toFixed()}%`
    img.style.left = `${(Math.random() * (100 - widthVar)).toFixed()}%`

    if (filter) {
      let sepia = Math.round(Math.random() * 50)
      let saturate = Math.round(Math.random() * 500)
      let contrast = Math.round(Math.random() * 50 + 100)
      let leFilt = `sepia(${sepia}%) saturate(${saturate}%) contrast(${contrast}%)`

      img.style.filter = leFilt
    }


    return img
  }

  render() {
    return(
      <div className={"image dashboard" + (this.props.open ? "" : " none")}>
        {
          this.props.feats.img_url
          ?
          <ImgUrlBlock emit={this.props.emit} conjureEl={this.conjureEl} />
          :
          null
        }
        {
          this.props.feats.img_upload
          ?
          <ImgUploadBlock emit={this.props.emit} conjureEl={this.conjureEl} />
          :
          null
        }
      </div>
    )
  }
}

export default ImgBlock
