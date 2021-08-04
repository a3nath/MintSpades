import React, { useState } from 'react';
import WinnerModalComponent from './WinnerModal/WinnerModalComponent';
import {executeGamePlay, dealCards} from '../../GameEngine/gameplayFunctions.js'
import './renderHand.css'
const GameComponent = () => {
    const [gameOver, setGameOver] = useState(false);
    const [deal, setGameStart] = useState(true)

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
            <div className="hand">
              <h1>Play Spades</h1>
              {deal ? <button  onClick={() => {
                  dealCards()
                  if(deal) {
                      setGameStart(false)
                    } else {
                      setGameStart(true)
                  }}}>
                Click to DeaL
               </button> :<button  onClick={() => {
                  executeGamePlay()
               }}>
                Play
               </button> }
               <div id="hand"></div>
            </div>
            <button onClick={() => setGameOver(true)}>
                Click for game over!
            </button>
            <WinnerModalComponent gameOver={gameOver} onPlayAgainHandler={onPlayAgainHandler} winner={winner}/>
        </div>
    );
}

export default GameComponent;