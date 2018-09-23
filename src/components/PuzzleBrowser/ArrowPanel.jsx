import React from 'react'
import leftArrowButton from '../icons/arrow-left.svg'
import rightArrowButton from '../icons/arrow-right.svg'

const ArrowPanel = ({ direction, showArrow, handleClick }) => (
  <div className="PuzzleBrowser-Arrow-Container" onClick={handleClick}>
    {showArrow ? (
      <div className="PuzzleBrowser-Arrow">
        <img
          src={direction === 'right' ? rightArrowButton : leftArrowButton}
          alt={`Scroll ${direction.charAt(0).toUpperCase() +
            direction.slice(1)}`}
        />
      </div>
    ) : (
      <div className="PuzzleBrowser-No-Arrow" />
    )}
  </div>
)

export default ArrowPanel
