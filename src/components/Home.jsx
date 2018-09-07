import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import Board from './Board'
import CluesPanel from './CluesPanel'
import Timer from './Timer'
import { getBoard } from '../store/board'
import { getClues } from '../store/clues'
import { API_URL } from '../../secrets'

class Home extends Component {

  async componentDidMount() {
    const { loadGame } = this.props
    await loadGame(1)
  }

  render() {
    const { board, clues } = this.props
    return (
      <div>
        {board.length && Object.keys(clues).length ? (
          <div className="App">
            <Board />
            <CluesPanel />
            {/* <AnswerPanel /> */}
            <Timer />
          </div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

Home.propTypes = {
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
  }).isRequired
}

const mapState = ({ board, clues }) => ({ board, clues })

const mapDispatch = {
  loadGame: id => async dispatch => {
    try {
      /* axios returns call to spa server if no API_URL provided,
       * will fail silently
       */
      const res = await axios.get(`${API_URL}/api/crossword/1`)
      const data = await res.data
      const { board, clues } = data
      dispatch(getBoard(board))
      dispatch(getClues(clues))
    } catch (error) {
      console.error(error)
      dispatch(getBoard([]))
      dispatch(getClues({}))
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(Home)
