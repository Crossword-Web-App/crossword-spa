import React, { Component } from 'react'
import { connect } from 'react-redux'

class CluesColumn extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const className = 'CluesPanel-Clue'
    return (
      <div className="CluesPanel-Column-Container">
        <div className="CluesPanel-Header-Text">{this.props.dir}</div>
        <div className="CluesPanel-Clues-Body">
          {this.props.clues.map(clue => (
            <div
              key={clue.id}
              className={
                clue.id === 0 ? className + ' CluesPanel-Selected-Clue' : className
              }
            >
              <div
                className={
                  clue.id === 0
                    ? 'CluesPanel-Selected-Clue-Alt'
                    : clue.id === 1
                      ? 'CluesPanel-Selected-Clue-Alt'
                      : 'CluesPanel-Deselected-Clue-Alt'
                }
              />
              <div
                style={{ paddingLeft: '0.25em', flexBasis: '18em', flexGrow: '0' }}
              >
                {clue.id + 1}. {clue.clue}
              </div>
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
