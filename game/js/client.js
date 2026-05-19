export async function getChallengeFromServer(){
    const response = await fetch('http://localhost:3000/api/desafio-diario')
    const challenge = await response.json()
    return challenge
}