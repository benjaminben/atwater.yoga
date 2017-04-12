import React, {Component} from 'react'

class BlockSwitch extends Component {
  render() {
    return(
      <span className={"switch float-right" + (this.props.open ? " active" : "")}
            onClick={this.props.toggle}>
        <svg width="40" height="40" viewBox="0 0 100 100">
          <circle cx={50} cy={50} r={48} stroke="black" strokeWidth="2" fill="none" />
          <line x1={20} x2={80} y1={50} y2={50} stroke="black" strokeWidth="2" />
          <line className="roto" x1={50} x2={50} y1={20} y2={80} stroke="black" strokeWidth="2" />
        </svg>
      </span>
    )
  }
}

export default BlockSwitch
