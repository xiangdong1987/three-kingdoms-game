const Enemy = ({ enemy, onEnemyDeath }) => {

    const enemyStyles = {
        position: 'fixed',
        top: '50px',
        left: '50%',
        transform: 'translateX(-50%)',
    };

    return (
        <div style={enemyStyles} key={enemy.id}>
            <h3>{enemy.name}</h3>
            <img src="https://via.placeholder.com/150" alt="Character" />
            <p>Health: {enemy.health}</p>
        </div>
    );
};

export default Enemy;