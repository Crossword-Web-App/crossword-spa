import React from 'react'
import Board from './Board'
import CluesPanel from './CluesPanel'
import Timer from './Timer'
import AnswerPanel from './AnswerPanel'

const Home = () => (
  <div>
    <div className="App">
      <Board />
      <CluesPanel />
      <AnswerPanel />
      <Timer />
    </div>
  </div>
)

export default Home
