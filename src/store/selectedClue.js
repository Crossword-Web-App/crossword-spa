// Action Type
const SELECT_CLUE = 'SELECT_CLUE'
const REMOVE_SELECT_CLUE = 'REMOVE_SELECT_CLUE'

export const selectClue = clueId => ({ type: SELECT_CLUE, clueId })
export const removeSelectClue = clueId => ({ type: REMOVE_SELECT_CLUE, clueId })


// Reducer
const reducer = (state = 1, action) => {
  switch (action.type) {
    case SELECT_CLUE:
      return action.clueId
    case REMOVE_SELECT_CLUE:
      return 1
    default:
      return state
  }
}

export default reducer
