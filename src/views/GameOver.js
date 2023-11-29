import React from 'react'

export default function GameOver({game, playerOne, playerTwo, resetCurrentGame, resetGame}) {
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
