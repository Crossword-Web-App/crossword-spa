// Action Type
const SELECT_LINE = 'SELECT_LINE'

export const selectLine = line => ({ type: SELECT_LINE, line })

// Reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case SELECT_LINE:
      return action.line
    default:
      return state
  }
}

export default reducer
