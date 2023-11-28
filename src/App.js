import './App.css';

import React, { useState, useEffect } from 'react'
import Player from './Player'
import GridSquare from './components/GridSquare'

function App() {

  let [game, setGame] = useState ({
    isStarted: false,
    isOver: false,
    isDraw: false
  })
  let [grid, setGrid] = useState ({
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    six: '',
    seven: '',
    eight: '',
    nine: '',
  })
  let [playerOne, setPlayerOne] = useState(new Player('will', 'green', 'X', true))
  let [playerTwo, setPlayerTwo] = useState(new Player('jeb', 'blue', 'O', false))
  let [turn, setTurn] = useState(0)

  console.log(playerOne, playerTwo)

  console.log(grid)

  // if the space isn't taken, update the appropriate player and the grid,
  // and increment turn. if the space is taken, do nothing
  let clickHandle = (e) => {
    if (grid[e.target.id] === '') {
      if (turn % 2 === 0) {
        setPlayerOne({...playerOne, [e.target.id]: true})
        setGrid({...grid, [e.target.id]: playerOne.symbol})
      } else if (turn % 2 === 1) {
        setPlayerTwo({...playerTwo, [e.target.id]: true})
        setGrid({...grid, [e.target.id]: playerTwo.symbol})
      }
      setTurn(turn += 1)
    } else {}
  }

  // every time there's a new turn, we want to check to see if someone
  // won the game
  useEffect(() => {
    let { one, two, three, four, five, six, seven, eight, nine} = grid
    if ( (one === two === three) || (four === five === six) ) {}
  }, [turn])

  // if game hasnt started, render start screen
  
  // if game has started, render grid
  return (
    <div className="App">
      <div className="just-lines">
        <div className="grid-container">
          {Object.keys(grid).map(number => {
            return <GridSquare style='grid-square' id={number} value={grid[number]} click={clickHandle}/>
          })}
        </div>
      </div>
    </div>
  );

  // if game is over, render game over
  // // maybe render a game over thing and wait a few seconds before 
  // // swapping 
}

export default App;
