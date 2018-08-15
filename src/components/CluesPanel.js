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
        <CluesColumn dir="across" />
        <CluesColumn dir="down" />
      </div>
    )
  }
}

export default CluesPanel
