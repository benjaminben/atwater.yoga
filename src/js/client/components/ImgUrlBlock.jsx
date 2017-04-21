import React, { Component } from 'react'

class ImgUrlBlock extends Component {
  constructor(props) {
    super(props)

    this.fetchTimeout = null

    this.state = {
      url: null,
      err: null,
      filter: false,
    }

    this.handleInput = this.handleInput.bind(this)
    // this.conjureEl = this.conjureEl.bind(this)
  }

  // conjureEl(src) {
  //   let img = document.createElement("img")
  //   img.className = "el"
  //   img.src = src
  //   img.style.width = `${(Math.random() * 25 + 5).toFixed()}vw`
  //   img.style.height = "auto"

  //   img.style.top = `${(Math.random() * 100).toFixed()}%`
  //   img.style.left = `${(Math.random() * 100).toFixed()}%`

  //   return img
  // }

  handleInput(e) {
    this.setState({err: null})
    window.clearTimeout(this.fetchTimeout)

    let url = e.target.value
    if (url.length > 0) {
      if (!url.split(".").pop().match(/(jpe?g|png|gif|svg)/)) {
        this.setState({
          err: "EXT"
        })
        return
      }

      this.fetchTimeout = window.setTimeout(() => {
        fetch(url, {mode: "no-cors"})
        .then((res) => {
          console.log(res)
          if (res.status >= 400) {
            this.setState({err: "REQ"})
            return
          }
          this.setState({
            err: null,
            url: url
          })
        })
      }, 1000)
    }


  }

  render() {
    return(
      <div id="ImgUrlBlock">
        <label htmlFor="img_url">URL:</label>
        <span className="float-right"
              style={{
                color: this.state.err === "EXT" ? "red" : "black"
              }}>
          must be .jpg / .png / .gif
        </span>
        <input name="img_url"
               className="block width100"
               placeholder="paste url"
               onChange={this.handleInput} />
        {
          this.state.err === "REQ"
          ?
          <h1 className="error">404 basically :(</h1>
          :
          null
        }
        {
          this.state.url
          ?
          <div>
            <img src={this.state.url} />
            <label htmlFor="filter">filter:</label>
            <input name="filter" type="checkbox"
                   onChange={() => {
                     this.setState({filter: !this.state.filter})
                   }} />
            <button className="block"
                    onClick={
                      () => this.props.emit(this.props.conjureEl(this.state.url, this.state.filter))}>
              submit
            </button>
          </div>
          :
          null
        }
      </div>
    )
  }
}

export default ImgUrlBlock
