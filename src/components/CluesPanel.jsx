import React from 'react'
import { connect } from 'react-redux'
import CluesColumn from './CluesColumn'
import './css/CluesPanel.css'

const CluesPanel = ({ noInput }) => (
  <div className="CluesPanel" style={noInput ? blurStyle : {}}>
    <CluesColumn panel="across" />
    <CluesColumn panel="down" />
  </div>
)

const blurStyle = {
  filter: 'blur(20px) grayscale(50%)'
}

const mapState = ({ gameState }) => ({
  noInput: gameState === 'preGame' || gameState === 'paused'
})

export default connect(mapState)(CluesPanel)
