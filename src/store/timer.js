// Action Type
const SET_START_TIME = 'SET_START_TIME'
const SET_ACCUMULATED_TIME = 'SET_ACCUMULATED_TIME'

// Action Creators
export const setStartTime = (startTime) => ({ type: SET_START_TIME, startTime })
export const setAccumulatedTime = (currentTime) => ({ type: SET_ACCUMULATED_TIME, currentTime })

// Reducer
const reducer = (state = {startTime: 0, accumulatedTime: 0}, action) => {
  switch (action.type) {
    case SET_START_TIME:
      return {...state, startTime: action.startTime}
    case SET_ACCUMULATED_TIME:
      return {startTime: 0, accumulatedTime: Math.floor((action.currentTime - state.startTime)/1000) + state.accumulatedTime}
    default:
      return state
  }
}

export default reducer