export async function getChallengeFromServer() {
    const response = await fetch('https://escada-de-palavras-backend.onrender.com/api/desafio-diario')
    const challenge = await response.json()
    console.log("o desafio recebido é: ", challenge)
    return challenge
}

export async function sendMetricsToDB(score, gameState) {
    const dadosPartida = { //attempts, restarts, spentTime, challengeID
        score: score,
        attempts: gameState.attempts,
        restarts: gameState.restarts,
        spentTime: gameState.spentTime,
        challengeID: gameState.challengeID
    }

    try {
        const response = await fetch('https://escada-de-palavras-backend.onrender.com/api/enviar-jogo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosPartida)
        })

        const resultado = await response.json()

        if (resultado.sucesso) {
            console.log(resultado.mensagem)
        }

    } catch (error) {
        console.error('Falha ao enviar métricas', error)
    }
}
