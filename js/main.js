/*

Fará o import dos outros serviços e gerenciará qual usar

*/

import { setupInputRow, createNewAttemptRow, updateFixedWord, handleVisualError, handleVisualVictory } from './ui.js';
import { validateWord, calculateScore } from './game.js';
import { getChallengeFromServer, sendMetricsToDB } from './client.js';
import { gameState, setChallenge } from './state.js';

document.addEventListener('DOMContentLoaded', async () => {

    try {
        const challenge = await getChallengeFromServer();

        setChallenge(challenge);
        console.log(challenge)

        updateFixedWord('.start-word', challenge.initialWord);
        updateFixedWord('.target-word', challenge.finalWord);

        const board = document.querySelector('.game-board');
        createNewAttemptRow(board, gameState.wordLength);

        const firstRow = document.querySelector('.attempt-row');
        if (firstRow) setupInputRow(firstRow);

    } catch (error){
        console.error("Erro ao buscar o desafio do dia:", error)
        alert("Não foi possível carregar o desfio de hoje. Tente novamente mais tarde.")
    }
    
})

document.addEventListener('attemptSubmitted', async e => {
    if (gameState.isGameOver) return;

    const { word, parentRow } = e.detail;

    const result = validateWord(word);
    const isValid = result.isValid;


    gameState.registerAttempt({ word, isValid });

    if (!isValid) {
        handleVisualError(result.error, parentRow)
        return;
    }

    if (result.gameWin) {
        gameState.isGameOver = true;

        const inputs = parentRow.querySelectorAll('.letter-input');
        inputs.forEach(input => input.disabled = true);

        handleVisualVictory(parentRow);

        const score = calculateScore();

        const sucess = await sendMetricsToDB(score, gameState);

        console.log(score);

        return;
    }

    if (isValid) {

        const inputs = parentRow.querySelectorAll('.letter-input');
        inputs.forEach(input => input.disabled = true);

        const board = document.querySelector('.game-board');
        createNewAttemptRow(board, gameState.wordLength);
    }


});
