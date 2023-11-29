import React from 'react'

export default function GameSetup({playerOne, playerTwo, symbols, setSymbol, change, submit, message}) {  
  return (
    <div className="App">
      <div><h1>Hello, and welcome to Tic Tac Toe</h1></div>
      <div><h2>The game requires two players</h2></div>

      <form className="player-form" onSubmit={submit}>
        <div className="player-container">
          <div className="name-input">
            <div>Player 1:</div>
            <input placeholder='Please input your name' value={playerOne.name} onChange={change}></input>
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
        <h3 className={message === 'Get ready to play!' ? 'ready' : 'not-ready'}>{message}</h3>
      </form>

    </div>)
}
