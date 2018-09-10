import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { startGame, pauseGame } from '../store/gameState'
import secondsToTime from '../utilities/secondsToTime'
import './css/Timer.css'
import pauseButton from './icons/pause.svg'
import playButton from './icons/play.svg'

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
    const { startGame } = this.props
    const timer = setInterval(this.tick, 1000)
    this.setState({ timer })
    startGame()
  }

  componentWillUnmount() {
    const { timer } = this.state
    clearInterval(timer)
  }

  handlePauseButtonClick = () => {
    const { gameState, startGame, pauseGame} = this.props
    if (gameState === 'paused') startGame()
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
        <div className="Timer-Time">
          {secondsToTime(counter)}
        </div>
        {gameState === 'inProgress' && (
          <img
            className="Timer-PauseButton"
            onClick={this.handlePauseButtonClick}
            src={pauseButton}
            alt="P"
          />
        )}
        {gameState === 'paused' && (
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
  gameState: PropTypes.string.isRequired
}

const mapState = ({ gameState }) => ({ gameState })

const mapDispatch = { startGame, pauseGame }

export default connect(
  mapState,
  mapDispatch
)(Timer)
