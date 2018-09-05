import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import board from './board'
import direction from './direction'
import clues from './clues'
import selectedSquare from './selectedSquare'
import selectedLine from './selectedLine'
import selectedClue from './selectedClue'
import selectedAltClue from './selectedAltClue'
import clickedClueSquare from './clickedClueSquare'
import remainingSquares from './remainingSquares'
import gameState from './gameState'

const reducer = combineReducers({
  board,
  direction,
  clues,
  selectedSquare,
  selectedLine,
  selectedClue,
  selectedAltClue,
  clickedClueSquare,
  remainingSquares,
  gameState
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)

const store = createStore(reducer, middleware)

export default store
