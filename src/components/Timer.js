import React, { Component } from 'react'
import { connect } from 'react-redux'
import './css/Timer.css'
import { startGame, pauseGame } from '../store/gameState'

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
    let timer = setInterval(this.tick, 1000)
    this.setState({ timer })
    this.props.startGame()
  }
  componentWillUnmount() {
    clearInterval(this.state.timer)
  }
  tick() {
    if (this.props.gameState === 'inProgress') {
    this.setState({
      counter: this.state.counter + 1
    })
  }
  }

  handlePauseButtonClick = () => {
    if (this.props.gameState === 'paused') this.props.startGame()
  
    else this.props.pauseGame()
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60))
    let divisor_for_minutes = secs % (60 * 60)
    let minutes = Math.floor(divisor_for_minutes / 60)
    let divisor_for_seconds = divisor_for_minutes % 60
    let seconds = Math.ceil(divisor_for_seconds)
    if (hours) return `${hours}:${minutes}:${seconds}`
    else if (minutes)
      return `${minutes < 10 ? '0' + minutes : minutes}:${
        seconds < 10 ? '0' + seconds : seconds
      }`
    else if (seconds < 10) return `0:0${seconds}`
    else return `0:${seconds}`
  }

  render() {
    return (
      <div className="Timer">
        <div>
          {this.secondsToTime(this.state.counter)}, {this.props.gameState}
        </div>
        {(this.props.gameState === 'inProgress' || this.props.gameState === 'paused') && 
        <div className="Timer-PauseButton" onClick = {this.handlePauseButtonClick}>Pause</div>}
      </div>
    )
  }
}

const mapState = ({ gameState }) => ({ gameState })
const mapDispatch = { startGame, pauseGame }

export default connect(
  mapState,
  mapDispatch
)(Timer)
