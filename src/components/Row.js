import React, { Component } from "react"
import { connect } from "react-redux"
import Square from "./Square"
import "./css/Row.css"

class Row extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="Row">
        {this.props.squares.map((square, idx) => (
          <Square key={idx} row={this.props.row} column={idx} square={square} />
        ))}
      </div>
    )
  }
}

export default connect(
  null,
  null
)(Row)
