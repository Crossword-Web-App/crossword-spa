import axios from 'axios'

axios.defaults.withCredentials = true

const API_URL = process.env.API_URL || 'http://localhost:8080'

// Action Type
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

// Action Creators
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })

// Thunks
export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get(`${API_URL}/auth/me`)
    const user = await res.data
    dispatch(getUser(user || {}))
  } catch (err) {
    console.error(err)
  }
}

export const logoutUser = () => async dispatch => {
  try {
    await axios.get(`${API_URL}/auth/logout`)
    dispatch(removeUser())
  } catch (err) {
    console.error(err)
  }
}

// Reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return {}
    default:
      return state
  }
}

export default reducer
