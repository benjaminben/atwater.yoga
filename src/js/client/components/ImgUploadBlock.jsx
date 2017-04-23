import React, { Component } from 'react'

class ImgUploadBlock extends Component {
  constructor(props) {
    super(props)

    this.state = {
      img_buff: null,
      imgur_url: null,
      uploading: false,
      filter: false,
    }

    this.previewUpload = this.previewUpload.bind(this)
    this.resifyImage = this.resifyImage.bind(this)
    this.getOrientation = this.getOrientation.bind(this)
    this.postToImgur = this.postToImgur.bind(this)
  }

  postToImgur() {
    let fd = new FormData()
    fd.append("image", this.state.img_buff.replace(/^data:image\/(png|jpe?g|gif|svg);base64,/, ""))

    this.setState({uploading: true})
    fetch("https://api.imgur.com/3/image", {
      method: "post",
      headers: {
        "Authorization": "Client-ID 81c405c05cad551"
      },
      body: fd
    })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log("derta", data.data.link)
      this.setState({
        imgur_url: data.data.link,
        uploading: false
      })
    })
  }

  previewUpload() {
    this.setState({
      img_buff: null,
      imgur_url: null
    })

    let file = this.stin.files[0]
    let reader = new FileReader()
    let imgType = file.type.split("/").pop()
    let orientation

    reader.didDBURL = (e) => {
      reader.removeEventListener("load", reader.didDBURL)

      let image = new Image()
      image.onload = () => {
        // let gifs be gifs...
        if (imgType === "gif") {
          this.setState({img_buff: reader.result})
        }
        else {
          this.resifyImage(image, imgType, orientation)
        }
      }
      image.src = reader.result
    }

    reader.didAB = (e) => {
      reader.removeEventListener("load", reader.didAB)
      this.getOrientation(e.target.result, (ori) => {
        orientation = ori
        reader.addEventListener("load", reader.didDBURL)
        reader.readAsDataURL(file)
      })
    }

    reader.addEventListener("load", reader.didAB)

    if (file) {
      reader.readAsArrayBuffer(file)
    }
  }

  resifyImage(img, imgType, orientation) {
    console.log("dat ori:", orientation)
    console.log("dat type:", imgType)

    let canvas = document.createElement("canvas")
    let ctx = canvas.getContext("2d")
    let max_size = 1200
    let width
    let height

    // orient width / height
    switch (orientation) {
      case 6:
        width = img.height
        height = img.width
        break
      case 8:
        width = img.height
        height = img.width
        break
      default:
        width = img.width
        height = img.height
    }
    // size bounding to spec
    if (width > height) {
      if (width > max_size) {
        height *= max_size / width
        width = max_size
      }
    }
    else {
      if (height > max_size) {
        width *= max_size / height
        height = max_size
      }
    }
    // size canvas to bounding
    canvas.width = width
    canvas.height = height

    switch (orientation) {
      case 6:
        ctx.setTransform(0, 1, -1, 0, width, 0)
        ctx.drawImage(img, 0, 0, height, width)
        break
      case 8:
        ctx.setTransform(0, -1, 1, 0, 0, height)
        ctx.drawImage(img, 0, 0, height, width)
        break
      default:
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.drawImage(img, 0, 0, width, height)
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    let dataUrl = canvas.toDataURL(`image/${imgType}`)
    this.setState({img_buff: dataUrl})
  }

  getOrientation(result, callback) {
    var view = new DataView(result);
    if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
    var length = view.byteLength, offset = 2;
    while (offset < length) {
      var marker = view.getUint16(offset, false);
      offset += 2;
      if (marker == 0xFFE1) {
        if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
        var little = view.getUint16(offset += 6, false) == 0x4949;
        offset += view.getUint32(offset + 4, little);
        var tags = view.getUint16(offset, little);
        offset += 2;
        for (var i = 0; i < tags; i++)
          if (view.getUint16(offset + (i * 12), little) == 0x0112)
            return callback(view.getUint16(offset + (i * 12) + 8, little));
      }
      else if ((marker & 0xFF00) != 0xFF00) break;
      else offset += view.getUint16(offset, false);
    }
    return callback(-1);
  }

  render() {
    return(
      <div id="ImgUploadBlock">
        <label htmlFor="img_upload">Camera / Upload:</label>
        <input ref={(el) => this.stin = el}
               onChange={this.previewUpload}
               type="file" accept="image/*"
               name="img_upload" className="block file-picker" />
        {
          this.state.img_buff
          ?
          <img className="block buff" src={this.state.img_buff} />
          :
          null
        }
        {
          // do we have an image previewed?
          this.state.img_buff
          ?
          (
            // are we uploading the previewed image?
            this.state.uploading
            ?
            <span className="block text-center">uploading...</span>
            :
            (
              this.state.imgur_url
              ?
              <div className="text-center">
                <label className="inline-block v-middle" htmlFor="filter">#filter:</label>
                <input className="inline-block v-middle" name="filter" type="checkbox" onChange={() => {
                  this.setState({filter: !this.state.filter})
                }} />
                <button className="block submit"
                        onClick={
                          () =>
                            this.props.emit(
                              this.props.conjureEl(
                                this.state.imgur_url,
                                this.state.filter
                              )
                            )
                        }>
                  submit img
                </button>
              </div>
              :
              <button className="block submit"
                      onClick={this.postToImgur}>
                generate url
              </button>
            )

          )
          :
          null
        }

      </div>
    )
  }
}

export default ImgUploadBlock
