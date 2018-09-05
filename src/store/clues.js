// Action Type
const GET_CLUES = 'GET_CLUES'

// Action Creators
export const getClues = clues => ({ type: GET_CLUES, clues })

// Reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CLUES:
      return action.clues
    default:
      return state
  }
}

export default reducer
