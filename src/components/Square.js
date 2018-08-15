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
    if (this.selectedInput) this.selectedInput.focus()
  }

  render() {
    const { row, column, selectedSquare, square, board } = this.props
    let className = 'Square'
    let inputClassName = 'Square-Entry'

    if (square.blackSquare) {
      className += ' Square-Black'
    }

    if (row === 0) {
      className += ' Square-Top'
    }

    if (row === board[0].length - 1) {
      className += ' Square-Bottom'
    }

    if (column === 0) {
      className += ' Square-Left'
    }

    if (column === board[0].length - 1) {
      className += ' Square-Right'
    }

    if (square.isRevealed) {
      className += ' Square-Revealed'
    } else if (row === selectedSquare.row && column === selectedSquare.column) {
      className += ' Square-Selected'
    }
    
    if (square.isChecked) {
      className += ' Square-Checked'
    }

    if (square.displayWrong) {
      inputClassName += ' Square-Checked-Incorrect'
    }
    
    return !square.blackSquare ? (
      <div className={className} onClick={this.handleClick}>
        <div className="Square-Number">
          {square.number}
        </div>
        {!square.isRevealed ? (
          <input
            className={inputClassName}
            maxLength="1"
            type="text"
            tabIndex="-1"
            ref={input => {
              this.selectedInput = input
            }}
            onChange={this.handleChange}
          />
        ) : (
          <div
            className={
              square.isChecked
                ? 'Square-Revealed-Text Square-No-Select Square-Correct'
                : 'Square-Revealed-Text Square-No-Select'
            }
          >
            {square.letter.toUpperCase()}
          </div>
        )}
      </div>
    ) : (
      <div className={className} />
    )
  }
}

const mapState = ({ board, selectedSquare }) => ({ board, selectedSquare })
const mapDispatch = { addEntry, selectSquare }

export default connect(
  mapState,
  mapDispatch
)(Square)
