import './App.css';

import React, { useState, useEffect } from 'react'
import Player from './Player'
import GridSquare from './components/GridSquare'

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
  // let [playerOne, setPlayerOne] = useState(new Player('will', `🏀`, true))
  // let [playerTwo, setPlayerTwo] = useState(new Player('jeb', `🌴`, false))
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
    setPlayerOne(new Player('', '', true))
    setPlayerTwo(new Player('', '', false))
    setSymbols([`X`, `O`, `🏀`, `🌴`, `😃`, `👹`, `🐳`])
    setMessage('')
  }

  // lets each player choose a symbol 
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
  // watch player 1's name in the form to make sure it's tracked 
  // correctly in the game object for the first turn
  let changeHandler = () => {

  }

  // some brief form validation, if we have both player names
  // and symbols we go
  let submitForm = (e) => {
    e.preventDefault()
    if (!playerOne.symbol || !playerTwo.symbol)
      setMessage('Both players need to choose a symbol')
    else if (e.target[0].value === '' || e.target[1].value === '')
      setMessage('Both players need to input a name')
    else {
      console.log(e.target[0].value)
      console.log(e.target[1].value)
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
  // debated using views and/or components but it's pretty simple right?
  // famous last words.
  // anyway --
  // if game isn't ready, render start screen and collect info
  if (!game.isStarted)
    return (
    <div className="App">
      <div><h1>Hello, and welcome to Tic Tac Toe</h1></div>
      <div><h2>The game requires two players.</h2></div>

      <form className="player-form" onSubmit={submitForm}>
        <div className="player-container">
          <div className="name-input">
            <div>Player 1:</div>
            <input placeholder='Please input your name'></input>
          </div>
          <div className="button-input">
          {playerOne.symbol ? 
            <div className="chosen-symbol">{playerOne.symbol}</div> : 
            <div className="buttons-container">
              <p>Please select your symbol:</p> 
              <div className="buttons-buttons">{symbols.map((symbol, idx) => <button type="button" onClick={setSymbol} loc={idx} player="one" key={idx}>{symbol}</button>)}</div>
            </div>}
          </div>
        </div>
        <div className="player-container">
          <div className="name-input">
            <div>Player 2:</div>
            <input placeholder='Please input your name'></input>
          </div>
          <div className="button-input">
            {playerTwo.symbol ? 
            <div className="chosen-symbol">{playerTwo.symbol}</div> : 
            <div className="buttons-container">
              <p>Please select your symbol:</p> 
              <div className="buttons-buttons">{symbols.map((symbol, idx) => <button type="button" onClick={setSymbol} loc={idx} player="two" key={idx}>{symbol}</button>)}</div>
            </div>}
          </div>
        </div>
        <button className="submit-button" type="submit">Submit</button>
        <h3 className="message">{message}</h3>
      </form>

    </div>)
  // if game is ready, render grid and play
  else if (game.isStarted && !game.showReplay)
    return (
      <div className="App">
        <div className="header-container">
          {!game.isOver ? <><div className="game-name"><p>Tic Tac Toe</p></div>
          <div className="game-status"><p>It's {game.playerTurn}'s Turn</p></div></> : 
          <div className="game-name"><h1>{game.winningPlayer} wins</h1></div>}
        </div>
        <div className="just-lines">
          <div className="grid-container">
            {Object.keys(grid).map((number, idx) => <GridSquare style='grid-square' id={number} value={grid[number]} click={clickHandle} key={idx}/>)}
          </div>
        </div>
      </div>
    )

  // if game is over, render the replay prompt after 2s, see useEffect() 
  // on game above with the setTimeout for reference
  else if (game.showReplay)
      return (
      <div className="App">
        <div className="replay-container">
          <h1>{game.winningPlayer} won the game</h1>
          <h2>Would players {playerOne.name} and {playerTwo.name} like to play again?</h2>
          <div className="buttons">
            <button onClick={resetCurrentGame}>Yes</button>
            <button onClick={resetGame}>No</button>
          </div>
        </div>
      </div>
      )
}

export default App;
