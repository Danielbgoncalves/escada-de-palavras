export async function getChallengeFromServer(){
    const response = await fetch('https://escada-de-palavras-backend.onrender.com/api/desafio-diario')
    const challenge = await response.json()
    return challenge
}