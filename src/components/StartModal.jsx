import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './css/StartModal.css'

const StartModal = ({ inGame, onClick }) => (
  <div className="Start-Modal-Container" style={inGame ? noDisplayStyle : {}}>
    <div className="Start-Modal">
      <div>Ready to Play?</div>
      <button onClick={onClick}>OK</button>
    </div>
  </div>
)

const noDisplayStyle = {
  display: 'none'
}

const mapState = ({ gameState }) => ({
  inGame: !(gameState === 'preGame')
})

export default connect(mapState)(StartModal)

/* PROP TYPES */
StartModal.propTypes = {
  inGame: PropTypes.bool.isRequired
}
