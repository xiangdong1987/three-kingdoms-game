import React from "react";

const Character = ({ name, health, items }) => {
  const playerStyles = {
    position: 'fixed',
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    // 其他样式属性
  };
  return (
    <div style={playerStyles}>
      <h3>{name}</h3>
      <img src="https://via.placeholder.com/150" alt="Character" />
      <p>Health: {health}</p>
      <p>Items: {items.length}</p>
    </div>
  );
};

export default Character;
