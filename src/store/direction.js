// Action Type
const CHANGE_DIRECTION = 'CHANGE_DIRECTION'

// Action Creators
export const changeDirection = () => ({ type: CHANGE_DIRECTION })

// Reducer
const reducer = (state = 'across', action) => {
  switch (action.type) {
    case CHANGE_DIRECTION:
      return state === 'across' ? 'down' : 'across'
    default:
      return state
  }
}

export default reducer