import {dicionarioPermitido} from '../data/dicionario_5letras.js';

function encontraVizinhos(palavra){
    let vizinhos = [];

    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for(let i=0; i < palavra.length; i++){
        for(let letra of letras){
            if(palavra[i] === letra) continue;

            const novaPalavra = palavra.substring(0, i) + letra + palavra.substring(i+1);

            if(dicionarioPermitido.has(novaPalavra)){
                vizinhos.push(novaPalavra);
            }
        }
    }

    return vizinhos;
}

function encontrarCaminhoCurto(palavraInicial, palavraFinal){
    if (palavraInicial === palavraFinal)
        return [palavraInicial];

    const pai = {};
    const visitados = new Set([palavraInicial]);
    const fila = [palavraInicial];

    while(fila.length > 0){
        const palavraAtual = fila.shift();

        if(palavraAtual === palavraFinal){
            const caminho = [];
            let temp = palavraFinal;
            
            while(temp){
                caminho.push(temp);
                temp = pai[temp];
            }        
            return caminho.reverse();
        }

        for(const visinho of encontraVizinhos(palavraAtual)){
            if(!visitados.has(visinho)){
                visitados.add(visinho);
                pai[visinho] = palavraAtual;
                fila.push(visinho);
            }
        }
    }
    return null;
}


// const caminho = encontrarCaminhoCurto('MUITO','SOBRE');
// console.log(caminho);


export function sortearDesafioValido(){
    let initial, final, caminho;
    const palavras = Array.from(dicionarioPermitido);
    const numPalavras = palavras.length;

    do{
        initial = palavras[Math.floor(Math.random() * numPalavras)]
        final = palavras[Math.floor(Math.random() * numPalavras)]
        caminho = encontrarCaminhoCurto(initial, final);
    }while(!caminho || caminho.length < 4 || caminho.length > 7 )
    
    const challenge = { initialWord: initial, 
                        finalWord: final,
                        path: caminho,
                        idealDistance: caminho.length -1};
    
    console.log(challenge);

    return challenge;
}


