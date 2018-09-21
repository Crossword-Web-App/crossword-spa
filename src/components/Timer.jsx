import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { startGame, pauseGame, startNewGame } from '../store/gameState'
import secondsToTime from '../utilities/secondsToTime'
import './css/Timer.css'
import pauseButton from './icons/pause.svg'
import playButton from './icons/play.svg'
import axios from 'axios'

axios.defaults.withCredentials = true

const API_URL = process.env.API_URL || 'http://localhost:8080'

class Timer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timer: null,
      counter: 0
    }

    this.tick = this.tick.bind(this)
  }

  componentDidMount() {
    const timer = setInterval(this.tick, 1000)
    this.setState({ timer })
  }

  componentDidUpdate(prevProps) {
    const { boardId, startNewGame } = this.props
    if (prevProps.boardId !== boardId) {
      this.setState({ counter: 0 })
      startNewGame()
    }
  }

  componentWillUnmount() {
    const { timer } = this.state
    clearInterval(timer)
  }

  handlePauseButtonClick = () => {
    const { gameState, startGame, pauseGame, boardId, user } = this.props
    if (gameState === 'preGame' && user && user._id) {
      axios.post(`${API_URL}/api/users/${user._id}/crossword`, {crosswordID: boardId})
    }
    if (gameState === 'paused' || gameState === 'preGame') startGame()
    else pauseGame()
  }

  tick() {
    const { gameState } = this.props
    const { counter } = this.state
    if (gameState === 'inProgress') {
      this.setState({
        counter: counter + 1
      })
    }
  }

  render() {
    const { gameState } = this.props
    const { counter } = this.state
    return (
      <div className="Timer">
        <div className="Timer-Time">{secondsToTime(counter)}</div>
        {gameState === 'inProgress' && (
          <img
            className="Timer-PauseButton"
            onClick={this.handlePauseButtonClick}
            src={pauseButton}
            alt="P"
          />
        )}
        {(gameState === 'paused' || gameState === 'preGame') && (
          <img
            className="Timer-PlayButton"
            onClick={this.handlePauseButtonClick}
            src={playButton}
            alt="P"
          />
        )}
      </div>
    )
  }
}

Timer.propTypes = {
  startGame: PropTypes.func.isRequired,
  pauseGame: PropTypes.func.isRequired,
  startNewGame: PropTypes.func.isRequired,
  gameState: PropTypes.string.isRequired,
  boardId: PropTypes.number.isRequired
}

const mapState = ({ gameState, boardId, user }) => ({ gameState, boardId, user })

const mapDispatch = { startGame, pauseGame, startNewGame }

export default connect(
  mapState,
  mapDispatch
)(Timer)
