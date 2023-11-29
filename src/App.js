import './App.css';

import React, { useState, useEffect } from 'react'
import Player from './Player'
import GameSetup from './views/GameSetup';
import Game from './views/Game'
import GameOver from './views/GameOver'

function App() {

  // declare our game objects
  let [game, setGame] = useState ({
    isStarted: false,
    isOver: false,
    isDraw: false,
    playerTurn: '',
    winningPlayer: '',
    showReplay: false
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
  let [playerOne, setPlayerOne] = useState(new Player(``, ``, true))
  let [playerTwo, setPlayerTwo] = useState(new Player(``, ``, false))
  let [turn, setTurn] = useState(0)
  let [symbols, setSymbols] = useState([`X`, `O`, `🏀`, `🌴`, `😃`, `👹`, `🐳`])
  let [message, setMessage] = useState('')

  // -- click handler for grid squares
  // if the space isn't taken, update player object to give them the square,
  // add the symbol of that player to the space they selected, and update
  // whose turn it is. then, increment turn. 
  // if the space is taken, do nothing
  let clickHandle = (e) => {
    if (grid[e.target.id] === '' && game.isOver === false) {
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
  // we return true to correctly check for a win before checking for a draw
  // because otherwise draw would get called before the win
  let checkWin = (player) => {
    let { one, two, three, four, five, six, seven, eight, nine} = player
    if ( (one && two && three) || (four && five && six) || (seven && eight && nine) || // check rows
      (one && four && seven) || (two && five && eight ) || (three && six && nine ) || // check columns
      (one && five && nine) || (seven && five && three) ) { // check diagonals
        setGame({...game, winningPlayer: player.name, isOver: true})
        return true
    }
  }

  // if there are no spaces that aren't taken and nobody won, it's a draw
  let checkDraw = () => {
    if (!Object.values(grid).some(value => {
      console.log(value)
      return value === ''
    }))
      setGame({...game, winningPlayer: 'nobody', isOver: true})
  }

  // keeps the current players, but resets the grid. Retains
  // initial game state
  let resetCurrentGame = () => {
    setGame({
      isStarted: true,
      isOver: false,
      isDraw: false,
      playerTurn: playerOne.name,
      winningPlayer: '',
      showReplay: false
    })
    clearGrid()
    setTurn(0)
    setPlayerOne(new Player(playerOne.name, playerOne.symbol, true))
    setPlayerTwo(new Player(playerTwo.name, playerTwo.symbol, false))
  }

  // completely clears the game to a new game, including both players
  // in addition to grid, game state, and inital form values
  let resetGame = () => {
    setGame({
      isStarted: false,
      isOver: false,
      isDraw: false,
      playerTurn: '',
      winningPlayer: '',
      showReplay: false
    })
    clearGrid()
    setPlayerOne(new Player('', '', true))
    setPlayerTwo(new Player('', '', false))
    setSymbols([`X`, `O`, `🏀`, `🌴`, `😃`, `👹`, `🐳`])
    setMessage('')
    setTurn(0)
  }

  // we're doing this in several places so let's just make it a function
  let clearGrid = () => {
    setGrid({
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
  }

  // onClick for the symbol buttons, this lets each player choose a symbol
  let setSymbol = (e) => {
    if (e.target.attributes.player.value === "one" && !playerOne.symbol) {
      setPlayerOne({...playerOne, symbol: symbols[e.target.attributes.loc.value]})
      setSymbols(symbols.filter(symbol => symbol !== symbols[e.target.attributes.loc.value]))
    }
    else if (e.target.attributes.player.value === "two" && !playerTwo.symbol) {
      setPlayerTwo({...playerTwo, symbol: symbols[e.target.attributes.loc.value]})
      setSymbols(symbols.filter(symbol => symbol !== symbols[e.target.attributes.loc.value]))
    }
  }

  // since the setState calls happen asynchronously, we have to
  // watch playerOne's name in the form to make sure it's tracked 
  // correctly in the game object for the first turn
  let changeHandler = (e) => {
    setPlayerOne({...playerOne, name: e.target.value})
  }

  // some brief form validation, if we have both player names
  // and symbols we go and play
  let submitForm = (e) => {
    e.preventDefault()
    if (!playerOne.symbol || !playerTwo.symbol)
      setMessage('Both players need to choose a symbol')
    else if (e.target[0].value === '' || e.target[1].value === '')
      setMessage('Both players need to input a name')
    else {
      setPlayerOne({...playerOne, name: e.target[0].value})
      setPlayerTwo({...playerTwo, name: e.target[1].value})
      setMessage('Get ready to play!')
      setTimeout (()=> {
        setGame({...game, isStarted: true, playerTurn: playerOne.name})
      }, 3000)
    }
  }

  // -- useEffect on turn state
  // every time there's a new turn, we want to check to see if someone
  // won the game
  // PLEASE NOTE: reversed the % logic because at this point turn has 
  // already been incremented by 1
  useEffect(() => {
    let over = false
    if (turn % 2 === 1)
      over = checkWin(playerOne)
    else if (turn % 2 === 0)
      over = checkWin(playerTwo)
    if (!over)
      checkDraw()
  }, [turn])

  // wait for a few seconds after the game is over, then show
  // the replay game screen if it is over
  useEffect(()=> {
    let cleanup
    if (game.isOver) {
      cleanup =  setTimeout(()=> {
          setGame({...game, showReplay: true})
        }, 2000)
    }
    return () => clearTimeout(cleanup)
  }, [game])

  // -- Render function
  // renders the GameStart View
  // if game isn't ready, render start screen and collect info
  if (!game.isStarted)
    return (
      <GameSetup playerOne={playerOne} playerTwo={playerTwo} symbols={symbols} setSymbol={setSymbol} change={changeHandler} submit={submitForm} message={message}/>
    )

  // -- Render function
  // renders the Game view
  // if game is ready, render grid and play
  else if (game.isStarted && !game.showReplay)
    return (
      <Game game={game} playerOne={playerOne} playerTwo={playerTwo} grid={grid} click={clickHandle}/>
    )

  // -- Render function
  // if game is over, render the replay prompt after 2s, see useEffect() 
  // on game above with the setTimeout for reference
  else if (game.showReplay)
      return (
        <GameOver game={game} playerOne={playerOne} playerTwo={playerTwo} resetCurrentGame={resetCurrentGame} resetGame={resetGame}/>
      )
}

export default App;
