import React from 'react';

const AttackButton = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="attack-button">
      {children}
    </button>
  );
};

export default AttackButton;
