import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { startGame, pauseGame, startNewGame } from '../store/gameState'
import { setAccumulatedTime, setStartTime } from '../store/timer'
import './css/Timer.css'
import pauseButton from './icons/pause.svg'
import playButton from './icons/play.svg'
import { saveBoardData } from '../utilities/apiUtils'
import { secondsToTime, getTimeSpent } from '../utilities/timeUtils'

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = { time: Date.now() }
  }

  componentDidMount() {
    window.addEventListener('beforeunload', e => {
      e.preventDefault()

      const { user, board, boardId, timer, gameState } = this.props

      if (gameState === 'inProgress') {
        saveBoardData(user._id, board, boardId, timer)
      }

      // Chrome requires returnValue to be set.
      e.returnValue = undefined
    })

    window.addEventListener('blur', e => {
      e.preventDefault()

      const { gameState, timer } = this.props
      this.timeout = setTimeout(() => {
        if (gameState === 'inProgress') this.handlePauseButtonClick()
      }, 10000)
    })

    window.addEventListener('focus', e => {
      e.preventDefault()

      clearTimeout(this.timeout)
    })

    this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000)
  }

  componentDidUpdate(prevProps) {
    const { boardId, startNewGame } = this.props
    if (prevProps.boardId !== boardId) {
      startNewGame()
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  handlePauseButtonClick = () => {
    const {
      gameState,
      startGame,
      pauseGame,
      setAccumulatedTime,
      setStartTime,
      user,
      board,
      boardId,
      timer
    } = this.props
    if (gameState === 'paused') {
      startGame()
      setStartTime(Date.now())
    } else {
      pauseGame()
      setAccumulatedTime(getTimeSpent(timer))
      saveBoardData(user._id, board, boardId, timer)
    }
  }

  render() {
    const { gameState, timer } = this.props
    let timerClassName =
      gameState === 'preGame' ? 'Timer' : 'Timer Timer-Displayed'
    const { time } = this.state
    return (
      <div className={timerClassName}>
        <div className="Timer-Time">
          {gameState === 'inProgress'
            ? secondsToTime(getTimeSpent(timer))
            : secondsToTime(Math.floor(timer.accumulatedTime))}
        </div>

        {gameState === 'inProgress' && (
          <img
            className="Timer-PauseButton"
            onClick={this.handlePauseButtonClick}
            src={pauseButton}
            alt="Pause"
          />
        )}
        {(gameState === 'paused' || gameState === 'preGame') && (
          <img
            className="Timer-PlayButton"
            onClick={this.handlePauseButtonClick}
            src={playButton}
            alt="Play"
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

const mapState = ({ gameState, boardId, timer, user, board }) => ({
  gameState,
  boardId,
  timer,
  user,
  board
})

const mapDispatch = {
  startGame,
  pauseGame,
  startNewGame,
  setAccumulatedTime,
  setStartTime
}

export default connect(
  mapState,
  mapDispatch
)(Timer)
