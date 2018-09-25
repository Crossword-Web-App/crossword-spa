import axios from 'axios'
import { getTimeSpent } from './timeUtils'

axios.defaults.withCredentials = true

const API_URL = process.env.API_URL || 'http://localhost:8080'

export const saveBoardData = (userId, board, id, timer, delay) => {
    board = board.map(row =>
      row.map(({ letter, entry, number }) => ({ letter, entry, number }))
    )

    if (delay) timer = {...timer, accumulatedTime: timer.accumulatedTime - 3}
    
    try {
      axios.put(`${API_URL}/api/users/${userId}/crossword`, {
        id,
        board,
        spentTime: getTimeSpent(timer)
      })
    } catch (err) {
      console.error(err)
    }
  }