import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import board from './board'
import boardId from './boardId'
import direction from './direction'
import clues from './clues'
import selectedSquare from './selectedSquare'
import selectedLine from './selectedLine'
import selectedClue from './selectedClue'
import selectedAltClue from './selectedAltClue'
import clickedClueSquare from './clickedClueSquare'
import remainingSquares from './remainingSquares'
import gameState from './gameState'
import user from './user'
import timer from './timer'

const reducer = combineReducers({
  board,
  boardId,
  direction,
  clues,
  selectedSquare,
  selectedLine,
  selectedClue,
  selectedAltClue,
  clickedClueSquare,
  remainingSquares,
  gameState,
  user,
  timer
})

let middleware = [thunkMiddleware]

if (process.env.NODE_ENV === 'production') {
  middleware = applyMiddleware(...middleware)
} else {
  middleware = [...middleware, createLogger({ collapsed: true })]
  middleware = composeWithDevTools(applyMiddleware(...middleware))
}

const store = createStore(reducer, middleware)

export default store
