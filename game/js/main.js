/*

Fará o import dos outros serviços e gerenciará qual usar

*/

import {setupInputRow, createNewAttemptRow, updateFixedWord} from './ui.js';
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
    const {word, parentRow} = e.detail;

    console.log(`Passo word = ${word} na main`)
    const result = validateWord(word)

    if(result.gameWin){
        console.log("UAU")
    }   
    else if (result.isValid){
        const board = document.querySelector('.game-board');
        createNewAttemptRow(board, gameState.wordLength)
    }
    else if (!result.isValid){
        console.log(result.message)
    }

});
