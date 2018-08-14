import React, { Component } from 'react'
import { connect } from 'react-redux'
import CluesColumn from './CluesColumn'
import './css/CluesPanel.css'

class CluesPanel extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="CluesPanel">
        <CluesColumn dir="ACROSS" />
        <CluesColumn dir="DOWN" />
      </div>
    )
  }
}

export default CluesPanel
