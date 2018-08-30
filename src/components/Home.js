import React, { Component } from 'react'
import { connect } from 'react-redux'
import Board from './Board'
import CluesPanel from './CluesPanel'
import Timer from './Timer'
import axios from 'axios'
import { getBoard } from '../store/board'
import { getClues } from '../store/clues'
import { API_URL } from '../../secrets'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    
    await this.props.loadGame(1)

  }
  render() {
    return (
      <div>
        {(this.props.board.length &&
          Object.keys(this.props.clues).length) ? (
            <div className="App">
              <Board />
              <CluesPanel />
              {/* <AnswerPanel /> */}
              <Timer />
            </div>
          ) : <div></div>
          }
      </div>
    )
  }
}

const mapState = ({ board, clues }) => ({ board, clues })

const mapDispatch = {
  loadGame: id => async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/crossword/${id}`)
      const board = await res.data.board
      const clues = await res.data.clues
      dispatch(getBoard(board))
      dispatch(getClues(clues))
    } catch (error) {
      console.error(error)
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(Home)
