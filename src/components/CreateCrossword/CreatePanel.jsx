import React, { Component } from 'react'
import { connect } from 'react-redux'

class CreatePanel extends Component {
  constructor(props) {
    super(props)
  }
  render = () => {
    return (
      <div className="Create-Panel">
        CreatePanel
        <button>Add black squares</button>
        <button>Add letters</button>
        <button>Suggest words?</button>
      </div>
    )
  }
}
const mapState = null
const mapDispatch = {}

export default connect(
  mapState,
  mapDispatch
)(CreatePanel)
