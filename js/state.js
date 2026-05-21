export const gameState = {
    initialWord: "",
    finalWord: "",
    userPath: [],
    solutionPath: [],

    idealDistance: 0.0,
    isGameOver: false,

    get wordLength(){
        return this.initialWord.length;
    },

    // progresso do jogador
    attempts: 1,
    restarts: 1,
    startTime: null,
    spentTime: 0.0,


    registerAttempt(att){
        const word = att.word;
        const isValid = att.isValid;

        if(isValid) this.userPath.push(word);

        this.attempts++;
    },

    get pathLength(){
        return this.userPath.length;
    }

}

export function setChallenge(challenge){
    gameState.initialWord = challenge.initialWord;
    gameState.finalWord = challenge.finalWord;
    gameState.solutionPath = challenge.solutionPath;
    gameState.idealDistance = challenge.idealDistance;
    gameState.challengeID = challenge.challengeID;
    gameState.attempts = 0;
    gameState.startTime = Date.now()
}