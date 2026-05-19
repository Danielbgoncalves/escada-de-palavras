# Escada de Palavras

Um jogo educacional e divertido para explorar transformação de palavras letra-a-letra.
Este projeto fornece uma versão web simples do clássico "Word Ladder" (Escada de Palavras),
com dicionários em Português e um algoritmo de busca para encontrar caminhos entre palavras.

Principais características
- Interface minimalista em HTML/CSS/JS pronta para abrir no navegador.
- Dicionários separados para palavras de 4 e 5 letras (em `data/`).
- Busca por largura (BFS) para encontrar caminhos mínimos entre duas palavras.
- Código organizado para facilitar experimentos e ensino.

Como executar
- Abra `game/index.html` diretamente no navegador para testar localmente.
- Para evitar restrições de CORS ao carregar arquivos locais, rode um servidor simples:

	- Com Node.js: `npx http-server game`
	- Com Python 3: `python -m http.server --directory game 8000`

Estrutura do projeto
- `game/` — aplicação web (HTML, CSS, JS).
- `game/js/` — lógica do jogo, incluindo `bfs.js`, `game.js` e `ui.js`.
- `game/data/` — dicionários: `dicionario_4letras.js`, `dicionario_5letras.js`.
- `limpaDicionario/` — ferramentas usadas para gerar os dicionários a partir de listas brutas.

Como contribuir
- Envie pull requests com correções ou melhorias.
- Sugestões de palavras, otimizações de busca ou interface são bem-vindas.

Notas para desenvolvedores
- `bfs.js` contém a implementação da busca por largura; é um bom ponto de partida
	para testar variações de heurísticas e estruturas de dados.
- Os dicionários são arquivos JS com arrays de palavras — para recriá-los, veja
	`limpaDicionario/selecionar_palavras.js` e `limpaDicionario/palavras_lingua_pt.txt`.

Licença
- Projeto livre para uso educacional. Sinta-se livre para reaproveitar e adaptar.

Divirta-se escalando palavras!

