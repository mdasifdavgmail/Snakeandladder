import React from 'react';
import './Ladder.css';

const Ladder = ({ start, end }) => (
  <div className="ladder" title={`Ladder from ${start + 1} to ${end + 1}`}>
    🪜
  </div>
);

export default Ladder;
