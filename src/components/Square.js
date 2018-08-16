import React from 'react'
import './css/Square.css'

const Square = ({
  square,
  row,
  column,
  handleSquareClick,
  inputRef
}) => {
  // Letter square or black square
  return !square.blackSquare ? (
    <div
      className={square.className}
      onClick={() => handleSquareClick({row, column})}
    >
      {/* Answer number, if any*/}
      <div className={square.numberClassName}>{square.number}</div>
      {/* Editable input or uneditable revealed letter box*/}
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
    </div>
  ) : (
    <div className={square.className} ref={inputRef} />
  )
}

export default Square
