import React from 'react'
import { connect } from 'react-redux'

const CluesColumn = props => {
  const { clues, dir, direction, selectedClue, selectedAltClue } = props
  let className = 'CluesPanel-Clue'

  return (
    <div className="CluesPanel-Column-Container">
      <div className="CluesPanel-Header-Text">{dir}</div>
      <div className="CluesPanel-Clues-Body">
        {clues[dir].map(clue => (
          <div
            key={clue.clueId}
            className={
              clue.clueId === selectedClue && direction === dir
                ? className + ' CluesPanel-Selected-Clue'
                : className
            }
          >
            <div
              className={
                clue.clueId === selectedAltClue && direction !== dir
                  ? 'CluesPanel-Selected-Clue-Alt'
                  : 'CluesPanel-Deselected-Clue-Alt'
              }
            />
            <div
              style={{
                paddingLeft: '0.25em',
                flexBasis: '18em',
                flexGrow: '0'
              }}
            >
              {clue.clueId}. {clue.clue}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const mapState = ({ clues, selectedClue, selectedAltClue, direction }) => ({
  clues,
  selectedClue,
  selectedAltClue,
  direction
})

export default connect(
  mapState,
  null
)(CluesColumn)
