import React, { Component } from 'react'
import BoardGrid from '../BoardGrid'
import CreatePanel from './CreatePanel'

class CreateBoard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="Create-Board-Container">
        <BoardGrid />
        {this.props.showCreatePanel && <CreatePanel />}
      </div>
    )
  }
}

export default CreateBoard
