import React from 'react';
import './Snake.css';

const Snake = ({ start, end }) => (
  <div className="snake" title={`Snake from ${start + 1} to ${end + 1}`}>
    🐍
  </div>
);

export default Snake;
