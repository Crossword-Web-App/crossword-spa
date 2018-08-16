import React, { Component } from 'react'
import { connect } from 'react-redux'
import Square from './Square'
import {
  setBorders,
  updateEntry,
  checkSquare,
  checkBoard,
  revealSquare,
  revealBoard,
  updateSelected
} from '../store/board'
import { changeDirection, setAcross, setDown } from '../store/direction'
import { selectSquare } from '../store/selectedSquare'
import { selectLine } from '../store/selectedLine'
import { selectClue } from '../store/selectedClue'
import { selectAltClue } from '../store/selectedAltClue'
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
  handleCheckClick = () => {
    this.props.checkSquare(this.props.selectedSquare)
  }

  handleCheckBoardClick = () => {
    this.props.checkBoard()
  }

  handleRevealClick = () => {
    this.props.revealSquare(this.props.selectedSquare)
  }

  handleRevealBoardClick = () => {
    this.props.revealBoard()
  }

  handleSquareClick = ({ row, column }) => {
    const { direction } = this.props
    this.changeSquare(
      this.getNextSquareFromRowAndColumn(row, column),
      direction
    )
  }

  handleKeyDown = event => {
    const {
      direction,
      board,
      selectedSquare,
      updateEntry,
      setAcross,
      setDown
    } = this.props
    const { row, column } = selectedSquare

    // Alphanumeric character
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      updateEntry({
        row,
        column,
        entry: String.fromCharCode(event.keyCode)
      })

      if (
        direction === 'down' &&
        (row + 1 === board.length || board[row + 1][column]['blackSquare'])
      ) {
        this.changeSquare(this.tabDown, direction)
      } else {
        this.changeSquare(this.getNextOpenSquare, direction)
      }
    } else {
      event.preventDefault()
      let prevSquare = {}
      switch (event.keyCode) {
        case 9:
          // TAB
          direction === 'across'
            ? this.changeSquare(this.tabAcross, direction)
            : this.changeSquare(this.tabDown, direction)
          break
        case 32:
          // SPACEBAR
          this.changeSquare(this.getNextOpenSquare, direction)
          break
        case 8:
        // DELETE on Mac, BACKSAPCE on Windows
        case 46:
          // fn+DELETE on Mac, DELETE on Windows

          // if nonempty, delete entry but stay in square
          if (board[row][column]['entry'] !== '') {
            updateEntry({
              row,
              column,
              entry: ''
            })
            this.changeSquare(null, direction)
            break
          }

          // if empty, delete previous square's entry and go back one square
          prevSquare = this.getPrevSquare(direction)
          if (board[prevSquare.row][prevSquare.column]['entry'] !== '') {
            updateEntry({
              row: prevSquare.row,
              column: prevSquare.column,
              entry: ''
            })
          }

          this.changeSquare(this.getPrevSquare, direction)
          break
        case 37:
          // LEFT ARROW
          if (direction !== 'across') {
            setAcross()
            this.changeSquare(null, 'across')
            break
          }

          this.changeSquare(this.getPrevSquare, 'across')
          break
        case 39:
          // RIGHT ARROW
          if (direction !== 'across') {
            setAcross()
            this.changeSquare(null, 'across')
            break
          }

          this.changeSquare(this.getNextSquare, 'across')
          break
        case 38:
          // UP ARROW
          if (direction !== 'down') {
            setDown()
            this.changeSquare(null, 'down')
            break
          }

          this.changeSquare(this.getPrevSquare, 'down')
          break
        case 40:
          // DOWN ARROW
          if (direction !== 'down') {
            setDown()
            this.changeSquare(null, 'down')
            break
          }

          this.changeSquare(this.getNextSquare, 'down')
          break
        default:
          break
      }
    }
  }

  // lifecycle methods
  componentDidMount = () => {
    const {
      setBorders,
      selectedSquare,
      selectLine,
      updateSelected,
      direction
    } = this.props

    // add border css to appropriate squares
    setBorders()

    // show selected square [0,0] and line
    let nextLine = this.getLine(selectedSquare, direction)
    updateSelected({
      selectedSquare,
      nextSquare: selectedSquare,
      selectedLine: [],
      nextLine
    })
    selectLine(nextLine)

    // focus on square [0,0] input
    this.focusOnFirst()
  }

  // helper methods for finding selected squares and changing UI selection
  changeSquare = (selectorFn, direction) => {
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
    let nextSquare = selectedSquare

    // if a selector function has been provided, use it to find the next square
    if (selectorFn) {
      nextSquare = selectorFn(direction, selectedSquare)
    }

    /**
     *  if the new square is behind the current one, change direction, as a
     *  change in direction is inferred (i.e., selector function has looped)
     */
    if (selectorFn !== this.getPrevSquare) {
      if (selectorFn === this.tabDown) {
        let topSquare = this.getPrevBlackOrBound(direction, selectedSquare)
        if (
          this.getSequentialPosition(nextSquare) <
          this.getSequentialPosition(topSquare)
        ) {
          direction = this.getOtherDirection()
          changeDirection()
        }
      } else if (
        nextSquare.row === selectedSquare.row &&
        nextSquare.column === selectedSquare.column
      ) {
        // second click on same square
        direction = this.getOtherDirection(direction)
        changeDirection()
      } else if (
        nextSquare.column < selectedSquare.column &&
        this.getSequentialPosition(nextSquare) <
          this.getSequentialPosition(selectedSquare)
      ) {
        direction = this.getOtherDirection(direction)
        changeDirection()
      }
    }

    // get a new line based on next square and changed or same direction
    const nextLine = this.getLine(nextSquare, direction)

    // get the next clue
    let nextClue = 1
    let nextAltClue = 1
    if (direction === 'across') {
      const row = this.getPrevBlackOrBound('down', nextSquare)
      const column = this.getPrevBlackOrBound('across', nextSquare)
      nextClue = board[nextSquare.row][column]['number']
      nextAltClue = board[row][nextSquare.column]['number']
    } else {
      const row = this.getPrevBlackOrBound('down', nextSquare)
      const column = this.getPrevBlackOrBound('across', nextSquare)
      nextClue = board[row][nextSquare.column]['number']
      nextAltClue = board[nextSquare.row][column]['number']
    }

    // make appropriate updates to the store
    updateSelected({
      selectedSquare,
      nextSquare,
      selectedLine,
      nextLine
    })
    selectSquare(nextSquare)
    selectLine(nextLine)
    selectClue(nextClue)
    selectAltClue(nextAltClue)

    // change the input focus to the input of the next square
    this.squareInputRefs[
      nextSquare.row * board.length - 1 + nextSquare.column + 1
    ].focus()
  }

  // method for finding a new line based on a changed selected square
  getLine = (square, direction) => {
    const { board } = this.props
    const { row, column } = square
    let lines = []

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

    if (direction === 'down') {
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
  }

  // return a selector function to return row and column as a square object
  getNextSquareFromRowAndColumn = (row, column) => {
    return () => ({ row, column })
  }

  // for moving through the board with left and up arrow keys
  getPrevSquare = direction => {
    let { board, selectedSquare } = this.props
    let { row, column } = selectedSquare

    do {
      if (direction === 'across') column -= 1
      else row -= 1

      if (row < 0 && direction === 'down') {
        if (!board[row + 1][column]['blackSquare']) return { row: 0, column }
        else return selectedSquare
      }

      if (column < 0 && direction === 'across') {
        if (!board[row][column + 1]['blackSquare']) return { row, column: 0 }
        else return selectedSquare
      }
    } while (board[row][column]['blackSquare'])

    return { row, column }
  }

  // for moving through the board with right or down arrow keys
  getNextSquare = direction => {
    let { board, selectedSquare } = this.props
    let { row, column } = selectedSquare

    do {
      if (direction === 'across') column += 1
      else row += 1

      if (row === board.length && direction === 'down') {
        if (!board[row - 1][column]['blackSquare']) {
          return { row: board.length - 1, column }
        }

        return selectedSquare
      }
      if (column === board.length && direction === 'across') {
        if (!board[row][column - 1]['blackSquare']) {
          return { row, column: board.length - 1 }
        }

        return selectedSquare
      }
    } while (board[row][column]['blackSquare'])

    return { row, column }
  }

  /**
   * for finding the next square after text entry
   * also used as a piece of `tabAcross` function
   */
  getNextOpenSquare = (direction, { row, column }) => {
    const { board } = this.props
    const start = board[row][column]

    while (
      board[row][column]['blackSquare'] ||
      board[row][column]['entry'] !== '' ||
      board[row][column] === start
    ) {
      // increment row or column by 1 depending on direction, end of line
      if (direction === 'across') {
        if (column === board.length - 1) row += 1
        column = (column + 1) % board[0].length
      } else {
        if (row === board.length - 1) column += 1
        row = (row + 1) % board[0].length
      }

      // if while loop reaches last square,
      // start at beggining of board and change direction
      if (row === board.length || column === board.length) {
        direction = this.getOtherDirection(direction)
        row = 0
        column = 0
      }
    }

    return direction, { row, column }
  }

  // for tabbing past the current word
  getNextNonOpenSquare = (direction, { row, column }) => {
    const { board } = this.props

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
    } while (!board[row][column]['blackSquare'])
    return { row, column }
  }

  // for finding an empty square or black square, used in `tabDown` function
  getNextOpenSquareOrBlack = (direction, square) => {
    const { board } = this.props
    let { row, column } = square

    do {
      row += 1

      // return out of bounds row to be handled by calling function
      if (row >= board.length) return { row, column }

      // return empty square found on the board space
      if (row < board.length && board[row][column]['entry'] === '') {
        return { row, column }
      }
    } while (!board[row][column]['blackSquare'])
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
      while (column - 1 >= 0 && !board[row][column - 1]['blackSquare']) {
        column -= 1
      }
      return column
    }

    if (direction === 'down') {
      while (row >= 1 && !board[row - 1][column]['blackSquare']) {
        row -= 1
      }
      return row
    }
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
        board[nextSquare.row][nextSquare.column]['entry'] === '' &&
        !board[nextSquare.row][nextSquare.column]['blackSquare']
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
        if (board[0][0]['entry'] === '' && !board[0][0]['blackSquare']) {
          return { row: 0, column: 0 }
        }
        possibleSquare = this.getNextOpenSquareOrBlack('across', {
          row: 0,
          column: 0
        })
        if (!board[possibleSquare.row][possibleSquare.column]['blackSquare']) {
          return possibleSquare
        }
        return this.tabAcross('across', { row: 0, column: 0 })
      }

      // if row is 0 and entry capabale, check down for empty cell
      if (row === 0 && !board[row][column]['blackSquare']) {
        // return square if it is empty
        if (board[row][column]['entry'] === '') {
          return { row, column }
        }

        // get next empty or black square
        possibleSquare = this.getNextOpenSquareOrBlack(direction, {
          row,
          column
        })
        if (!board[possibleSquare.row][possibleSquare.column]['blackSquare']) {
          return possibleSquare
        }
      }

      // if square is directly below a black square,
      // and square is entry capable and not empty,
      // check down for empty cell
      if (
        row - 1 >= 0 &&
        board[row - 1][column]['blackSquare'] &&
        !board[row][column]['blackSquare']
      ) {
        // return square if it is empty
        if (board[row][column]['entry'] === '') return { row, column }
        possibleSquare = this.getNextOpenSquareOrBlack(direction, {
          row,
          column
        })

        // return square if the row value is valid and square is not black
        if (
          possibleSquare.row < board.length &&
          !board[possibleSquare.row][possibleSquare.column]['blackSquare']
        ) {
          return possibleSquare
        }
      }
    } while (row < board.length)

    return { row: 0, column: 0 }
  }

  getOtherDirection = direction => {
    return direction === 'across' ? 'down' : 'across'
  }

  getSequentialPosition = square => {
    const { board } = this.props
    return square.row * (board.length - 1) + square.column
  }

  render = () => (
    <div className="Board" onKeyDown={this.handleKeyDown}>
      {this.props.board.map((row, rowIdx) => (
        <div className="Row" key={rowIdx}>
          {row.map((square, columnIdx) => (
            <Square
              key={columnIdx}
              row={rowIdx}
              column={columnIdx}
              square={square}
              handleSquareClick={this.handleSquareClick}
              inputRef={this.inputRef}
            />
          ))}
        </div>
      ))}
      <div>
        <button onClick={this.handleCheckClick}>Check</button>
        <button onClick={this.handleCheckBoardClick}>Check Board</button>
      </div>
      <div>
        <button onClick={this.handleRevealClick}>Reveal</button>
        <button onClick={this.handleRevealBoardClick}>Reveal Board</button>
      </div>
      <div>x More to go</div>
    </div>
  )
}

const mapState = ({ board, direction, selectedSquare, selectedLine }) => ({
  board,
  direction,
  selectedSquare,
  selectedLine
})

const mapDispatch = {
  setBorders,
  updateEntry,
  checkSquare,
  checkBoard,
  revealSquare,
  revealBoard,
  selectSquare,
  selectLine,
  selectClue,
  selectAltClue,
  updateSelected,
  changeDirection,
  setAcross,
  setDown
}

export default connect(
  mapState,
  mapDispatch
)(Board)
