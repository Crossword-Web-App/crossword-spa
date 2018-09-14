// Action Type
const SET_BOARD_ID= 'SET_BOARD_ID'

// Action Creators
export const setBoardId = boardId => ({ type: SET_BOARD_ID, boardId })

// Reducer
const reducer = (state = 0, action) => {
  switch (action.type) {
    case SET_BOARD_ID:
      return action.boardId
    default:
      return state
  }
}

export default reducer
