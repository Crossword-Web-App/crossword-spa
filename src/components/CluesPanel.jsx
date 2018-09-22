import React from 'react'
import { connect } from 'react-redux'
import CluesColumn from './CluesColumn'
import './css/CluesPanel.css'

const CluesPanel = ({ acceptsInput }) => (
  <div className="CluesPanel" style={acceptsInput ? noBlurStyle : {}}>
    <CluesColumn panel="across" />
    <CluesColumn panel="down" />
  </div>
)

const noBlurStyle = {
  filter: 'blur(0px) grayscale(0%)'
}


const mapState = ({ gameState }) => ({
  acceptsInput: gameState !== 'preGame' && gameState !== 'paused'
})

export default connect(mapState)(CluesPanel)
