// Action Type
const SET_SYMMETRY = 'SET_SYMMETRY'

// Action Creators
export const setSymmetry = (symmetry) => ({ type: SET_SYMMETRY, symmetry })

// Reducer
const reducer = (state = 'freestyle', action) => {
  switch (action.type) {
    case SET_SYMMETRY:
      return action.symmetry
    default:
      return state
  }
}

export default reducer