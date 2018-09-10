import React from 'react'
import PropTypes from 'prop-types'
import './css/Square.css'

const Square = ({ square, row, column, handleSquareClick, inputRef }) =>
  !square.blackSquare ? (
    <div
      className={square.className}
      onClick={() => handleSquareClick({ row, column })}
    >
      {/* Answer number, if any */}
      <div className={square.numberClassName}>
        {square.number > 0 ? square.number : ''}
      </div>
      {/* Editable input or uneditable revealed letter box */}
      {!square.isRevealed ? (
        <input
          className={square.inputClassName}
          maxLength="1"
          type="text"
          tabIndex="-1"
          value={square.entry}
          ref={inputRef}
        />
      ) : (
        <div className={square.noEditInputClassName}>
          {square.letter.toUpperCase()}
        </div>
      )}
      {square.isChecked && <div className="Square-CheckedDot" />}
    </div>
  ) : (
    <div className={square.className} ref={inputRef} />
  )

Square.propTypes = {
  square: PropTypes.shape({
    letter: PropTypes.string,
    entry: PropTypes.string,
    number: PropTypes.number.isRequired,
    blackSquare: PropTypes.bool.isRequired,
    isChecked: PropTypes.bool.isRequired,
    displayWrong: PropTypes.bool.isRequired,
    isRevealed: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired,
    numberClassName: PropTypes.string.isRequired,
    inputClassName: PropTypes.string.isRequired,
    noEditInputClassName: PropTypes.string.isRequired
  }).isRequired,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  handleSquareClick: PropTypes.func.isRequired,
  inputRef: PropTypes.func.isRequired
}

export default Square
