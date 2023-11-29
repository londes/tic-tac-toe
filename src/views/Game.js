import React from 'react'
import GridSquare from '../components/GridSquare'

export default function Game({game, playerOne, playerTwo, grid, click}) {
  return (
    <div className="App">
        <div className="header-container">
        {!game.isOver ? <><div className="game-name"><p>Tic Tac Toe</p></div>
        <div className="game-status"><p>{game.playerTurn}'s turn</p><p>{game.playerTurn === playerOne.name ? playerOne.symbol : playerTwo.symbol}</p></div></> : 
        <div className="game-name-over"><h1>{game.winningPlayer} wins</h1></div>}
        </div>
        <div className="just-lines">
        <div className="grid-container">
            {Object.keys(grid).map((number, idx) => <GridSquare style='grid-square' id={number} value={grid[number]} click={click} key={idx}/>)}
        </div>
        </div>
    </div>
  )
}
