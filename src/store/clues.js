// Action Type
const GET_CLUES = 'GET_CLUES'
const REMOVE_CLUES = 'REMOVE_CLUES'

// Action Creators
export const getClues = clues => ({ type: GET_CLUES, clues })
export const removeClues = () => ({ type: REMOVE_CLUES })

// Reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CLUES:
      return action.clues
    case REMOVE_CLUES:
      return {}
    default:
      return state
  }
}

export default reducer
