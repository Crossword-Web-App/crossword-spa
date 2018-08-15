// Action Type
const GET_BOARD = 'GET_BOARD'
const ADD_ENTRY = 'ADD_ENTRY'
const CHECK_SQUARE = 'CHECK_SQUARE'
const CHECK_BOARD = 'CHECK_BOARD'
const REVEAL_SQUARE = 'REVEAL_SQUARE'
const REVEAL_BOARD = 'REVEAL_BOARD'

// Action Creators
const getBoard = board => ({ type: GET_BOARD, board })
export const addEntry = square => ({ type: ADD_ENTRY, square })
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

const updateLetterIsChecked = (square, state) => {
  state = [...state.map(row => [...row])]
  square = state[square.row][square.column]
  square.isChecked = true
  if (square.entry === square.letter.toUpperCase()) {
    square.isRevealed = true
  } else {
    square.displayWrong = true
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
  return state
}

const updateBoardIsRevealed = state => {
  state = [...state.map(row => [...row])]
  state.forEach(row => row.forEach(square => (square.isRevealed = true)))
  return state
}

// Reducer
const reducer = (state = tempBoard, action) => {
  switch (action.type) {
    case GET_BOARD:
      return action.board
    case ADD_ENTRY:
      return updateLetterEntry(action.square, state)
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
      entry: '',
      number: 1,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'W',
      entry: '',
      number: 2,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: 3,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'L',
      entry: '',
      number: 4,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'V',
      entry: '',
      number: 5,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: 6,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: 7,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'R',
      entry: '',
      number: 8,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'I',
      entry: '',
      number: 9,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'N',
      entry: '',
      number: 10,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'N',
      entry: '',
      number: 11,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: 12,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'T',
      entry: '',
      number: 13,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'V',
      entry: '',
      number: 14,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'N',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'R',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'M',
      entry: '',
      number: 15,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'A',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'D',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'O',
      entry: '',
      number: 16,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'R',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'U',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'M',
      entry: '',
      number: 17,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'A',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'D',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'S',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'C',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'R',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'A',
      entry: '',
      number: 18,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'M',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'B',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'L',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'W',
      entry: '',
      number: 19,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'A',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'X',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'A',
      entry: '',
      number: 20,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'L',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'I',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'S',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'T',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'B',
      entry: '',
      number: 21,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'B',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'T',
      entry: '',
      number: 22,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'A',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'S',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'N',
      entry: '',
      number: 23,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'O',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'S',
      entry: '',
      number: 24,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'T',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'I',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'R',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'F',
      entry: '',
      number: 25,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'R',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'I',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'D',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'W',
      entry: '',
      number: 26,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'A',
      entry: '',
      number: 27,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'G',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'R',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'S',
      entry: '',
      number: 28,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'O',
      entry: '',
      number: 29,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'U',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'T',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'D',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'O',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'E',
      entry: '',
      number: 30,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'M',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'U',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'T',
      entry: '',
      number: 31,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'R',
      entry: '',
      number: 32,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'I',
      entry: '',
      number: 33,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'B',
      entry: '',
      number: 34,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'U',
      entry: '',
      number: 35,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'T',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'B',
      entry: '',
      number: 36,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'I',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'P',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'O',
      entry: '',
      number: 37,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'L',
      entry: '',
      number: 38,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'A',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'R',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'D',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'I',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'S',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'O',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'R',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'D',
      entry: '',
      number: 39,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: 40,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'R',
      entry: '',
      number: 41,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'B',
      entry: '',
      number: 42,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'A',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'R',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'R',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'O',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'O',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'M',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'O',
      entry: '',
      number: 43,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'D',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'S',
      entry: '',
      number: 44,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'M',
      entry: '',
      number: 45,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: 46,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'A',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'R',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'A',
      entry: '',
      number: 47,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'I',
      entry: '',
      number: 48,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'R',
      entry: '',
      number: 49,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'G',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'U',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'N',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'M',
      entry: '',
      number: 50,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'I',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'X',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'M',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'A',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'S',
      entry: '',
      number: 51,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'T',
      entry: '',
      number: 52,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: 53,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'R',
      entry: '',
      number: 54,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'M',
      entry: '',
      number: 55,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'G',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'I',
      entry: '',
      number: 56,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'N',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'C',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'A',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'H',
      entry: '',
      number: 57,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'A',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'L',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'O',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'P',
      entry: '',
      number: 58,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'A',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'Y',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: 59,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'R',
      entry: '',
      number: 60,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'D',
      entry: '',
      number: 61,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'I',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'D',
      entry: '',
      number: 62,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'A',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'I',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'L',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'Y',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'J',
      entry: '',
      number: 63,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'U',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'M',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'B',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'L',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'G',
      entry: '',
      number: 64,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'O',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'P',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'O',
      entry: '',
      number: 65,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'M',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'N',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'I',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'A',
      entry: '',
      number: 66,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'T',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'A',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'S',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'E',
      entry: '',
      number: 67,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'N',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'T',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'W',
      entry: '',
      number: 68,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'T',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'S',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: '.',
      entry: '',
      number: '',
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'W',
      entry: '',
      number: 69,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'D',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'G',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'E',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'D',
      entry: '',
      number: '',
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ]
]
