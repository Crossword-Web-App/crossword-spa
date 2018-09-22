import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Board from './Board'
import CluesPanel from './CluesPanel'
import Timer from './Timer'
import StartModal from './StartModal'
import { getBoard, removeBoard } from '../store/board'
import { getClues, removeClues } from '../store/clues'
import { startGame } from '../store/gameState'
import { removeSelectedClue } from '../store/selectedClue'
import { setBoardId } from '../store/boardId'
import './css/Game.css'

const API_URL = process.env.API_URL || 'http://localhost:8080'

class Game extends Component {
  componentDidMount() {
    this.loadUserGameOrNew()
  }

  componentDidUpdate(prevProps) {
    const { match, user, unloadGame } = this.props
    if (
      prevProps.match.params.id !== match.params.id ||
      prevProps.user !== user
    ) {
      unloadGame()
      this.loadUserGameOrNew()
    }
  }

  componentWillUnmount() {
    const { unloadGame } = this.props
    unloadGame()
  }

  loadUserGameOrNew = () => {
    const { loadGame, match, user, hasCrossword } = this.props

    if (user && user._id && hasCrossword(match.params.id)) {
      loadGame(match.params.id, user._id)
    } else {
      loadGame(match.params.id)
    }
  }

  render() {
    const { board, clues, startGame } = this.props
    return (
      <div className="Game">
        {board.length && Object.keys(clues).length ? (
          <div className="App">
            <Board />
            <CluesPanel />
            <Timer />
            <StartModal onClick={startGame} />
          </div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

const mapState = ({ board, clues, user }) => ({
  board,
  clues,
  user,
  hasCrossword: id => {
    return (
      user &&
      user.hasOwnProperty('savedCrosswords') &&
      user.savedCrosswords.some(el => el === +id)
    )
  }
})

const mapDispatch = {
  loadGame: (boardId, userId) => async dispatch => {
    try {
      let res
      if (userId) {
        res = await axios.get(
          `${API_URL}/api/users/${userId}/crossword/${boardId}`
        )
      } else {
        res = await axios.get(`${API_URL}/api/crossword/${boardId || 1}`)
      }
      const data = await res.data
      const { board, clues, id } = data
      dispatch(getBoard(board))
      dispatch(getClues(clues))
      dispatch(setBoardId(id))
    } catch (error) {
      console.error(error)
      dispatch(getBoard([]))
      dispatch(getClues({}))
    }
  },
  unloadGame: () => dispatch => {
    dispatch(removeBoard())
    dispatch(removeClues())
    dispatch(removeSelectedClue())
  },
  startGame
}

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Game)
)

/* PROP TYPES */
Game.propTypes = {
  board: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        letter: PropTypes.string,
        entry: PropTypes.string,
        number: PropTypes.number.isRequired,
        blackSquare: PropTypes.bool.isRequired,
        isChecked: PropTypes.bool.isRequired,
        isRevealed: PropTypes.bool.isRequired,
        className: PropTypes.string.isRequired,
        numberClassName: PropTypes.string.isRequired,
        inputClassName: PropTypes.string.isRequired,
        noEditInputClassName: PropTypes.string.isRequired
      })
    )
  ).isRequired,
  clues: PropTypes.shape({
    across: PropTypes.arrayOf(
      PropTypes.shape({
        clueId: PropTypes.number.isRequired,
        clue: PropTypes.string.isRequired
      })
    ),
    down: PropTypes.arrayOf(
      PropTypes.shape({
        clueId: PropTypes.number.isRequired,
        clue: PropTypes.string.isRequired
      })
    )
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node
    }).isRequired
  }).isRequired,
  loadGame: PropTypes.func.isRequired,
  unloadGame: PropTypes.func.isRequired
}
