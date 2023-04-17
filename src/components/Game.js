import React, { useState, useEffect } from 'react';
import AttackButton from './AttackButton';
import { v4 as uuid } from "uuid";
import Character from "./Character";
import Enemy from "./Enemy";

function Game() {
    const [player, setPlayer] = useState({ id: uuid(), name: 'Player', health: 100, attack: 10 });
    const [currentEnemies, setEnemies] = useState([]);
    const [gameOver,setGameOver] = useState(false);
    useEffect(() => {
        const addEnemy = () => {
            if (currentEnemies.length === 0) {
                const newEnemy = {
                    id: uuid(),
                    name: 'Enemy Name',
                    health: 100,
                    attack: 10
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
    const onEnemyDeath = (updatedEnemy) => {
        if (updatedEnemy.health <= 0) {
            setEnemies((currentEnemies) => currentEnemies.filter((e) => e.id !== updatedEnemy.id));
        }
        console.log(updatedEnemy)
        setEnemies(enemies =>
            enemies.map(en =>
                en.id === updatedEnemy.id ? updatedEnemy : en
            )
        );
    }
    const handleAttack = (player, enemy) => {
        const updatedEnemy = {
            ...enemy,
            id: enemy.id,
            health: enemy.health - player.attack
        };
        setPlayer((player) => ({ ...player, health: player.health - enemy.attack }));
        if (player.health <= 0) {
            onGameOver();
            return;
        }
        onEnemyDeath(updatedEnemy)
    };
    const onGameOver = () => {
        setGameOver(true);
    };
    return (
        <div>
            <h1>Three Kingdoms Battle</h1>
            <div className="game-board">
                {currentEnemies.map((enemy) => (
                    <Enemy key={enemy.id} enemy={enemy} onEnemyDeath={onEnemyDeath} ></Enemy>
                ))}
                {currentEnemies.map((enemy) => (
                    <AttackButton key={enemy.id} enemy={enemy} player={player} onAttack={handleAttack}></AttackButton>
                ))}
                <div>
                    <Character key={player.id} player={player}></Character>

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
}

export default Game;
