import React, { useState } from "react";

const Enemy = ({ id, health, onEnemyDeath }) => {
    const [currentHealth, setCurrentHealth] = useState(health);

    const handleAttack = () => {
        setCurrentHealth(currentHealth - 10);
        if (currentHealth <= 0) {
            onEnemyDeath(id);
        }
    };

    return (
        <div className="enemy">
            <h3>Enemy {id}</h3>
            <p>Health: {currentHealth}</p>
            <button onClick={handleAttack}>Attack</button>
        </div>
    );
};

export default Enemy;