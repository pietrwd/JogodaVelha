# 🎮 Jogo da Velha

Um jogo da velha para **dois jogadores**, desenvolvido com **HTML, CSS e JavaScript**. Os jogadores informam seus nomes antes de começar, disputam cinco rodadas e acompanham a pontuação até o resultado final.

## ✨ Funcionalidades

- Cadastro dos nomes dos dois jogadores.
- Validação para impedir nomes vazios ou iguais.
- Tabuleiro interativo de 3 × 3.
- Identificação de vitória por linhas, colunas e diagonais.
- Destaque visual da combinação vencedora.
- Alternância de quem começa a cada rodada.
- Sistema de pontuação ao longo de **5 rodadas**.
- Registro do resultado de cada rodada, incluindo empates.
- Tela de resultado final com vencedor e placar.
- Opções para jogar novamente ou trocar os jogadores.

## 🛠️ Tecnologias utilizadas

- **HTML5** — estrutura das telas e do jogo.
- **CSS3** — estilização e layout (arquivo `style.css`).
- **JavaScript** — regras, validações, turnos e pontuação.
- **Google Fonts** — fonte Bricolage Grotesque.

## 📁 Estrutura do projeto

```text
jogo-da-velha/
├── index.html
├── style.css
└── script.js
```

> O arquivo `style.css` é referenciado no HTML, mas não foi incluído entre os arquivos enviados. Adicione-o ao repositório para que o visual do jogo seja aplicado corretamente.

## ▶️ Como executar

1. Baixe ou clone este repositório.
2. Confira se `index.html`, `style.css` e `script.js` estão na mesma pasta.
3. Abra o arquivo `index.html` no navegador.
4. Informe os nomes dos dois jogadores e clique em **Iniciar jogo**.

Você também pode abrir o projeto no Visual Studio Code e executá-lo com uma extensão de servidor local, como **Live Server**.

## 🎯 Regras do jogo

1. Dois jogadores participam: Jogador 1 (X) e Jogador 2 (O).
2. Cada jogador deve ter um nome preenchido e diferente do outro.
3. Vence a rodada quem formar uma linha com três símbolos iguais na horizontal, vertical ou diagonal.
4. Se todas as casas forem preenchidas sem uma combinação vencedora, a rodada termina empatada.
5. O jogador que começa alterna a cada rodada.
6. Ao final das cinco rodadas, vence quem tiver conquistado mais rodadas. Se houver igualdade, o resultado geral é empate.

## 📌 Possíveis melhorias futuras

- Adicionar modo contra o computador.
- Salvar o histórico de partidas.
- Criar ranking de jogadores.
- Melhorar a acessibilidade e adicionar efeitos sonoros.

---

Feito para praticar lógica de programação, manipulação do DOM e desenvolvimento web com JavaScript.
