import React from 'react'
import CluesColumn from './CluesColumn'
import './css/CluesPanel.css'

const CluesPanel = () => (
  <div className="CluesPanel">
    <CluesColumn panel="across" />
    <CluesColumn panel="down" />
  </div>
)

export default CluesPanel
