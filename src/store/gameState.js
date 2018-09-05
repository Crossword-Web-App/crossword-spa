// gamestate can be: pregame, paused, in progress, finished

// Action Type
const PAUSE_GAME = 'PAUSE_GAME'
const START_GAME = 'START_GAME'
const END_GAME = 'END_GAME'

// Action Creators
export const pauseGame = () => ({ type: PAUSE_GAME })
export const startGame = () => ({ type: START_GAME })
export const endGame = () => ({ type: END_GAME })

// Reducer
const reducer = (state = 'pregame', action) => {
  switch (action.type) {
    case PAUSE_GAME:
      return 'paused' 
    case START_GAME:
      return 'inProgress'
    case END_GAME:
      return 'gameOver'
    default:
      return state
  }
}

export default reducer