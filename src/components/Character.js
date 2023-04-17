import React from "react";

const Character = ({player }) => {
  const playerStyles = {
    position: 'fixed',
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)',
  };
  return (
    <div style={playerStyles} key={player.id} >
      <h3>{player.name}</h3>
      <img src="https://via.placeholder.com/150" alt="Character" />
      <p>Health: {player.health}</p>
    </div>
  );
};

export default Character;
