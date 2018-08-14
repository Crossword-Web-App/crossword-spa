import React, { Component } from "react"
import "./css/Board.css"
import { connect } from "react-redux"
import Row from "./Row"

class Board extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="Board">
        {this.props.board.map((row, idx) => (
          <Row key={idx} row={idx} squares={row} />
        ))}
      </div>
    )
  }
}

const mapState = ({ board }) => ({ board })
export default connect(
  mapState,
  null
)(Board)
