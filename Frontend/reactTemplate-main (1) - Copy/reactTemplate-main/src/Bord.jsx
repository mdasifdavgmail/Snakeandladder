import React from 'react';
import Snake from './Snake';
import Ladder from './Ladder';
import './Board.css';

const Board = ({ playerPositions, playerColors, snakesAndLadders }) => {
  const renderSquare = (i) => {
    const isPlayer1 = playerPositions[1] === i;
    const isPlayer2 = playerPositions[2] === i;
    const cellClass = `cell ${isPlayer1 ? 'player1' : ''} ${isPlayer2 ? 'player2' : ''}`;
    const player1Color = playerColors[1];
    const player2Color = playerColors[2];
    const destination = snakesAndLadders[i];
    const isSnake = destination < i;
    const isLadder = destination > i;

    return (
      <div
        key={i}
        className={cellClass}
        style={{ backgroundColor: isPlayer1 ? player1Color : isPlayer2 ? player2Color : '' }}
      >
        {i + 1}
        {isSnake && <Snake start={i} end={destination} />}
        {isLadder && <Ladder start={i} end={destination} />}
      </div>
    );
  };

  const squares = Array.from({ length: 100 }, (_, i) => i).reverse();

  return (
    <div className="board">
      {squares.map(renderSquare)}
    </div>
  );
};

export default Board;
