export const gameState = {
    initialWord: "",
    finalWord: "",
    path: [],
    idealDistance: 0.0,
    isGameOver: false,

    get wordLength(){
        return this.initialWord.length;
    },

    // progresso do jogador
    attempts: 0.0,
    restarts: 0.0,
    startTime: null,

    registerAttempt(att){
        const word = att.word;
        const isValid = att.isValid;

        if(isValid) this.path.push(word);

        this.attempts++;
    },

    get pathLength(){
        return this.path.length;
    }

}

export function setChallenge(challenge){
    gameState.initialWord = challenge.initialWord;
    gameState.finalWord = challenge.finalWord;
    gameState.path = challenge.path;
    gameState.idealDistance = challenge.idealDistance;
    gameState.attempts = 0;
    gameState.startTime = Date.now()
}