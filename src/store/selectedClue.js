// Action Type
const SELECT_CLUE = 'SELECT_CLUE'

export const selectClue = clueId => ({ type: SELECT_CLUE, clueId })

// Reducer
const reducer = (state = 1, action) => {
  switch (action.type) {
    case SELECT_CLUE:
      return action.clueId
    default:
      return state
  }
}

export default reducer
