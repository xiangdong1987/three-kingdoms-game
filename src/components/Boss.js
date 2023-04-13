import React from "react";

const Boss = ({ onBossDeath }) => {
  const handleAttack = () => {
    onBossDeath();
  };

  return (
    <div className="boss">
      <h3>BOSS</h3>
      <img src="https://via.placeholder.com/200" alt="Boss" />
      <button onClick={handleAttack}>Attack</button>
    </div>
  );
};

export default Boss;
