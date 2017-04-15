import React, { Component } from 'react'

class ImgUploadBlock extends Component {
  constructor(props) {
    super(props)

    this.state = {
      img_buff: null,
      imgur_url: null,
      uploading: false,
    }

    this.previewUpload = this.previewUpload.bind(this)
    this.resifyImage = this.resifyImage.bind(this)
    this.getOrientation = this.getOrientation.bind(this)
    this.postToImgur = this.postToImgur.bind(this)
    this.conjureEl = this.conjureEl.bind(this)
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

  conjureEl(src) {
    let img = document.createElement("img")
    img.className = "el"
    img.src = src
    img.style.width = `${(Math.random() * 25 + 5).toFixed()}vw`
    img.style.height = "auto"

    img.style.top = `${(Math.random() * 100).toFixed()}%`
    img.style.left = `${(Math.random() * 100).toFixed()}%`

    return img
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

    reader.redDBURL = (e) => {
      reader.removeEventListener("load", reader.readDBURL)

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

    reader.redAB = (e) => {
      reader.removeEventListener("load", reader.redAB)
      this.getOrientation(e.target.result, (ori) => {
        orientation = ori
        reader.addEventListener("load", reader.redDBURL)
        reader.readAsDataURL(file)
      })
    }

    reader.addEventListener("load", reader.redAB)

    if (file) {
      reader.readAsArrayBuffer(file)
    }
  }

  resifyImage(img, imgType, orientation) {
    console.log("that ori:", orientation)

    let canvas = document.createElement("canvas")
    let max_size = 1200
    let width = img.width
    let height = img.height

    if (orientation === 6) {
      width = img.height
      height = img.width
    }

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

    canvas.width = width
    canvas.height = height

    let ctx = canvas.getContext("2d")

    if (orientation === 6) {
      ctx.setTransform(0, 1, -1, 0, width, 0)
      ctx.drawImage(img, 0, 0, height, width)
    }
    else {
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
        <input ref={(el) => this.stin = el}
               onChange={this.previewUpload}
               type="file" accept="image/*" />
        {
          this.state.img_buff
          ?
          <img className="block" src={this.state.img_buff} />
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
            <span>uploading...</span>
            :
            <button className="block"
                    style={{
                      background: this.state.imgur_url ? "green" : "pink"
                    }}
                    onClick={
                      this.state.imgur_url
                      ?
                      () => this.props.emit(this.conjureEl(this.state.imgur_url))
                      :
                      this.postToImgur
                    }>
              submit
            </button>
          )
          :
          null
        }

      </div>
    )
  }
}

export default ImgUploadBlock
