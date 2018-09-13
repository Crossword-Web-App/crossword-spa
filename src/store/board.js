// Action Type
const GET_BOARD = 'GET_BOARD'
const SET_BORDERS = 'SET_BORDERS'
const UPDATE_ENTRY = 'UPDATE_ENTRY'
const UPDATE_SELECTED = 'UPDATE_SELECTED'
const CHECK_SQUARE = 'CHECK_SQUARE'
const CHECK_BOARD = 'CHECK_BOARD'
const REVEAL_SQUARE = 'REVEAL_SQUARE'
const REVEAL_BOARD = 'REVEAL_BOARD'

// Action Creators
export const getBoard = board => ({ type: GET_BOARD, board })
export const setBorders = board => ({ type: SET_BORDERS, board })
export const updateEntry = square => ({ type: UPDATE_ENTRY, square })
export const updateSelected = squares => ({ type: UPDATE_SELECTED, squares })
export const checkSquare = square => ({ type: CHECK_SQUARE, square })
export const checkBoard = () => ({ type: CHECK_BOARD })
export const revealSquare = square => ({ type: REVEAL_SQUARE, square })
export const revealBoard = () => ({ type: REVEAL_BOARD })

// Thunks

const updateLetterEntry = (square, state) => {
  state = [...state.map(row => [...row])]
  state[square.row][square.column].entry = square.entry
  state[square.row][square.column].displayWrong = false

  if (
    state[square.row][square.column].inputClassName.includes(
      'Square-Checked-Incorrect'
    )
  ) {
    state[square.row][square.column].inputClassName = state[square.row][
      square.column
    ].inputClassName.replace('Square-Checked-Incorrect', '')
  }

  return state
}

const updateSelectedSquares = (
  { selectedSquare, nextSquare, selectedLine, nextLine },
  state
) => {
  state = [...state.map(row => [...row])]

  // remove 'Square-Selected' from className of previous square
  if (Object.keys(selectedSquare).length > 0) {
    state[selectedSquare.row][selectedSquare.column].className = state[
      selectedSquare.row
    ][selectedSquare.column].className.replace(' Square-Selected', '')
  }

  // add 'Square-Selected' to className for newly selected square
  state[nextSquare.row][nextSquare.column].className += ' Square-Selected'

  // remove 'Square-SemiSelected' from className of previous line
  selectedLine.forEach(({ row, column }) => {
    state[row][column].className = state[row][column].className.replace(
      ' Square-SemiSelected',
      ''
    )
  })
  // add 'Square-SemiSelected' to className of newly selected line
  nextLine.forEach(({ row, column }) => {
    state[row][column].className += ' Square-SemiSelected'
  })

  return state
}

const setBordersOnSquares = state => {
  const lastCell = state[0].length - 1
  state = state.map((row, rowIdx) => {
    row.map((square, columnIdx) => {
      // set entry to '' to start
      square.entry = ''

      // set relevant class names
      square.className = 'Square'
      square.numberClassName = 'Square-Number'
      square.inputClassName = 'Square-Entry'
      square.noEditInputClassName = 'Square-Revealed-Text Square-No-Select'
      square.checkedDotClassName = 'Square-CheckedDot'

      // set default answer booleans to false
      square.isChecked = false
      square.displayWrong = false
      square.isRevealed = false

      // set black squares
      if (square.letter === '.') {
        square.blackSquare = true
        square.className += ' Square-Black'
      } else {
        square.blackSquare = false
      }

      // set borders
      if (rowIdx === 0) square.className += ' Square-Top'
      if (rowIdx === row.length - 1) square.className += ' Square-Bottom'
      if (columnIdx === 0) square.className += ' Square-Left'
      if (columnIdx === row.length - 1) square.className += ' Square-Right'
      return square
    })
    return row
  })

  // handle corners
  state[0][0].className += ' Square-Top-Left'
  state[0][lastCell].className += ' Square-Top-Right'
  state[lastCell][0].className += ' Square-Bottom-Left'
  state[lastCell][lastCell].className += ' Square-Bottom-Right'

  return state
}

const updateLetterIsChecked = (square, state) => {
  state = [...state.map(row => [...row])]
  square = state[square.row][square.column]
  square.isChecked = true
  if (square.entry === square.letter.toUpperCase()) {
    square.isRevealed = true
    square.noEditInputClassName += ' Square-Correct'
  } else {
    square.inputClassName += ' Square-Checked-Incorrect'
  }
  return state
}

const updateBoardIsChecked = state => {
  state = [...state.map(row => [...row])]
  state.forEach(row =>
    row.forEach(square => {
      if (!square.blackSquare) square.isChecked = true
      if (square.entry === square.letter.toUpperCase()) {
        square.isRevealed = true
        square.noEditInputClassName += ' Square-Revealed-Text'
      } else {
        square.displayWrong = true
      }
    })
  )
  return state
}

const updateLetterIsRevealed = (square, state) => {
  state = [...state.map(row => [...row])]
  state[square.row][square.column].isRevealed = true
  state[square.row][square.column].className += ' Square-Revealed'
  return state
}

const updateBoardIsRevealed = state => {
  state = [...state.map(row => [...row])]
  state.forEach(row =>
    row.forEach(square => {
      if (!square.blackSquare) {
        square.isRevealed = true
        square.className += ' Square-Revealed'
      }
    })
  )
  return state
}

// Reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_BOARD:
      return action.board
    case SET_BORDERS:
      return setBordersOnSquares(state)
    case UPDATE_ENTRY:
      return updateLetterEntry(action.square, state)
    case UPDATE_SELECTED:
      return updateSelectedSquares(action.squares, state)
    case CHECK_SQUARE:
      return updateLetterIsChecked(action.square, state)
    case CHECK_BOARD:
      return updateBoardIsChecked(state)
    case REVEAL_SQUARE:
      return updateLetterIsRevealed(action.square, state)
    case REVEAL_BOARD:
      return updateBoardIsRevealed(state)
    default:
      return state
  }
}

export default reducer
