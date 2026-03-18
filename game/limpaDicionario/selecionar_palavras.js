const fs = require('fs')

const rawData = fs.readFileSync('preprocessamentos\\palavras_lingua_pt.txt', 'utf-8');

const linhas = rawData.split('\n');

const palavrasValidas = new Set();

linhas.forEach(linha => {
    partes = linha.split(',');

    palavra = partes[0].trim().toUpperCase();
    icf = partes[1]

    palavra = palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if(palavra.length === 5 && icf < 14.6){
        palavrasValidas.add(palavra);
    }

});

const arrayFinal = [...palavrasValidas]
const conteudoExport = `// Arquivo gerado automaticamente
export const dicionarioPermitido = new Set(${JSON.stringify(arrayFinal)}); `;

fs.writeFileSync('dicionario_5letras.js', conteudoExport);

// São 3774 palavras, acredito que baste senão é fácil procurar na internte um repo mais completo
console.log(`Foram filtradas e salvas ${arrayFinal.length} palavras únicas no arquivo 'dicionario.js'.`);
