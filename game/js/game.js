import {dicionarioPermitido} from '../data/dicionario_5letras.js';
import { gameState } from './state.js';
import { ERRORS } from './error_const.js';

let previousWord = null;

export function validateWord(newWord){
    const finalWord = gameState.finalWord;

    if(previousWord == undefined){
        previousWord = gameState.initialWord;
    }

    if(newWord.length !== finalWord.length){ 
        return {isValid: false, 
                gameWin: false,
                error: ERRORS.NOT_COMPLETE}
    }

    if (!dicionarioPermitido.has(newWord)) {
        return {isValid: false, 
                gameWin: false,
                error: ERRORS.INVALID_WORD}
    }

    let differences = countDiff(newWord, previousWord);
    
    if(differences !== 1){
        return {isValid: false, 
                gameWin: false,
                message: 'Você deve mudar exatamente uma letra por vez'}
    }

    previousWord = newWord;

    if (newWord === finalWord)
        return {isValid: true, 
                gameWin: true};
    else
        return {isValid: true, 
                gameWin: false};
}

function countDiff(newWord, previousWord){
    let differences = 0;

    for (let i=0; i < newWord.length; i++)
        if (previousWord[i] !== newWord[i]) differences++;
        

    return differences
}

export function calculateScore(){
    const base = 100;
    
    const idealDistance = gameState.idealDistance;

    const extraAttempts = gameState.attempts - idealDistance;
    const extraPathLength = gameState.pathLength - idealDistance;
    const timeEndGame = Date.now();


    const penaltyAttemps =  extraAttempts * 2;
    const penaltyInefficiency = extraPathLength * 2;
    const penaltyRestarts = gameState.restarts * 15;
    const penaltyTime = penaltyTimes(gameState.startTime, timeEndGame);

    return base - penaltyAttemps - penaltyInefficiency - penaltyRestarts - penaltyTime;
}


function penaltyTimes(start, end){
    const gapInSec = (start - end) * 1000;
    let penalty = 0;

    if(gapInSec < 40){
        penalty = 0;
    } else if (gapInSec < 80){
        penalty = 10;
    } else if (gapInSec < 160){
        penalty = 20;
    } else {
        penalty = 30;
    }

    return penalty;
}