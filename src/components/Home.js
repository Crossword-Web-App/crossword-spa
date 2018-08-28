import React, { Component } from 'react'
import { connect } from 'react-redux'
import Board from './Board'
import CluesPanel from './CluesPanel'
import Timer from './Timer'
import axios from 'axios'
import { setBorders, getBoard } from '../store/board'
import { setMaxSquares } from '../store/remainingSquares'
import { getClues } from '../store/clues'
const API_URL = 'XXXXXXXX'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const { setBorders, setMaxSquares, board } = this.props

    await this.props.loadGame(1)

    // add border css to appropriate squares
    setBorders()
  }
  render() {
    return (
      <div>
        <div className="App">
          <Board />
          <CluesPanel />
          {/* <AnswerPanel /> */}
          <Timer />
        </div>
      </div>
    )
  }
}

const mapDispatch = {
  loadGame: id => async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/crossword/${id}`)
      const board = await res.data.board
      const clues = await res.data.clues
      dispatch(getBoard(board))
      dispatch(getClues(clues))
      dispatch(setMaxSquares(
        board
          .reduce((a, b) => a.concat(b))
          .filter(
            square => !square.blackSquare && square.entry !== square.letter
          ).length
      ))
    } catch (error) {
      console.error(error)
    }
  },
  setBorders
}

export default connect(
  null,
  mapDispatch
)(Home)
