import React from 'react'
import { Link } from 'react-router-dom'
import getRandomPuzzleId from '../../utilities/getRandomPuzzleId'
import { secondsToTime } from '../../utilities/timeUtils'

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

const getUserSquares = board => {
  const boardSquares = []
  board.crossword.map((row, row_idx) =>
    row.map((square, col_idx) => {
      let className = 'PuzzleBrowser-Square'
      if (square.entry) className += ' PuzzleBrowser-Square-Filled'
      if (square.letter === '.') className += ' PuzzleBrowser-Square-Black'
      boardSquares.push(
        <div
          className={className}
          key={row_idx * board.crossword.length + col_idx + board.id}
        />
      )
    })
  )
  return boardSquares
}

const getPercentComplete = crossword => {
  const flattenedCrossword = crossword.reduce((a, b) => a.concat(b))
  return (
    (flattenedCrossword.filter(square => square.entry !== '').length /
      flattenedCrossword.length) *
    100
  )
}

const Puzzle = ({ crossword }) => {
  return (
    <div className="PuzzleBrowser-Puzzle">
      <div className="PuzzleBrowser-Board">
        <div
          className="PuzzleBrowser-Board-Squares"
          style={crossword && crossword.gridStyle ? crossword.gridStyle : {}}
        >
          {crossword && crossword.crossword
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
          {crossword.spentTime && (
            <div className="PuzzleBrowser-Board-Overlay-Text">
              <div className="PuzzleBrowser-Board-Overlay-Text-Metric">
                Time Spent:
              </div>
              <div className="PuzzleBrowser-Board-Overlay-Text-Value">
                {secondsToTime(crossword.spentTime)}
              </div>
            </div>
          )}
          {crossword &&
            crossword.crossword && (
              <div className="PuzzleBrowser-Board-Overlay-Text">
                <div className="PuzzleBrowser-Board-Overlay-Text-Metric">
                  Percent Filled:
                </div>
                <div className="PuzzleBrowser-Board-Overlay-Text-Value">
                  {`${Math.floor(getPercentComplete(crossword.crossword))}%`}
                </div>
              </div>
            )}
          <div className="PuzzleBrowser-Board-Overlay-Banner">
            <Link
              to={`/crossword/${
                crossword && crossword.id ? crossword.id : getRandomPuzzleId()
              }`}
            >
              Start
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Puzzle
