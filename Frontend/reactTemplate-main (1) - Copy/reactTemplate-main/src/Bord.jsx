import React from 'react';
import './Bord.css';

const Board = ({ playerPositions }) => {
  const renderSquare = (i) => {
    const isPlayer1 = playerPositions[1] === i;
    const isPlayer2 = playerPositions[2] === i;
    const cellClass = `cell ${isPlayer1 ? 'player1' : ''} ${isPlayer2 ? 'player2' : ''}`;
    return (
      <div key={i} className={cellClass}>
        {i + 1}
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
