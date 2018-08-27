import React from 'react'
import Board from './Board'
import CluesPanel from './CluesPanel'
import Timer from './Timer'

const Home = () => (
  <div>
    <div className="App">
      <Board />
      <CluesPanel />
      {/* <AnswerPanel /> */}
      <Timer />
    </div>
  </div>
)

export default Home
