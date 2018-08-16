import React from 'react'
import CluesColumn from './CluesColumn'
import './css/CluesPanel.css'

const CluesPanel = () => (
  <div className="CluesPanel">
    <CluesColumn dir="across" />
    <CluesColumn dir="down" />
  </div>
)

export default CluesPanel
