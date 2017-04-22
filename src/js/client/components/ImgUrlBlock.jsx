import React, { Component } from 'react'

class ImgUrlBlock extends Component {
  constructor(props) {
    super(props)

    this.fetchTimeout = null

    this.state = {
      url: null,
      err: null,
      filter: false,
      showHelp: false,
    }

    this.handleInput = this.handleInput.bind(this)
    this.toggleHelp = this.toggleHelp.bind(this)
  }

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

  toggleHelp() {
    this.setState({
      showHelp: !this.state.showHelp
    })
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
               className="block sext width100"
               placeholder="paste url"
               onChange={this.handleInput} />
        {
          this.state.err === "REQ"
          ?
          <h1 className="error">404 basically :(</h1>
          :
          null
        }
        <div className="help">
          {
            this.state.showHelp
            ?
            <p>
              {
                `okay so the best approach is probably to google image
                 search thing you're looking for, select an image and
                 then choose "view original image" or "open in a new
                 tab" or whatever your browser calls it, and then copy
                 the url from the new window and paste it above. make
                 sure the url ends with the file extension (e.g. .jpg)`
               }
               <br/><br/>
               <span onClick={this.toggleHelp}>GOT IT 👍</span>
            </p>
            :
            <p onClick={this.toggleHelp}>HELP 🤔</p>
          }
        </div>
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
