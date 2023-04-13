import React, { useState } from "react";

const Enemy = ({ id, name, health, onEnemyDeath }) => {
    const [currentHealth, setCurrentHealth] = useState(health);

    const handleAttack = () => {
        setCurrentHealth(currentHealth - 10);
        if (currentHealth <= 0) {
            onEnemyDeath(id);
        }
    };

    const enemyStyles = {
        position: 'fixed',
        top: '50px',
        left: '50%',
        transform: 'translateX(-50%)',
        // 其他样式属性
    };

    return (
        <div style={enemyStyles} >
            <h3>{name}</h3>
            <img src="https://via.placeholder.com/150" alt="Character" />
            <p>Health: {currentHealth}</p>
            <button onClick={handleAttack}>Attack</button>
        </div>
    );
};

export default Enemy;