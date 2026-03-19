/*

Fará o import dos outros serviços e gerenciará qual usar

*/

import {setupInputRow, createNewAttemptRow, updateFixedWord, handleVisualError, handleVisualVictory} from './ui.js';
import {validateWord} from './game.js';
import {sortearDesafioValido} from './bfs.js';
import {gameState, setChallenge } from './state.js';

document.addEventListener('DOMContentLoaded', ()=> {
    const challenge = sortearDesafioValido();

    setChallenge(challenge);

    updateFixedWord('.start-word', challenge.initialWord);
    updateFixedWord('.target-word', challenge.finalWord);

    const board = document.querySelector('.game-board');
    createNewAttemptRow(board, gameState.wordLength);

    const firstRow = document.querySelector('.attempt-row');
    if(firstRow) setupInputRow(firstRow);
})

document.addEventListener('attemptSubmitted', e => {
    if(gameState.isGameOver) return;

    const {word, parentRow} = e.detail;

    const result = validateWord(word)

    if(!result.isValid){
        handleVisualError(result.error, parentRow)
        return;
    }

    if(result.gameWin){
        gameState.isGameOver = true;

        const inputs = document.querySelectorAll('.letter-inputs');
        inputs.forEach(input => input.disable=true);

        handleVisualVictory(parentRow);
        return;
    }
    
    if (result.isValid){
        const inputs = parentRow.querySelectorAll('.letter-input');
        inputs.forEach(input => input.disabled = true);

        const board = document.querySelector('.game-board');
        createNewAttemptRow(board, gameState.wordLength);
    }

});
