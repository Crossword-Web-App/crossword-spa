// Action Type
const GET_BOARD = 'GET_BOARD'
const ADD_ENTRY = 'ADD_ENTRY'
const REVEAL_SQUARE = 'REVEAL_SQUARE'

// Action Creators
const getBoard = board => ({ type: GET_BOARD, board })
export const addEntry = square => ({ type: ADD_ENTRY, square })
export const revealSquare = square => ({ type: REVEAL_SQUARE, square })

// Thunks
export const loadBoard = boardId => dispatch => {
  try {
    const board = tempBoard
    dispatch(getBoard(board))
  } catch (error) {
    console.error(error)
  }
}

const updateNestedArrayEntry = (square, state) => {
  state = [...state.map(row => [...row])]
  state[square.row][square.column]['entry'] = square.entry
  return state
}

const updateNestedArrayIsRevealed = (square, state) => {
  state = [...state.map(row => [...row])]
  state[square.row][square.column]['isRevealed'] = true
  return state
}

// Reducer
const reducer = (state = tempBoard, action) => {
  switch (action.type) {
    case GET_BOARD:
      return action.board
    case ADD_ENTRY:
      return updateNestedArrayEntry(action.square, state)
    case REVEAL_SQUARE:
      return updateNestedArrayIsRevealed(action.square, state)
    default:
      return state
  }
}

export default reducer

const tempBoard = [
  [
    {
      letter: 'e',
      entry: '',
      number: 1,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'r',
      entry: '',
      number: 2,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'b',
      entry: '',
      number: 3,
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'h',
      entry: '',
      number: 4,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'd',
      entry: '',
      number: 5,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'v',
      entry: '',
      number: 6,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'z',
      entry: '',
      number: 7,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'q',
      entry: '',
      number: 8,
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'i',
      entry: '',
      number: 9,
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'u',
      entry: '',
      number: 10,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'p',
      entry: '',
      number: 11,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'j',
      entry: '',
      number: 12,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'x',
      entry: '',
      number: 13,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'i',
      entry: '',
      number: 14,
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'f',
      entry: '',
      number: 15,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 's',
      entry: '',
      number: 3,
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'm',
      entry: '',
      number: 4,
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'u',
      entry: '',
      number: 5,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 't',
      entry: '',
      number: 6,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'c',
      entry: '',
      number: 7,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'o',
      entry: '',
      number: 8,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'h',
      entry: '',
      number: 9,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'e',
      entry: '',
      number: 10,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'l',
      entry: '',
      number: 11,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'h',
      entry: '',
      number: 12,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'a',
      entry: '',
      number: 13,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'a',
      entry: '',
      number: 14,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'z',
      entry: '',
      number: 15,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'b',
      entry: '',
      number: 16,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'c',
      entry: '',
      number: 17,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'b',
      entry: '',
      number: 7,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'u',
      entry: '',
      number: 8,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'j',
      entry: '',
      number: 9,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'p',
      entry: '',
      number: 10,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'a',
      entry: '',
      number: 11,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'f',
      entry: '',
      number: 12,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 's',
      entry: '',
      number: 13,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'h',
      entry: '',
      number: 14,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'a',
      entry: '',
      number: 15,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'k',
      entry: '',
      number: 16,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'z',
      entry: '',
      number: 17,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'f',
      entry: '',
      number: 18,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'b',
      entry: '',
      number: 19,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'j',
      entry: '',
      number: 20,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'b',
      entry: '',
      number: 21,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'q',
      entry: '',
      number: 13,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'b',
      entry: '',
      number: 14,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'n',
      entry: '',
      number: 15,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'v',
      entry: '',
      number: 16,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'l',
      entry: '',
      number: 17,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'h',
      entry: '',
      number: 18,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'a',
      entry: '',
      number: 19,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'o',
      entry: '',
      number: 20,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'w',
      entry: '',
      number: 21,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'b',
      entry: '',
      number: 22,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'q',
      entry: '',
      number: 23,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'q',
      entry: '',
      number: 24,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'r',
      entry: '',
      number: 25,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'e',
      entry: '',
      number: 26,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'p',
      entry: '',
      number: 27,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'q',
      entry: '',
      number: 21,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'z',
      entry: '',
      number: 22,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'g',
      entry: '',
      number: 23,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'k',
      entry: '',
      number: 24,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'd',
      entry: '',
      number: 25,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'z',
      entry: '',
      number: 26,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'p',
      entry: '',
      number: 27,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'e',
      entry: '',
      number: 28,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'b',
      entry: '',
      number: 29,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'v',
      entry: '',
      number: 30,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'f',
      entry: '',
      number: 31,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'q',
      entry: '',
      number: 32,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'g',
      entry: '',
      number: 33,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'w',
      entry: '',
      number: 34,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'c',
      entry: '',
      number: 35,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'p',
      entry: '',
      number: 31,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'k',
      entry: '',
      number: 32,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'j',
      entry: '',
      number: 33,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'k',
      entry: '',
      number: 34,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'b',
      entry: '',
      number: 35,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'u',
      entry: '',
      number: 36,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'w',
      entry: '',
      number: 37,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'q',
      entry: '',
      number: 38,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'i',
      entry: '',
      number: 39,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'j',
      entry: '',
      number: 40,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'o',
      entry: '',
      number: 41,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'y',
      entry: '',
      number: 42,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'o',
      entry: '',
      number: 43,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'n',
      entry: '',
      number: 44,
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'y',
      entry: '',
      number: 45,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'm',
      entry: '',
      number: 43,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'a',
      entry: '',
      number: 44,
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'y',
      entry: '',
      number: 45,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'k',
      entry: '',
      number: 46,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'l',
      entry: '',
      number: 47,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'x',
      entry: '',
      number: 48,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'u',
      entry: '',
      number: 49,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'o',
      entry: '',
      number: 50,
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'o',
      entry: '',
      number: 51,
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'u',
      entry: '',
      number: 52,
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'y',
      entry: '',
      number: 53,
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'x',
      entry: '',
      number: 54,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'h',
      entry: '',
      number: 55,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'u',
      entry: '',
      number: 56,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'w',
      entry: '',
      number: 57,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'y',
      entry: '',
      number: 57,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'a',
      entry: '',
      number: 58,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'z',
      entry: '',
      number: 59,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'm',
      entry: '',
      number: 60,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'h',
      entry: '',
      number: 61,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'v',
      entry: '',
      number: 62,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'i',
      entry: '',
      number: 63,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'f',
      entry: '',
      number: 64,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'q',
      entry: '',
      number: 65,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'a',
      entry: '',
      number: 66,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'e',
      entry: '',
      number: 67,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'p',
      entry: '',
      number: 68,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'x',
      entry: '',
      number: 69,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'x',
      entry: '',
      number: 70,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'n',
      entry: '',
      number: 71,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'x',
      entry: '',
      number: 73,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'l',
      entry: '',
      number: 74,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'u',
      entry: '',
      number: 75,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'l',
      entry: '',
      number: 76,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'n',
      entry: '',
      number: 77,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'y',
      entry: '',
      number: 78,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'e',
      entry: '',
      number: 79,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'i',
      entry: '',
      number: 80,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'n',
      entry: '',
      number: 81,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'e',
      entry: '',
      number: 82,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'm',
      entry: '',
      number: 83,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'n',
      entry: '',
      number: 84,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'b',
      entry: '',
      number: 85,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'l',
      entry: '',
      number: 86,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'n',
      entry: '',
      number: 87,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'z',
      entry: '',
      number: 91,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'a',
      entry: '',
      number: 92,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'r',
      entry: '',
      number: 93,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'l',
      entry: '',
      number: 94,
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'j',
      entry: '',
      number: 95,
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'j',
      entry: '',
      number: 96,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'x',
      entry: '',
      number: 97,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'k',
      entry: '',
      number: 98,
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'f',
      entry: '',
      number: 99,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'c',
      entry: '',
      number: 100,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'i',
      entry: '',
      number: 101,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'z',
      entry: '',
      number: 102,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'b',
      entry: '',
      number: 103,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'b',
      entry: '',
      number: 104,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'i',
      entry: '',
      number: 105,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'f',
      entry: '',
      number: 111,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'y',
      entry: '',
      number: 112,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'b',
      entry: '',
      number: 113,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'z',
      entry: '',
      number: 114,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'j',
      entry: '',
      number: 115,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'v',
      entry: '',
      number: 116,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'b',
      entry: '',
      number: 117,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'r',
      entry: '',
      number: 118,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'm',
      entry: '',
      number: 119,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'p',
      entry: '',
      number: 120,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'w',
      entry: '',
      number: 121,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'f',
      entry: '',
      number: 122,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'b',
      entry: '',
      number: 123,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'v',
      entry: '',
      number: 124,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'c',
      entry: '',
      number: 125,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'v',
      entry: '',
      number: 133,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'f',
      entry: '',
      number: 134,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'g',
      entry: '',
      number: 135,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'l',
      entry: '',
      number: 136,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'g',
      entry: '',
      number: 137,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'b',
      entry: '',
      number: 138,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'd',
      entry: '',
      number: 139,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'v',
      entry: '',
      number: 140,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'e',
      entry: '',
      number: 141,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 't',
      entry: '',
      number: 142,
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'q',
      entry: '',
      number: 143,
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'c',
      entry: '',
      number: 144,
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'b',
      entry: '',
      number: 145,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'v',
      entry: '',
      number: 146,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'q',
      entry: '',
      number: 147,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'n',
      entry: '',
      number: 157,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'y',
      entry: '',
      number: 158,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'o',
      entry: '',
      number: 159,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'a',
      entry: '',
      number: 160,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'x',
      entry: '',
      number: 161,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'z',
      entry: '',
      number: 162,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'l',
      entry: '',
      number: 163,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'd',
      entry: '',
      number: 164,
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'f',
      entry: '',
      number: 165,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'x',
      entry: '',
      number: 166,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'u',
      entry: '',
      number: 167,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'g',
      entry: '',
      number: 168,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'q',
      entry: '',
      number: 169,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'x',
      entry: '',
      number: 170,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'n',
      entry: '',
      number: 171,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'g',
      entry: '',
      number: 183,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'l',
      entry: '',
      number: 184,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'i',
      entry: '',
      number: 185,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 't',
      entry: '',
      number: 186,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'w',
      entry: '',
      number: 187,
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'c',
      entry: '',
      number: 188,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'r',
      entry: '',
      number: 189,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'l',
      entry: '',
      number: 190,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'b',
      entry: '',
      number: 191,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'z',
      entry: '',
      number: 192,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'j',
      entry: '',
      number: 193,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'i',
      entry: '',
      number: 194,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'f',
      entry: '',
      number: 195,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'u',
      entry: '',
      number: 196,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'c',
      entry: '',
      number: 197,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ],
  [
    {
      letter: 'b',
      entry: '',
      number: 211,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 's',
      entry: '',
      number: 212,
      blackSquare: true,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'i',
      entry: '',
      number: 213,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'r',
      entry: '',
      number: 214,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'y',
      entry: '',
      number: 215,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'i',
      entry: '',
      number: 216,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'i',
      entry: '',
      number: 217,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 's',
      entry: '',
      number: 218,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'b',
      entry: '',
      number: 219,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'v',
      entry: '',
      number: 220,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'y',
      entry: '',
      number: 221,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'u',
      entry: '',
      number: 222,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'w',
      entry: '',
      number: 223,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'a',
      entry: '',
      number: 224,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    },
    {
      letter: 'i',
      entry: '',
      number: 225,
      blackSquare: false,
      isChecked: false,
      displayWrong: false,
      isRevealed: false
    }
  ]
]
