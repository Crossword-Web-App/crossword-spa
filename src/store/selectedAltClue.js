// Action Type
const SELECT_ALT_CLUE = 'SELECT_ALT_CLUE'

export const selectAltClue = clueId => ({ type: SELECT_ALT_CLUE, clueId })

// Reducer
const reducer = (state = 1, action) => {
  switch (action.type) {
    case SELECT_ALT_CLUE:
      return action.clueId
    default:
      return state
  }
}

export default reducer
