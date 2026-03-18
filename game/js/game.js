import {dicionarioPermitido} from '../data/dicionario_5letras.js';
import { gameState } from './state.js';

const wordsList = Array.from(dicionarioPermitido)

let previousWord = null;

export function validateWord(newWord){
    const finalWord = gameState.finalWord;

    if(previousWord == undefined){
        previousWord = gameState.initialWord;
    }

    if(newWord.length !== finalWord.length){ 
        return {isValid: false, 
                gameWin: false,
                message: 'A palavra ainda não está completa'}
    }

    if (!dicionarioPermitido.has(newWord)) {
        return {isValid: false, 
                gameWin: false,
                message: 'A palavra não é válida'}
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
