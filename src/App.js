import './App.css';

import React, { useState, useEffect } from 'react'
import Player from './Player'
import GridSquare from './components/GridSquare'

function App() {

  let [game, setGame] = useState ({
    isStarted: false,
    isOver: false,
    isDraw: false,
    playerTurn: 'will'
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
  let [playerOne, setPlayerOne] = useState(new Player('will', 'green', `🏀`, true))
  let [playerTwo, setPlayerTwo] = useState(new Player('jeb', 'blue', `🌴`, false))
  let [turn, setTurn] = useState(0)

  // -- click handler for grid squares
  // if the space isn't taken, update player object to give them the square,
  // add the symbol of that player to the space they selected, and update
  // whose turn it is. then, increment turn. 
  // if the space is taken, do nothing
  let clickHandle = (e) => {
    if (grid[e.target.id] === '') {
      if (turn % 2 === 0) {
        setPlayerOne({...playerOne, [e.target.id]: true})
        setGrid({...grid, [e.target.id]: playerOne.symbol})
        setGame({...game, playerTurn: playerTwo.name})
      } else if (turn % 2 === 1) {
        setPlayerTwo({...playerTwo, [e.target.id]: true})
        setGrid({...grid, [e.target.id]: playerTwo.symbol})
        setGame({...game, playerTurn: playerOne.name})
      }
      setTurn(turn += 1)
    } else {}
  }

  // -- checks for win
  // accepts a player object and checks for true on all winning permutations
  // for that player
  let checkWin = (player) => {
    let { one, two, three, four, five, six, seven, eight, nine} = player

    if ( (one && two && three) || (four && five && six) || (seven && eight && nine) || // check rows
      (one && four && seven) || (two && five && eight ) || (three && six && nine ) || // check columns
      (one && five && nine) || (seven && five && three) ) { // check diagonals
        console.log(`win for ${player.name}`)
    }
  }

  // -- useEffect on turn state
  // every time there's a new turn, we want to check to see if someone
  // won the game
  // PLEASE NOTE: dealt with a weird bug where calling checkWin() in the
  // click handler was firing before the player object was updated.
  // Moved checkWin() into this useEffect, and reversed the % logic because 
  // at this point turn has already been incremented by 1
  useEffect(() => {
    if (turn % 2 === 1)
      checkWin(playerOne)
    else if (turn % 2 === 0)
      checkWin(playerTwo)
    else
      console.log(`somethin else wrong :cringe:`)
  }, [turn])

  // if game hasnt started, render start screen
  
  // if game has started, render grid
  return (
    <div className="App">
      <div className="header-container">
        <div className="game-name"><p>Tic Tac Toe</p></div>
        <div className="game-status"><p>It's {game.playerTurn}'s Turn</p></div>
      </div>
      <div className="just-lines">
        <div className="grid-container">
          {Object.keys(grid).map(number => <GridSquare style='grid-square' id={number} value={grid[number]} click={clickHandle}/>)}
        </div>
      </div>
    </div>
  );

  // if game is over, render game over
  // // maybe render a game over thing and wait a few seconds before 
  // // swapping 
}

export default App;
