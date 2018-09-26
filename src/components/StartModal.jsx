import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { startGame } from '../store/gameState'
import { setStartTime } from '../store/timer'
import './css/StartModal.css'

const API_URL = process.env.API_URL || 'http://localhost:8080'

class StartModal extends Component {
  handleClick = () => {
    const { gameState, user, boardId, startGame, setStartTime } = this.props
    if (gameState === 'preGame' && user && user._id) {
      axios.post(`${API_URL}/api/users/${user._id}/crossword`, {
        crosswordID: boardId
      })
    }
    startGame()
    setStartTime(Date.now())
  }

  render = () => {
    const { inGame } = this.props
    return (
      <div
        className="Start-Modal-Container"
        style={inGame ? noDisplayStyle : {}}
      >
        <div className="Start-Modal">
          <div>Ready to Play?</div>
          <button onClick={this.handleClick}>OK</button>
        </div>
      </div>
    )
  }
}

const noDisplayStyle = {
  display: 'none'
}

const mapState = ({ user, gameState, boardId }) => ({
  user,
  gameState,
  inGame: !(gameState === 'preGame'),
  boardId
})

const mapDispatch = { startGame, setStartTime }

export default connect(
  mapState,
  mapDispatch
)(StartModal)

/* PROP TYPES */
StartModal.propTypes = {
  inGame: PropTypes.bool.isRequired
}
