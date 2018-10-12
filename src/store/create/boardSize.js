// Action Type
const SET_BOARD_SIZE = 'SET_BOARD_SIZE'

// Action Creators
export const setBoardSize = (size) => ({ type: SET_BOARD_SIZE, size })

// Reducer
const reducer = (state = 0, action) => {
  switch (action.type) {
    case SET_BOARD_SIZE:
      return action.size
    default:
      return state
  }
}

export default reducer