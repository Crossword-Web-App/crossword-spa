// Action Type
const SELECT_CLUE = 'SELECT_CLUE'
const REMOVE_SELECTED_CLUE = 'REMOVE_SELECTED_CLUE'

export const selectClue = clueId => ({ type: SELECT_CLUE, clueId })
export const removeSelectedClue = clueId => ({ type: REMOVE_SELECTED_CLUE, clueId })


// Reducer
const reducer = (state = 1, action) => {
  switch (action.type) {
    case SELECT_CLUE:
      return action.clueId
    case REMOVE_SELECTED_CLUE:
      return 1
    default:
      return state
  }
}

export default reducer
