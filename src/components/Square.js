import React, { Component } from "react"
import { connect } from "react-redux"
import "./css/Square.css"
import { addEntry } from "../store/board"
import { selectSquare } from "../store/selectedSquare"

class Square extends Component {
  constructor(props) {
    super(props)
  }

  handleChange = event => {
    this.props.addEntry({
      row: this.props.row,
      column: this.props.column,
      entry: event.target.value.toUpperCase()
    })
  }

  handleClick = () => {
    console.log("yo yo yo")
    this.props.selectSquare({ row: this.props.row, column: this.props.column })
  }

  render() {
    const { row, column, selectedSquare, square } = this.props
    return !square.blackSquare ? (
      <div
        className={
          row === selectedSquare.row && column === selectedSquare.column
            ? "Square Square-Selected"
            : "Square"
        }
      >
        <div className="Square-Number">
          {this.props.square.number}, {this.props.square.letter}
        </div>
        <input
          className="Square-Entry"
          maxLength="1"
          type="text"
          tabIndex="-1"
          onChange={this.handleChange}
          onClick={this.handleClick}
          style={{ textTransform: "uppercase" }}
        />
      </div>
    ) : (
      <div className="Square Square-Black" />
    )
  }
}

const mapState = ({ selectedSquare }) => ({ selectedSquare })
const mapDispatch = { addEntry, selectSquare }

export default connect(
  mapState,
  mapDispatch
)(Square)
