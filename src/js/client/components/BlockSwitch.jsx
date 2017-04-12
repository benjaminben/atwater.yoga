import React, {Component} from 'react'

class BlockSwitch extends Component {
  render() {
    return(
      <span className={"switch float-right" + (this.props.open ? " active" : "")}
            onClick={this.props.toggle}>
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <circle cx={50} cy={50} r={46} stroke="black" strokeWidth="4" fill="none" />
          <line x1={20} x2={80} y1={50} y2={50} stroke="black" strokeWidth="4" />
          <line x1={50} x2={50} y1={20} y2={80} stroke="black" strokeWidth="4" />
        </svg>
      </span>
    )
  }
}

export default BlockSwitch
