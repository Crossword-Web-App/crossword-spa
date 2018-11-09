import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { startGame } from '../store/gameState'
import { setStartTime } from '../store/timer'
// import './css/StartModal.css'
import styled from 'styled-components'

const StartModalDiv = styled.div`
  font-size: 1.5em;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.9);
  margin-bottom: 0.5em;
`

const Button = styled.button`
  border: 0;
  border-radius: 0.5em;
  background-color: #1e88e5;
  color: white;
  font-size: 1.2em;
  font-weight: 700;
  letter-spacing: 0.025em;
  white-space: nowrap;
  text-decoration: none;
  padding: 1em 4em;
  cursor: pointer;

  &:hover {
    background-color: #3494e9;
  }
`

const ModalContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`

const StyledStartModal = styled.div`
  align-self: center;
  display: flex;
  padding: 1em;
  width: 18em;
  flex-direction: column;
  justify-content: center;
  border-radius: 1em;
  background-color: white;
  box-shadow: 0 0 30px 6px rgba(31, 51, 73, 0.1);
  cursor: pointer;
`

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
      <ModalContainer style={inGame ? noDisplayStyle : {}}>
        <StyledStartModal>
          <StartModalDiv>Ready to Play?</StartModalDiv>
          <Button onClick={this.handleClick}>OK</Button>
        </StyledStartModal>
      </ModalContainer>
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
