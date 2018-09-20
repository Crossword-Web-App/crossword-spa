import React from 'react'
import { Link } from 'react-router-dom'
import getRandomPuzzleId from '../../utilities/getRandomPuzzleId'

const getRandomBoardSquares = () => {
  const boardSquares = []
  for (let i = 0; i < 225; i++) {
    boardSquares.push(
      <div
        className="PuzzleBrowser-Square"
        style={{ backgroundColor: Math.random() < 0.15 ? 'black' : 'white' }}
        key={i}
      />
    )
  }
  return boardSquares
}

const getUserSquares = crossword => {
  const boardSquares = []
  crossword.board.map((row, row_idx) =>
    row.map((square, col_idx) => {
      let className = 'PuzzleBrowser-Square'
      if (square.entry) className += ' PuzzleBrowser-Square-Filled'
      if (square.letter === '.') className += ' PuzzleBrowser-Square-Black'
      boardSquares.push(
        <div
          className={className}
          key={crossword.id + row_idx * crossword.board.length + col_idx}
        />
      )
    })
  )
  return boardSquares
}

const Puzzle = ({ crossword }) => (
  <div className="PuzzleBrowser-Puzzle">
    <div className="PuzzleBrowser-Board">
      <div className="PuzzleBrowser-Board-Squares" style={crossword && crossword.gridStyle ? crossword.gridStyle : {}}>
        {crossword && crossword.board
          ? getUserSquares(crossword).map(square => square)
          : getRandomBoardSquares().map(square => square)}
      </div>
      <div className="PuzzleBrowser-Board-Overlay">
        {crossword &&
          crossword.id && (
            <div className="PuzzleBrowser-Board-Overlay-Text">
              <div className="PuzzleBrowser-Board-Overlay-Text-Metric">
                Crossword Id:
              </div>
              <div className="PuzzleBrowser-Board-Overlay-Text-Value">
                {crossword.id}
              </div>
            </div>
          )}
        <div className="PuzzleBrowser-Board-Overlay-Text">
          <div className="PuzzleBrowser-Board-Overlay-Text-Metric">
            Last Played:
          </div>
          <div className="PuzzleBrowser-Board-Overlay-Text-Value">9/15</div>
        </div>
        <div className="PuzzleBrowser-Board-Overlay-Text">
          <div className="PuzzleBrowser-Board-Overlay-Text-Metric">
            Time Spent:
          </div>
          <div className="PuzzleBrowser-Board-Overlay-Text-Value">1:30</div>
        </div>
        <div className="PuzzleBrowser-Board-Overlay-Text">
          <div className="PuzzleBrowser-Board-Overlay-Text-Metric">
            Letters to go:
          </div>
          <div className="PuzzleBrowser-Board-Overlay-Text-Value">120</div>
        </div>
        <div className="PuzzleBrowser-Board-Overlay-Banner">
          <Link
            to={`/crossword/${
              crossword && crossword.id ? crossword.id : getRandomPuzzleId()
            }`}
          >
            <span role="img" aria-label="star">
              🌟
            </span>
            <span>Start</span>
            <span role="img" aria-label="star">
              {' '}
              🌟
            </span>
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export default Puzzle
