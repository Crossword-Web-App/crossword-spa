// Action Type
const SET_MAX_SQUARES = 'SET_MAX_SQUARES'
const ADD_SQUARE = 'ADD_SQUARE'
const REMOVE_SQUARE = 'REMOVE_SQUARE'

export const setMaxSquares = count => ({ type: SET_MAX_SQUARES, count })
export const addSquare = () => ({ type: ADD_SQUARE })
export const removeSquare = () => ({ type: REMOVE_SQUARE })

// Reducer
const reducer = (state = 1, action) => {
  switch (action.type) {
    case SET_MAX_SQUARES:
      return action.count
    case ADD_SQUARE:
      return state + 1
    case REMOVE_SQUARE:
      return state - 1
    default:
      return state
  }
}

export default reducer
