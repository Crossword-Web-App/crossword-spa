import React, { Component } from 'react'
import { connect } from 'react-redux'

class CluesColumn extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="CluesPanel-Column-Container">
        <div className="CluesPanel-Header-Text">{this.props.dir}</div>
        <div className="CluesPanel-Clues-Body">
          {this.props.clues.map(clue => (
            <div key={clue.id}>
              {clue.id}. {clue.clue}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = ({ clues }) => ({ clues })

export default connect(
  mapState,
  null
)(CluesColumn)
