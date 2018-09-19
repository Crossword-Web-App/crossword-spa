import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Square from './Square'
import AnswerPanel from './AnswerPanel'
import { updateEntry, updateSelected } from '../store/board'
import {
  setMaxSquares,
  addSquare,
  removeSquare
} from '../store/remainingSquares'
import { changeDirection } from '../store/direction'
import { selectSquare } from '../store/selectedSquare'
import { selectLine } from '../store/selectedLine'
import { selectClue } from '../store/selectedClue'
import { selectAltClue } from '../store/selectedAltClue'
import { endGame } from '../store/gameState'
import './css/Board.css'

class Board extends Component {
  constructor(props) {
    super(props)

    // allows focus on change events
    this.squareInputRefs = []
  }

  // Input ref helper functions
  inputRef = ref => this.squareInputRefs.push(ref)

  focusOnFirst = () => this.squareInputRefs[0].focus()

  // Event handlers
  handleSquareClick = ({ row, column }) => {
    const { selectedSquare } = this.props
    this.changeSquare(
      this.getNextSquareFromRowAndColumn(row, column),
      ({ row, column }) =>
        selectedSquare.row === row && selectedSquare.column === column
    )
  }

  handleKeyDown = event => {
    const {
      direction,
      board,
      selectedSquare,
      updateEntry,
      remainingSquares,
      addSquare,
      removeSquare,
      endGame
    } = this.props
    const { row, column } = selectedSquare

    // Alphanumeric character
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      if (board[row][column].entry === '') {
        removeSquare()
      }

      updateEntry({
        row,
        column,
        entry: String.fromCharCode(event.keyCode)
      })

      // handle all squares filled logic
      if (remainingSquares <= 1) {
        // check if it's correct, end game if so
        const isCorrect =
          board
            .reduce((a, b) => a.concat(b))
            .filter(square => !(square.letter === square.entry)).length < 1 &&
          board[row][column].letter === String.fromCharCode(event.keyCode)

        if (isCorrect) {
          alert('Congratulations! A fun song should play now')
          endGame()
        } else {
          alert('all squares are filled but at least one letter is incorrect')
        }

        this.changeSquare(this.getNextSquare, () => false)
      } else if (
        direction === 'down' &&
        (row + 1 === board.length || board[row + 1][column].blackSquare)
      ) {
        this.changeSquare(this.tabDown, this.isBeforeFirstLetterSquare)
      } else {
        this.changeSquare(this.getNextSquare, this.isBeforeSquare)
      }
    } else {
      event.preventDefault()
      let prevSquare = {}
      switch (event.keyCode) {
        case 9:
        // TAB
        case 32:
          // SPACEBAR
          if (remainingSquares > 1) {
            direction === 'across'
              ? this.changeSquare(this.tabAcross, this.isBeforeSquare)
              : this.changeSquare(this.tabDown, this.isBeforeFirstLetterSquare)
          }
          break
        case 8:
        // DELETE on Mac, BACKSAPCE on Windows
        case 46:
          // fn+DELETE on Mac, DELETE on Windows

          // if nonempty, delete entry but stay in square
          if (board[row][column].entry !== '') {
            addSquare()
            updateEntry({
              row,
              column,
              entry: ''
            })
            this.changeSquare(null, () => false)
            break
          }

          // if empty, delete previous square's entry and go back one square
          prevSquare = this.getPrevSquare(direction)
          if (board[prevSquare.row][prevSquare.column].entry !== '') {
            addSquare()
            updateEntry({
              row: prevSquare.row,
              column: prevSquare.column,
              entry: ''
            })
          }

          this.changeSquare(this.getPrevSquare, () => false)
          break
        case 37:
          // LEFT ARROW
          if (direction !== 'across') this.changeSquare(null, () => true)
          else this.changeSquare(this.getPrevSquare, () => false)
          break
        case 39:
          // RIGHT ARROW
          if (direction !== 'across') this.changeSquare(null, () => true)
          else this.changeSquare(this.getNextSquare, () => false)
          break
        case 38:
          // UP ARROW
          if (direction !== 'down') this.changeSquare(null, () => true)
          else this.changeSquare(this.getPrevSquare, () => false)
          break
        case 40:
          // DOWN ARROW
          if (direction !== 'down') this.changeSquare(null, () => true)
          else this.changeSquare(this.getNextSquare, () => false)
          break
        default:
          break
      }
    }
  }

  componentDidUpdate = prevProps => {
    const {
      board,
      boardId,
      selectSquare,
      selectLine,
      updateSelected,
      setMaxSquares,
      clickedClueSquare
    } = this.props
    const { row, column } = clickedClueSquare

    // refresh the board when a new game is loaded
    if (prevProps.boardId !== boardId) {
      setMaxSquares(
        board
          .reduce((a, b) => a.concat(b))
          .filter(
            square => !square.blackSquare && square.entry !== square.letter
          ).length
      )

      // show selected square [0,0] and line
      const nextLine = this.getLine({ row: 0, column: 0 }, 'across')
      selectSquare({ row: 0, column: 0 })
      updateSelected({
        selectedSquare: { row: 0, column: 0 },
        nextSquare: { row: 0, column: 0 },
        selectedLine: [],
        nextLine
      })
      selectLine(nextLine)

      // focus on square [0,0] input
      this.focusOnFirst()
    }

    // update selected square based on changed clue panel selection
    if (
      row !== prevProps.clickedClueSquare.row ||
      column !== prevProps.clickedClueSquare.column
    ) {
      this.changeSquare(
        this.getNextSquareFromRowAndColumn(row, column),
        () => false
      )
    }
  }

  // Change Square function determines UI of next render
  changeSquare = (selectorFn, shouldChangeDirectionFn) => {
    const {
      selectedSquare,
      selectedLine,
      board,
      updateSelected,
      selectSquare,
      selectLine,
      selectClue,
      selectAltClue,
      changeDirection
    } = this.props
    let { direction } = this.props
    let nextSquare = selectedSquare

    // if a selector function has been provided, use it to find the next square
    if (selectorFn) {
      nextSquare = selectorFn(direction, selectedSquare)
    }

    // if a should change direction function has been provided, use it to
    // determine whether to change the direction
    if (shouldChangeDirectionFn) {
      if (shouldChangeDirectionFn(nextSquare)) {
        direction = this.getOtherDirection(direction)
        changeDirection()
      }
    }

    // get a new line based on next square and changed or same direction
    const nextLine = this.getLine(nextSquare, direction)

    // get the next clue
    const { nextClue, nextAltClue } = this.getNextClue(direction, nextSquare)

    // make appropriate updates to the store
    updateSelected({
      selectedSquare,
      nextSquare,
      selectedLine,
      nextLine
    })

    if (
      nextSquare.row !== selectedSquare.row ||
      nextSquare.column !== selectedSquare.column
    ){
      selectSquare(nextSquare)
    }

    selectLine(nextLine)
    selectClue(nextClue)
    selectAltClue(nextAltClue)

    // change the input focus to the input of the next square
    this.squareInputRefs[
      nextSquare.row * board.length - 1 + nextSquare.column + 1
    ].focus()
  }

  // Helper methods for finding selected squares and changing UI selection

  // method for finding a new line based on a changed selected square
  getLine = (square, direction) => {
    const { board } = this.props
    const { row, column } = square
    const lines = []

    if (Object.keys(square).length === 0) return lines

    if (direction === 'across') {
      let nextColumn = column + 1
      let prevColumn = column - 1
      let nextSquare = board[row][nextColumn]
      let prevSquare = board[row][prevColumn]

      while (nextColumn < board[0].length && !nextSquare.blackSquare) {
        lines.push({ row, column: nextColumn })
        nextSquare = board[row][nextColumn]
        nextColumn += 1
      }

      while (prevColumn >= 0 && !prevSquare.blackSquare) {
        lines.push({ row, column: prevColumn })
        prevSquare = board[row][prevColumn]
        prevColumn -= 1
      }

      return lines
    }

    let nextRow = row + 1 < board.length - 1 ? row + 1 : board.length - 1
    let prevRow = row - 1 > 0 ? row - 1 : 0
    let nextSquare = board[nextRow][column]
    let prevSquare = board[prevRow][column]

    while (nextRow < board[0].length && !nextSquare.blackSquare) {
      lines.push({ row: nextRow, column })
      nextSquare = board[nextRow][column]
      nextRow += 1
    }

    while (prevRow >= 0 && !prevSquare.blackSquare) {
      lines.push({ row: prevRow, column })
      prevSquare = board[prevRow][column]
      prevRow -= 1
    }

    return lines
  }

  // return a selector function to return row and column as a square object
  getNextSquareFromRowAndColumn = (row, column) => () => ({ row, column })

  // for moving through the board with left and up arrow keys
  getPrevSquare = direction => {
    const { board, selectedSquare } = this.props
    let { row, column } = selectedSquare

    do {
      if (direction === 'across') column -= 1
      else row -= 1

      if (row < 0 && direction === 'down') {
        if (!board[row + 1][column].blackSquare) return { row: 0, column }
        return selectedSquare
      }

      if (column < 0 && direction === 'across') {
        if (!board[row][column + 1].blackSquare) return { row, column: 0 }
        return selectedSquare
      }
    } while (board[row][column].blackSquare)

    return { row, column }
  }

  // for moving through the board with right or down arrow keys
  getNextSquare = direction => {
    const { board, selectedSquare } = this.props
    let { row, column } = selectedSquare

    do {
      if (direction === 'across') column += 1
      else row += 1

      if (row === board.length && direction === 'down') {
        if (!board[row - 1][column].blackSquare) {
          return { row: board.length - 1, column }
        }

        return selectedSquare
      }
      if (column === board.length && direction === 'across') {
        if (!board[row][column - 1].blackSquare) {
          return { row, column: board.length - 1 }
        }

        return selectedSquare
      }
    } while (board[row][column].blackSquare)

    return { row, column }
  }

  /**
   * for finding the next square after text entry
   * also used as a piece of `tabAcross` function
   */
  getNextOpenSquare = (direction, square) => {
    const { board } = this.props
    let { row, column } = square
    let nextDirection = direction
    const start = board[row][column]

    while (
      board[row][column].blackSquare ||
      board[row][column].entry !== '' ||
      board[row][column] === start
    ) {
      // increment row or column by 1 depending on direction, end of line
      if (nextDirection === 'across') {
        if (column === board.length - 1) row += 1
        column = (column + 1) % board[0].length
      } else {
        if (row === board.length - 1) column += 1
        row = (row + 1) % board[0].length
      }

      // if while loop reaches last square,
      // start at beggining of board and change direction
      if (row === board.length || column === board.length) {
        nextDirection = this.getOtherDirection(nextDirection)
        row = 0
        column = 0
      }
    }

    return { row, column }
  }

  // for tabbing past the current word
  getNextNonOpenSquare = (direction, square) => {
    const { board } = this.props
    let { row, column } = square

    do {
      column += 1

      // if column exceeds length of the board, increment row, column to 0
      if (column >= board.length - 1) {
        row += 1
        column = 0
        if (row >= board.length) {
          // if row exceeds the length of the board, start over tabbing Down
          return { row: 0, column: 0 }
        }
        return { row, column }
      }
    } while (!board[row][column].blackSquare)
    return { row, column }
  }

  // for finding an empty square or black square, used in `tabDown` function
  getNextOpenSquareOrBlack = (direction, square) => {
    const { board } = this.props
    const { column } = square
    let { row } = square

    do {
      row += 1

      // return out of bounds row to be handled by calling function
      if (row >= board.length) return { row, column }

      // return empty square found on the board space
      if (row < board.length && board[row][column].entry === '') {
        return { row, column }
      }
    } while (!board[row][column].blackSquare)
    return { row: 0, column: 0 }
  }

  /**
   * for finding either the upper bound or black square moving up in a column
   * used for `tabDown` function to find the starting point for search
   */
  getPrevBlackOrBound = (direction, square) => {
    const { board } = this.props
    let { row, column } = square

    if (direction === 'across') {
      while (column - 1 >= 0 && !board[row][column - 1].blackSquare) {
        column -= 1
      }
      return column
    }

    while (row >= 1 && !board[row - 1][column].blackSquare) {
      row -= 1
    }
    return row
  }

  // finds the next empty square after current word in the across direction
  tabAcross = (direction, square) => {
    const { board } = this.props

    // find the next black square or start of new line
    let nextSquare = this.getNextNonOpenSquare(direction, square)

    // unless column is 0, empty, and entry capbale, find the next open square
    if (
      !(
        nextSquare.column === 0 &&
        board[nextSquare.row][nextSquare.column].entry === '' &&
        !board[nextSquare.row][nextSquare.column].blackSquare
      )
    ) {
      nextSquare = this.getNextOpenSquare(direction, nextSquare)
    }

    return nextSquare
  }

  // finds the next empty square after current word in the down direction
  tabDown = (direction, square) => {
    const { board } = this.props

    // start search at the first letter in a word in the down direction
    let { row, column } = {
      row: this.getPrevBlackOrBound(direction, square),
      column: square.column
    }
    let possibleSquare = { row: 0, column: 0 }
    do {
      // increment column by 1, row by 1 and reset column to 0 if at end of line
      if (column === board.length - 1) row += 1
      column = (column + 1) % board.length

      // change direction and tab across if at end of board
      if (row === board.length) {
        if (board[0][0].entry === '' && !board[0][0].blackSquare) {
          return { row: 0, column: 0 }
        }
        possibleSquare = this.getNextOpenSquareOrBlack('across', {
          row: 0,
          column: 0
        })
        if (!board[possibleSquare.row][possibleSquare.column].blackSquare) {
          return possibleSquare
        }
        return this.tabAcross('across', { row: 0, column: 0 })
      }

      // if row is 0 and entry capabale, check down for empty cell
      if (row === 0 && !board[row][column].blackSquare) {
        // return square if it is empty
        if (board[row][column].entry === '') {
          return { row, column }
        }

        // get next empty or black square
        possibleSquare = this.getNextOpenSquareOrBlack(direction, {
          row,
          column
        })
        if (!board[possibleSquare.row][possibleSquare.column].blackSquare) {
          return possibleSquare
        }
      }

      // if square is directly below a black square,
      // and square is entry capable and not empty,
      // check down for empty cell
      if (
        row - 1 >= 0 &&
        board[row - 1][column].blackSquare &&
        !board[row][column].blackSquare
      ) {
        // return square if it is empty
        if (board[row][column].entry === '') return { row, column }
        possibleSquare = this.getNextOpenSquareOrBlack(direction, {
          row,
          column
        })

        // return square if the row value is valid and square is not black
        if (
          possibleSquare.row < board.length &&
          !board[possibleSquare.row][possibleSquare.column].blackSquare
        ) {
          return possibleSquare
        }
      }
    } while (row < board.length)

    return { row: 0, column: 0 }
  }

  // returns opposite of the provided direction
  getOtherDirection = direction => (direction === 'across' ? 'down' : 'across')

  // Named shouldChangeDirectionFn functions

  // gets the ordinal number of the square going across/down rows
  getSequentialPosition = square => {
    const { board } = this.props
    return square.row * (board.length - 1) + square.column
  }

  isBeforeSquare = nextSquare => {
    const { selectedSquare } = this.props
    if (
      nextSquare.column < selectedSquare.column &&
      this.getSequentialPosition(nextSquare) <
        this.getSequentialPosition(selectedSquare)
    ) {
      return true
    }
    return false
  }

  /* returns true if sequential position is less than the sequential position
   * of the first letter of the current word
   */
  isBeforeFirstLetterSquare = nextSquare => {
    const { direction, selectedSquare } = this.props
    const topSquareRow = this.getPrevBlackOrBound(direction, selectedSquare)

    if (
      this.getSequentialPosition(nextSquare) <
      this.getSequentialPosition({
        row: topSquareRow,
        column: selectedSquare.column
      })
    ) {
      return true
    }
    return false
  }

  // Function to find the next selected clues
  getNextClue = (direction, nextSquare) => {
    const { board } = this.props
    let nextClue = 1
    let nextAltClue = 1
    if (direction === 'across') {
      const row = this.getPrevBlackOrBound('down', nextSquare)
      const column = this.getPrevBlackOrBound('across', nextSquare)
      nextClue = board[nextSquare.row][column].number
      nextAltClue = board[row][nextSquare.column].number
    } else {
      const row = this.getPrevBlackOrBound('down', nextSquare)
      const column = this.getPrevBlackOrBound('across', nextSquare)
      nextClue = board[row][nextSquare.column].number
      nextAltClue = board[nextSquare.row][column].number
    }
    return { nextClue, nextAltClue }
  }

  render = () => {
    const { board } = this.props
    return (
      <div className="Board">
        <div className="Board-Header" />
        <div className="Board-Grid" onKeyDown={this.handleKeyDown}>
          {board.map((row, rowIdx) => (
            <div
              className="Row"
              key={this.getSequentialPosition({ row: rowIdx, column: 0 })}
            >
              {row.map((square, columnIdx) => (
                <Square
                  key={this.getSequentialPosition({
                    row: rowIdx,
                    column: columnIdx
                  })}
                  row={rowIdx}
                  column={columnIdx}
                  square={square}
                  handleSquareClick={this.handleSquareClick}
                  inputRef={this.inputRef}
                />
              ))}
            </div>
          ))}
        </div>
        <AnswerPanel rowWidth={board.length} />
      </div>
    )
  }
}

Board.propTypes = {
  board: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        letter: PropTypes.string,
        entry: PropTypes.string,
        number: PropTypes.number.isRequired,
        blackSquare: PropTypes.bool.isRequired,
        isChecked: PropTypes.bool.isRequired,
        isRevealed: PropTypes.bool.isRequired,
        className: PropTypes.string.isRequired,
        numberClassName: PropTypes.string.isRequired,
        inputClassName: PropTypes.string.isRequired,
        noEditInputClassName: PropTypes.string.isRequired
      })
    )
  ).isRequired,
  boardId: PropTypes.number.isRequired,
  selectedSquare: PropTypes.shape({
    row: PropTypes.number,
    column: PropTypes.number
  }).isRequired,
  selectedLine: PropTypes.arrayOf(
    PropTypes.shape({
      row: PropTypes.number,
      column: PropTypes.number
    })
  ).isRequired,
  clickedClueSquare: PropTypes.shape({
    row: PropTypes.number,
    column: PropTypes.number
  }).isRequired,
  remainingSquares: PropTypes.number.isRequired,
  direction: PropTypes.string.isRequired,
  updateEntry: PropTypes.func.isRequired,
  addSquare: PropTypes.func.isRequired,
  removeSquare: PropTypes.func.isRequired,
  endGame: PropTypes.func.isRequired,
  setMaxSquares: PropTypes.func.isRequired,
  selectSquare: PropTypes.func.isRequired,
  selectClue: PropTypes.func.isRequired,
  selectAltClue: PropTypes.func.isRequired,
  selectLine: PropTypes.func.isRequired,
  updateSelected: PropTypes.func.isRequired,
  changeDirection: PropTypes.func.isRequired
}

const mapState = ({
  board,
  boardId,
  direction,
  selectedSquare,
  selectedLine,
  clickedClueSquare,
  remainingSquares
}) => ({
  board,
  boardId,
  direction,
  selectedSquare,
  selectedLine,
  clickedClueSquare,
  remainingSquares
})

const mapDispatch = {
  addSquare,
  removeSquare,
  updateEntry,
  selectSquare,
  selectLine,
  selectClue,
  selectAltClue,
  updateSelected,
  changeDirection,
  endGame,
  setMaxSquares
}

export default connect(
  mapState,
  mapDispatch
)(Board)
