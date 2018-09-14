import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Board from './Board'
import CluesPanel from './CluesPanel'
import Timer from './Timer'
import { getBoard } from '../store/board'
import { getClues } from '../store/clues'
import { setBoardId } from '../store/boardId'

const API_URL = process.env.API_URL || 'http://localhost:8080'

class Game extends Component {
  componentDidMount() {
    const { board, loadGame, match } = this.props
    if (board && !board.length) loadGame(match.params.id)
  }

  componentDidUpdate(prevProps) {
    const { loadGame, match } = this.props
    if (prevProps.match.params.id !== match.params.id) loadGame(match.params.id)
  }

  render() {
    const { board, clues } = this.props
    return (
      <div>
        {board.length && Object.keys(clues).length ? (
          <div className="App">
            <Board />
            <CluesPanel />
            <Timer />
          </div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

Game.propTypes = {
  board: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        letter: PropTypes.string,
        entry: PropTypes.string,
        number: PropTypes.number.isRequired,
        blackSquare: PropTypes.bool.isRequired,
        isChecked: PropTypes.bool.isRequired,
        displayWrong: PropTypes.bool.isRequired,
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
  loadGame: PropTypes.func.isRequired
}

const mapState = ({ board, clues }) => ({ board, clues })

const mapDispatch = {
  loadGame: boardId => async dispatch => {
    try {
      /* axios returns call to spa server if no API_URL provided,
       * will fail silently
       */
      const res = await axios.get(`${API_URL}/api/crossword/${boardId || 1}`)
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
  }
}

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Game)
)
