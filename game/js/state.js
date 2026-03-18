export const gameState = {
    initialWord: "",
    finalWord: "",
    path: [],
    idealDistance: 0,
    attempts: 0,

    get wordLength(){
        return this.initialWord.length;
    }
}

export function setChallenge(challenge){
    gameState.initialWord = challenge.initialWord;
    gameState.finalWord = challenge.finalWord;
    gameState.path = challenge.path;
    gameState.idealDistance = challenge.idealDistance;
    gameState.attempts = 0;
}