import React, { useState } from "react";
import {v4 as uuid} from "uuid"; 

import AttackButton from "./components/AttackButton";

const App = () => {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [items, setItems] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const levels = [{
    id: uuid(), enemies: [{ id: uuid(), name: "Zhang Fei", damage: 10, health: 20, item: { name: "Green Dragon Crescent Blade", effect: "Increases damage by 5", }, }, { id: uuid(), name: "Guan Yu", damage: 15, health: 25, item: { name: "Green Dragon Saber", effect: "Increases damage by 7", }, },],
    boss: {
      id: uuid(),
      name: "Lu Bu",
      damage: 25,
      health: 50,
      item: {
        name: "Sky Piercer",
        effect: "Increases damage by 15",
      },
    },
  },
  {
    id: uuid(),
    enemies: [
      {
        id: uuid(),
        name: "Xu Huang",
        damage: 20,
        health: 35,
        item: {
          name: "Battle Axe",
          effect: "Increases damage by 10",
        },
      },
      {
        id: uuid(),
        name: "Zhang Liao",
        damage: 25,
        health: 40,
        item: {
          name: "Serpent Spear",
          effect: "Increases damage by 12",
        },
      },
    ],
    boss: {
      id: uuid(),
      name: "Cao Cao",
      damage: 35,
      health: 60,
      item: {
        name: "Emperor Sword",
        effect: "Increases damage by 20",
      },
    },
  },
  ];

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const currentLevel = levels[currentLevelIndex];

  const [currentEnemies, setCurrentEnemies] = useState(currentLevel.enemies);
  const [currentBoss, setCurrentBoss] = useState(currentLevel.boss);

  const handleAttack = () => {
    const totalDamage = currentEnemies.reduce((total, enemy) => {
      return total + enemy.damage;
    }, currentBoss.damage);

    setPlayerHealth(playerHealth - totalDamage);

    if (playerHealth <= 0) {
      setGameOver(true);
      return;
    }

    const newItems = currentEnemies.reduce((items, enemy) => {
      return [...items, enemy.item];
    }, [currentBoss.item]);

    setItems([...items, ...newItems]);

    const newEnemies = currentEnemies.filter((enemy) => {
      return enemy.health > 0;
    });

    if (newEnemies.length === 0) {
      handleBossDeath();
      return;
    }

    setCurrentEnemies(newEnemies);
  };

  const handleEnemyDeath = (enemy) => {
    const newItems = [...items, enemy.item];
    setItems(newItems);
    const newEnemies = currentEnemies.filter((e) => {
      return e.id !== enemy.id;
    });

    setCurrentEnemies(newEnemies);
  };

  const handleBossDeath = () => {
    setItems([...items, currentBoss.item]);

    if (currentLevelIndex < levels.length - 1) {
      setCurrentLevelIndex(currentLevelIndex + 1);
      setCurrentEnemies(levels[currentLevelIndex + 1].enemies);
      setCurrentBoss(levels[currentLevelIndex + 1].boss);
    } else {
      setGameOver(true);
    }
  };

  return (
    <div className="app">
      <h1>Three Kingdoms Battle</h1>
      <div className="game-board">
        <div className="player-status">
          <h2>Player</h2>
          <p>Health: {playerHealth}</p>
          <p>Items: {items.length}</p>
        </div>
        <div className="enemies-status">
          <h2>Enemies</h2>
          {currentEnemies.map((enemy) => (
            <div key={enemy.id}>
              <p>{enemy.name}</p>
              <p>Health: {enemy.health}</p>
              <AttackButton onClick={() => handleEnemyDeath(enemy)}>
                Attack
              </AttackButton>
            </div>
          ))}
        </div>
        <div className="boss-status">
          <h2>Boss</h2>
          <p>{currentBoss.name}</p>
          <p>Health: {currentBoss.health}</p>
          <AttackButton onClick={handleAttack}>Attack</AttackButton>
        </div>
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