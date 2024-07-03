const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let gameState = {
  currentPlayer: 1,
  playerPositions: { 1: 0, 2: 0 },
  winner: null,
};

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

app.get('/api/reset-game', (req, res) => {
  gameState = {
    currentPlayer: 1,
    playerPositions: { 1: 0, 2: 0 },
    winner: null,
  };
  res.json(gameState);
});

app.post('/api/roll-dice', (req, res) => {
  const diceValue = Math.floor(Math.random() * 6) + 1;
  const currentPlayer = gameState.currentPlayer;
  const currentPosition = gameState.playerPositions[currentPlayer];
  let newPosition = currentPosition + diceValue;

  if (snakesAndLadders[newPosition]) {
    newPosition = snakesAndLadders[newPosition];
  }

  gameState.playerPositions[currentPlayer] = newPosition;

  if (newPosition >= 100) {
    gameState.winner = currentPlayer;
  } else {
    gameState.currentPlayer = currentPlayer === 1 ? 2 : 1;
  }

  res.json({ ...gameState, lastRoll: diceValue });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
