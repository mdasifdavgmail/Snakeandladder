import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Board from './Bord';  
import './App.css';

const App = () => {
  const [gameState, setGameState] = useState(null);
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');
  const [playerColors, setPlayerColors] = useState({ 1: 'red', 2: 'blue' });
  const [lastDiceRoll, setLastDiceRoll] = useState(null);

  const snakesAndLadders = {
    16: 6,
    47: 26,
    49: 11,
    56: 84,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    98: 78,
    1: 38,
    4: 14,
    9: 31,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    80: 100,
  };

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    axios.get('http://localhost:5000/api/reset-game')
      .then(response => {
        setGameState(response.data);
        setLastDiceRoll(null); 
      })
      .catch(error => {
        console.error('Error resetting game:', error);
      });
  };

  const rollDice = () => {
    axios.post('http://localhost:5000/api/roll-dice')
      .then(response => {
        setGameState(response.data);
        setLastDiceRoll(response.data.lastRoll); 
      })
      .catch(error => {
        console.error('Error rolling dice:', error);
      });
  };

  const handlePlayer1NameChange = (event) => setPlayer1Name(event.target.value);
  const handlePlayer2NameChange = (event) => setPlayer2Name(event.target.value);
  const handlePlayer1ColorChange = (event) => setPlayerColors({ ...playerColors, 1: event.target.value });
  const handlePlayer2ColorChange = (event) => setPlayerColors({ ...playerColors, 2: event.target.value });

  const winnerName = gameState?.winner === 1 ? player1Name : gameState?.winner === 2 ? player2Name : '';

  return (
    <div className="app">
      <div className="header">
        <h1>Snake and Ladder Game</h1>
        {winnerName && <h2 className="winner-message">{`${winnerName} Wins! 🎉`}</h2>}
      </div>
      <div className="player-inputs">
        <div className="player-input">
          <input
            type="text"
            value={player1Name}
            onChange={handlePlayer1NameChange}
            placeholder="Enter Player 1's Name"
          />
          <input
            type="color"
            value={playerColors[1]}
            onChange={handlePlayer1ColorChange}
          />
        </div>
        <div className="player-input">
          <input
            type="text"
            value={player2Name}
            onChange={handlePlayer2NameChange}
            placeholder="Enter Player 2's Name"
          />
          <input
            type="color"
            value={playerColors[2]}
            onChange={handlePlayer2ColorChange}
          />
        </div>
      </div>
      {gameState && (
        <Board 
          playerPositions={gameState.playerPositions} 
          playerColors={playerColors} 
          snakesAndLadders={snakesAndLadders} 
        />
      )}
      <div className="button-container">
        <button onClick={rollDice} disabled={gameState?.winner} className="roll-button">
          {lastDiceRoll !== null ? `Rolled: ${lastDiceRoll}` : 'Roll Dice'}
        </button>
        <button onClick={resetGame} className="reset-button">
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default App;
