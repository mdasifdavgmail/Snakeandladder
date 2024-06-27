import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Board from './Bord';
import './App.css';

const App = () => {
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    axios.get('http://localhost:5000/api/reset-game')
      .then(response => {
        setGameState(response.data);
      })
      .catch(error => {
        console.error('Error resetting game:', error);
      });
  };

  const rollDice = () => {
    axios.post('http://localhost:5000/api/roll-dice')
      .then(response => {
        setGameState(response.data);
      })
      .catch(error => {
        console.error('Error rolling dice:', error);
      });
  };

  if (!gameState) return <div>Loading...</div>;

  return (
    <div className="app">
      <h1>Snake and Ladder Game</h1>
      <Board playerPositions={gameState.playerPositions} />
      <button onClick={rollDice} disabled={gameState.winner}>
        Roll Dice
      </button>
      <button onClick={resetGame}>
        Reset Game
      </button>
      {gameState.winner && <h2>{`Player ${gameState.winner} wins!`}</h2>}
    </div>
  );
};

export default App;
