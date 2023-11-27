import './App.css';

import React, { useState, useEffect } from 'react'
import Player from './Player'

function App() {

  let [game, setGame] = useState ({
    isStarted: false,
    isOver: false,
    isDraw: false
  })
  let [grid, setGrid] = useState ({
    selected: []
  })
  let [player1, setPlayer1] = useState(new Player('will', 'green'))
  let [player2, setPlayer2] = useState(new Player('jeb', 'blue'))

  console.log(player1, player2)

  // if game hasnt started, render start screen
  // if game has started, render grid
  // if game is over, render game over
  // // maybe render a game over thing and wait a few seconds before 
  // // swapping 

  return (
    <div className="App">
      <div className="just-lines">
        <div className="grid-container">
          <div className="grid-square" id="one">1</div>
          <div className="grid-square" id="two">2</div>
          <div className="grid-square" id="three">3</div>
          <div className="grid-square" id="four">4</div>
          <div className="grid-square" id="five">5</div>
          <div className="grid-square" id="six">6</div>
          <div className="grid-square" id="seven">7</div>
          <div className="grid-square" id="eight">8</div>
          <div className="grid-square" id="nine">9</div>
        </div>
      </div>
    </div>
  );
}

export default App;
