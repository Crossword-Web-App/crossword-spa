import React from 'react'
import { Link } from 'react-router-dom'

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

const Puzzle = ({ id }) => (
  <div className="PuzzleBrowser-Puzzle">
    <div className="PuzzleBrowser-Board">
      <div className="PuzzleBrowser-Board-Squares">
        {getRandomBoardSquares().map(square => square)}
      </div>
      <div className="PuzzleBrowser-Board-Overlay">
        {id && (
          <div className="PuzzleBrowser-Board-Overlay-Text">
            <div className="PuzzleBrowser-Board-Overlay-Text-Metric">
              Crossword Id:
            </div>
            <div className="PuzzleBrowser-Board-Overlay-Text-Value">{id}</div>
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
          <Link to={`/crossword/${id}`}>
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
