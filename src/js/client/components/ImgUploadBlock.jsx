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
    // this.dataURLToBlob = this.dataURLToBlob.bind(this)
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
    img.style.width = `${(Math.random() * 40 + 10).toFixed()}vw`
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

    reader.addEventListener("load", () => {
      let image = new Image()
      image.onload = () => {
        // let gifs be gifs...
        if (imgType === "gif") {
          this.setState({img_buff: reader.result})
        }
        else {
          this.resifyImage(image, imgType)
        }
      }
      image.src = reader.result
    })

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  resifyImage(img, imgType) {
    let canvas = document.createElement("canvas")
    let max_size = 1200
    let width = img.width
    let height = img.height

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
    canvas.getContext("2d").drawImage(img, 0, 0, width, height)

    let dataUrl = canvas.toDataURL(`image/${imgType}`)
    // let resizedImage = this.dataURLToBlob(dataUrl)
    this.setState({img_buff: dataUrl})
  }

  // dataURLToBlob(data) {
  //   let BASE64_MARKER = ";base64,"

  //   if (data.indexOf(BASE64_MARKER) === -1) {
  //     let parts = data.split(",")
  //     let contentType = parts[0].split(":")[1]
  //     let raw = parts[1]

  //     return new Blob([raw], {type: contentType})
  //   }

  //   let parts = data.split(BASE64_MARKER)
  //   let contentType = parts[0].split(":")[1]
  //   let raw = window.atob(parts[1])
  //   let rawLength = raw.length

  //   let uInt8Array = new Uint8Array(rawLength)

  //   for (let i = 0; i < rawLength; i++) {
  //     uInt8Array[i] = raw.charCodeAt(i)
  //   }

  //   return new Blob(uInt8Array, {type: contentType})
  // }

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
