import React from 'react';

const buttonStyles = {
  position: 'fixed',
  top: '320px',
  left: '50%',
  transform: 'translateX(-50%)',
};

function AttackButton({ player, enemy, onAttack }) {
  return (
    <div style={buttonStyles}>
      <button onClick={() => onAttack(player, enemy)}>Attack</button>
    </div>
  );
}

export default AttackButton;
