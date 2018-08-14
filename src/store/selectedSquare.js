// Action Type
const SELECT_SQUARE = "SELECT_SQUARE"

export const selectSquare = square => ({ type: SELECT_SQUARE, square })

// Reducer
const reducer = (state = { row: 0, column: 0 }, action) => {
  switch (action.type) {
    case SELECT_SQUARE:
      return action.square
    default:
      return state
  }
}

export default reducer
