import React, { Component } from 'react'
import { connect } from 'react-redux'
import './css/Square.css'
import { addEntry } from '../store/board'
import { selectSquare } from '../store/selectedSquare'

class Square extends Component {
  constructor(props) {
    super(props)
  }

  handleChange = event => {
    const { row, column, addEntry } = this.props
    addEntry({
      row,
      column,
      entry: event.target.value.toUpperCase()
    })
  }

  handleClick = () => {
    const { row, column, selectSquare } = this.props
    selectSquare({ row, column })
  }

  render() {
    const { row, column, selectedSquare, square } = this.props
    return !square.blackSquare ? (
      <div
        className={
          square.isRevealed
            ? 'Square Square-Revealed'
            : row === selectedSquare.row && column === selectedSquare.column
              ? 'Square Square-Selected'
              : 'Square'
        }
      >
        <div className="Square-Number">
          {square.number}, {square.letter}
        </div>
        {!square.isRevealed ? (
          <input
            className="Square-Entry"
            maxLength="1"
            type="text"
            tabIndex="-1"
            onChange={this.handleChange}
            onClick={this.handleClick}
            style={{ textTransform: 'uppercase' }}
          />
        ) : (
          <div className="Square-Revealed-Text">
            {square.letter.toUpperCase()}
          </div>
        )}
      </div>
    ) : (
      <div className="Square Square-Black" />
    )
  }
}

const mapState = ({ board, selectedSquare }) => ({ board, selectedSquare })
const mapDispatch = { addEntry, selectSquare }

export default connect(
  mapState,
  mapDispatch
)(Square)
