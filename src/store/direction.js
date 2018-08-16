// Action Type
const GET_DIRECTION = 'GET_DIRECTION'
const CHANGE_DIRECTION = 'CHANGE_DIRECTION'
const SET_ACROSS = 'SET_ACROSS'
const SET_DOWN = 'SET_DOWN'

// Action Creators
export const getDirection = () => ({ type: GET_DIRECTION })
export const changeDirection = () => ({ type: CHANGE_DIRECTION })
export const setAcross = () => ({ type: SET_ACROSS })
export const setDown = () => ({ type: SET_DOWN })

// Reducer
const reducer = (state = 'across', action) => {
  switch (action.type) {
    case GET_DIRECTION:
      return state
    case CHANGE_DIRECTION:
      return state === 'across' ? 'down' : 'across'
    case SET_ACROSS:
      return 'across'
    case SET_DOWN:
      return 'down'
    default:
      return state
  }
}

export default reducer
