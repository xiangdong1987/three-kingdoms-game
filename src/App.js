import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Character from "./components/Character";
import Enemy from "./components/Enemy";

const App = () => {
  const [playerHealth] = useState(100);
  const [items] = useState([]);
  const [gameOver] = useState(false);
  const [name] = useState("play")
  const [currentEnemies, setEnemies] = useState([]);

  const onEnemyDeath = (id) => {
    setEnemies((currentEnemies) => currentEnemies.filter((e) => e.id !== id));
  }

  useEffect(() => {
    const addEnemy = () => {
      if (currentEnemies.length === 0) {
        const newEnemy = {
          id: uuid(),
          name: 'Enemy Name',
          health: 100,
        };
        setEnemies([...currentEnemies, newEnemy]);
      }
    };
    const interval = setInterval(() => {
      if (Math.random() < 0.5) {
        addEnemy();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [currentEnemies]);
  return (
    <div className="app">
      <h1>Three Kingdoms Battle</h1>
      <div className="game-board">
        {currentEnemies.map((enemy) => (
          <Enemy id={enemy.id} health={enemy.health} name={enemy.name} onEnemyDeath={onEnemyDeath} ></Enemy>
        ))}
        <Character name={name} items={items} health={playerHealth}></Character>
      </div>
      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <button onClick={() => window.location.reload()}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default App;