// Action Type
const SET_CLICKED_CLUE_SQUARE = 'SET_CLICKED_CLUE_SQUARE'

export const selectClueSquare = square => ({ type: SET_CLICKED_CLUE_SQUARE, square })

// Reducer
const reducer = (state = {row: -1, column: -1}, action) => {
  switch (action.type) {
    case SET_CLICKED_CLUE_SQUARE:
      return action.square
    default:
      return state
  }
}

export default reducer
