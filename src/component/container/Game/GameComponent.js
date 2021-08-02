import React, { useState } from 'react';
import WinnerModalComponent from './WinnerModal/WinnerModalComponent';

const GameComponent = () => {
    const [gameOver, setGameOver] = useState(false);

    const onPlayAgainHandler = () => {
        setGameOver(false);
    }

    // Update based on game logic.
    let winner = "Team One";

    return (
        <div className='gamePage'>
            <h1>
                This is the GamePage
            </h1>
            <button onClick={() => setGameOver(true)}>
                Click for game over!
            </button>
            <WinnerModalComponent gameOver={gameOver} onPlayAgainHandler={onPlayAgainHandler} winner={winner}/>
        </div>
    );
}

export default GameComponent;