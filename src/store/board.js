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
const getBoard = board => ({ type: GET_BOARD, board })
export const setBorders = board => ({ type: SET_BORDERS, board })
export const updateEntry = square => ({ type: UPDATE_ENTRY, square })
export const updateSelected = squares => ({ type: UPDATE_SELECTED, squares })
export const checkSquare = square => ({ type: CHECK_SQUARE, square })
export const checkBoard = () => ({ type: CHECK_BOARD })
export const revealSquare = square => ({ type: REVEAL_SQUARE, square })
export const revealBoard = () => ({ type: REVEAL_BOARD })

// Thunks
export const loadBoard = boardId => dispatch => {
  try {
    const board = tempBoard
    dispatch(getBoard(board))
  } catch (error) {
    console.error(error)
  }
}

const updateLetterEntry = (square, state) => {
  state = [...state.map(row => [...row])]
  state[square.row][square.column]['entry'] = square.entry
  state[square.row][square.column]['displayWrong'] = false
  return state
}

const updateSelectedSquares = (
  { selectedSquare, nextSquare, selectedLine, nextLine },
  state
) => {
  state = [...state.map(row => [...row])]

  // remove 'Square-Selected' from className of previous square
  if (Object.keys(selectedSquare).length > 0) {
    state[selectedSquare.row][selectedSquare.column]['className'] = state[
      selectedSquare.row
    ][selectedSquare.column]['className'].replace(' Square-Selected', '')
  }

  // add 'Square-Selected' to className for newly selected square
  state[nextSquare.row][nextSquare.column]['className'] += ' Square-Selected'

  // remove 'Square-SemiSelected' from className of previous line
  selectedLine.forEach(({ row, column }) => {
    state[row][column]['className'] = state[row][column]['className'].replace(
      ' Square-SemiSelected',
      ''
    )
  })
  // add 'Square-SemiSelected' to className of newly selected line
  nextLine.forEach(({ row, column }) => {
    state[row][column]['className'] += ' Square-SemiSelected'
  })

  return state
}

const setBordersOnSquares = state => {
  state = state.map((row, rowIdx) => {
    row.map((square, columnIdx) => {
      if (rowIdx === 0) square.className += ' Square-Top'
      if (rowIdx === row.length - 1) square.className += ' Square-Bottom'
      if (columnIdx === 0) square.className += ' Square-Left'
      if (columnIdx === row.length - 1) square.className += ' Square-Right'
      return square
    })
    return row
  })
  return state
}

const updateLetterIsChecked = (square, state) => {
  state = [...state.map(row => [...row])]
  square = state[square.row][square.column]
  // square.isChecked = true
  square.className += ' Square-Checked'
  if (square.entry === square.letter.toUpperCase()) {
    square.isRevealed = true
    square.noEditInputClassName += ' Square-Correct'
  } else {
    // square.displayWrong = true
    square.inputClassName += ' Square-Checked-Incorrect'
  }
  return state
}

const updateBoardIsChecked = state => {
  state = [...state.map(row => [...row])]
  state.forEach(row =>
    row.forEach(square => {
      if (!square.blackSquare) {
        // square.isChecked = true
        square.className += ' Square-Checked'
      }
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
  state[square.row][square.column]['isRevealed'] = true
  state[square.row][square.column]['className'] += ' Square-Revealed'
  return state
}

const updateBoardIsRevealed = state => {
  state = [...state.map(row => [...row])]
  state.forEach(row =>
    row.forEach(square => {
      square.isRevealed = true
      square.className += ' Square-Revealed'
    })
  )
  return state
}

// Reducer
const reducer = (state = tempBoard, action) => {
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

const tempBoard = [
  [
    {
      letter: 'T',
      entry: 'T',
      number: 1,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'W',
      entry: 'W',
      number: 2,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: '',
      number: 3,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'L',
      entry: 'L',
      number: 4,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'V',
      entry: 'V',
      number: 5,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: 6,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: 7,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'R',
      entry: 'R',
      number: 8,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'I',
      entry: 'I',
      number: 9,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'N',
      entry: 'N',
      number: 10,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'N',
      entry: 'N',
      number: 11,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: 12,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'T',
      entry: 'T',
      number: 13,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    }
  ],
  [
    {
      letter: 'V',
      entry: 'V',
      number: 14,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'N',
      entry: 'N',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'R',
      entry: 'R',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'M',
      entry: 'M',
      number: 15,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'A',
      entry: 'A',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'D',
      entry: 'D',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'O',
      entry: 'O',
      number: 16,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'R',
      entry: 'R',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'U',
      entry: 'U',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    }
  ],
  [
    {
      letter: 'M',
      entry: 'M',
      number: 17,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'A',
      entry: 'A',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'D',
      entry: 'D',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'S',
      entry: 'S',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'C',
      entry: 'C',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'R',
      entry: 'R',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'A',
      entry: 'A',
      number: 18,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'M',
      entry: 'M',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'B',
      entry: 'B',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'L',
      entry: 'L',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'W',
      entry: 'W',
      number: 19,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'A',
      entry: 'A',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'X',
      entry: 'X',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    }
  ],
  [
    {
      letter: 'A',
      entry: 'A',
      number: 20,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'L',
      entry: 'L',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'I',
      entry: 'I',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'S',
      entry: 'S',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'T',
      entry: 'T',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'B',
      entry: 'B',
      number: 21,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'B',
      entry: 'B',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'T',
      entry: 'T',
      number: 22,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'A',
      entry: 'A',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'S',
      entry: 'S',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    }
  ],
  [
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'N',
      entry: 'N',
      number: 23,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'O',
      entry: 'O',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'S',
      entry: '',
      number: 24,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'T',
      entry: 'T',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'I',
      entry: 'I',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'R',
      entry: 'R',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'F',
      entry: 'F',
      number: 25,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'R',
      entry: 'R',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'I',
      entry: 'I',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'D',
      entry: 'D',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    }
  ],
  [
    {
      letter: 'W',
      entry: 'W',
      number: 26,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'A',
      entry: 'A',
      number: 27,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'G',
      entry: 'G',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'R',
      entry: 'R',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'S',
      entry: 'S',
      number: 28,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'O',
      entry: 'O',
      number: 29,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'U',
      entry: 'U',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'T',
      entry: 'T',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'D',
      entry: 'D',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'O',
      entry: 'O',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    }
  ],
  [
    {
      letter: 'E',
      entry: 'E',
      number: 30,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'M',
      entry: 'M',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'U',
      entry: 'U',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'T',
      entry: 'T',
      number: 31,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'R',
      entry: 'R',
      number: 32,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'I',
      entry: 'I',
      number: 33,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'B',
      entry: 'B',
      number: 34,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'U',
      entry: 'U',
      number: 35,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'T',
      entry: 'T',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    }
  ],
  [
    {
      letter: 'B',
      entry: 'B',
      number: 36,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'I',
      entry: 'I',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'P',
      entry: 'P',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'O',
      entry: 'O',
      number: 37,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'L',
      entry: 'L',
      number: 38,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'A',
      entry: 'A',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'R',
      entry: 'R',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'D',
      entry: 'D',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'I',
      entry: 'I',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'S',
      entry: 'S',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'O',
      entry: 'O',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'R',
      entry: 'R',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'D',
      entry: 'D',
      number: 39,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: 40,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'R',
      entry: 'R',
      number: 41,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    }
  ],
  [
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'B',
      entry: 'B',
      number: 42,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'A',
      entry: 'A',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'R',
      entry: 'R',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'R',
      entry: 'R',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'O',
      entry: 'O',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'O',
      entry: 'O',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'M',
      entry: 'M',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'O',
      entry: 'O',
      number: 43,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'D',
      entry: 'D',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    }
  ],
  [
    {
      letter: 'S',
      entry: 'S',
      number: 44,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'M',
      entry: 'M',
      number: 45,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: 46,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'A',
      entry: 'A',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'R',
      entry: 'R',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'A',
      entry: 'A',
      number: 47,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'I',
      entry: 'I',
      number: 48,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'R',
      entry: 'R',
      number: 49,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'G',
      entry: 'G',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'U',
      entry: 'U',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'N',
      entry: 'N',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    }
  ],
  [
    {
      letter: 'M',
      entry: 'M',
      number: 50,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'I',
      entry: 'I',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'X',
      entry: 'X',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'M',
      entry: 'M',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'A',
      entry: 'A',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'S',
      entry: 'S',
      number: 51,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'T',
      entry: 'T',
      number: 52,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: 53,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'R',
      entry: 'R',
      number: 54,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'M',
      entry: 'M',
      number: 55,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'G',
      entry: 'G',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    }
  ],
  [
    {
      letter: 'I',
      entry: 'I',
      number: 56,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'N',
      entry: 'N',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'C',
      entry: 'C',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'A',
      entry: 'A',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'H',
      entry: 'H',
      number: 57,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'A',
      entry: 'A',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'L',
      entry: 'L',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'O',
      entry: 'O',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'P',
      entry: 'P',
      number: 58,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'A',
      entry: 'A',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'Y',
      entry: 'Y',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: 59,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'R',
      entry: 'R',
      number: 60,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    }
  ],
  [
    {
      letter: 'D',
      entry: 'D',
      number: 61,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'I',
      entry: 'I',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'D',
      entry: 'D',
      number: 62,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'A',
      entry: 'A',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'I',
      entry: 'I',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'L',
      entry: 'L',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'Y',
      entry: 'Y',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'J',
      entry: 'J',
      number: 63,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'U',
      entry: 'U',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'M',
      entry: 'M',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'B',
      entry: 'B',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'L',
      entry: 'L',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    }
  ],
  [
    {
      letter: 'G',
      entry: 'G',
      number: 64,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'O',
      entry: 'O',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'P',
      entry: 'P',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'O',
      entry: 'O',
      number: 65,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'M',
      entry: 'M',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'N',
      entry: 'N',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'I',
      entry: 'I',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'A',
      entry: 'A',
      number: 66,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'T',
      entry: 'T',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'A',
      entry: 'A',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'S',
      entry: 'S',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    }
  ],
  [
    {
      letter: 'E',
      entry: 'E',
      number: 67,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'N',
      entry: 'N',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'T',
      entry: 'T',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'W',
      entry: 'W',
      number: 68,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'T',
      entry: 'T',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'S',
      entry: 'S',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: '.',
      entry: '.',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square Square-Black',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'W',
      entry: 'W',
      number: 69,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'D',
      entry: 'D',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'G',
      entry: 'G',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'E',
      entry: 'E',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    },
    {
      letter: 'D',
      entry: 'D',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false,
      className: 'Square',
      numberClassName: 'Square-Number',
      inputClassName: 'Square-Entry',
      noEditInputClassName: 'Square-Revealed-Text Square-No-Select'
    }
  ]
]
