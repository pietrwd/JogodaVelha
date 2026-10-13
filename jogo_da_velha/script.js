const TOTAL = 5;
const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const X_SVG = '<svg viewBox="0 0 100 100" class="mark x"><path pathLength="100" d="M24 24L76 76"/><path pathLength="100" d="M76 24L24 76"/></svg>';
const O_SVG = '<svg viewBox="0 0 100 100" class="mark o"><circle pathLength="100" cx="50" cy="50" r="29"/></svg>';

const $ = (s) => document.querySelector(s);
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const boardEl = $('#board');
const statusEl = $('#status');
const nextBtn = $('#next');
const cellEls = [];

let names = { X: '', O: '' };
let points = { X: 0, O: 0 };
let history = []; // vencedor de cada rodada: 'X', 'O' ou null (empate)
let round = 1;
let cells, turn, over, msg;

const tag = (p) => `<b class="${p.toLowerCase()}">${esc(names[p])}</b>`;

function show(screen) {
  ['setup', 'game', 'final'].forEach((s) => { $('#screen-' + s).hidden = s !== screen; });
}

// Monta o tabuleiro uma única vez
for (let i = 0; i < 9; i++) {
  const btn = document.createElement('button');
  btn.className = 'cell';
  btn.addEventListener('click', () => play(i));
  boardEl.append(btn);
  cellEls.push(btn);
}

/* ---------- Tela 1: nomes ---------- */
$('#setup').addEventListener('submit', (e) => {
  e.preventDefault();
  const x = $('#name-x').value.trim();
  const o = $('#name-o').value.trim();
  const err = $('#error');
  if (!x || !o) { err.textContent = 'Digite o nome dos dois jogadores.'; return; }
  if (x.toLowerCase() === o.toLowerCase()) { err.textContent = 'Os nomes precisam ser diferentes.'; return; }
  err.textContent = '';
  names = { X: x, O: o };
  startMatch();
});

/* ---------- Partida ---------- */
function startMatch() {
  points = { X: 0, O: 0 };
  history = [];
  round = 1;
  show('game');
  startRound();
}

function startRound() {
  cells = Array(9).fill('');
  over = false;
  msg = '';
  turn = round % 2 === 1 ? 'X' : 'O'; // quem começa alterna a cada rodada
  cellEls.forEach((el, i) => {
    el.innerHTML = '';
    el.disabled = false;
    el.classList.remove('win');
    el.setAttribute('aria-label', `Casa ${i + 1}, vazia`);
  });
  nextBtn.hidden = true;
  render();
}

function winner(b) {
  for (const [a, c, d] of LINES) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return { p: b[a], line: [a, c, d] };
  }
  return null;
}

function play(i) {
  if (over || cells[i]) return;
  cells[i] = turn;
  cellEls[i].innerHTML = turn === 'X' ? X_SVG : O_SVG;
  cellEls[i].disabled = true;
  cellEls[i].setAttribute('aria-label', `Casa ${i + 1}, ${turn}`);

  const w = winner(cells);
  if (w) {
    over = true;
    w.line.forEach((k) => cellEls[k].classList.add('win'));
    points[turn]++;
    history.push(turn);
    msg = `${tag(turn)} venceu a rodada ${round}!`;
  } else if (cells.every(Boolean)) {
    over = true;
    history.push(null);
    msg = `Rodada ${round} empatada.`;
  } else {
    turn = turn === 'X' ? 'O' : 'X';
  }

  if (over) {
    nextBtn.textContent = round === TOTAL ? 'Ver resultado final' : 'Próxima rodada';
    nextBtn.hidden = false;
    nextBtn.focus();
  }
  render();
}

function render() {
  $('#round-label').textContent = `Rodada ${round} de ${TOTAL}`;
  $('#dots').innerHTML = Array.from({ length: TOTAL }, (_, i) => {
    let cls = 'dot';
    if (i < history.length) cls += history[i] ? ' ' + history[i].toLowerCase() : ' d';
    else if (i === round - 1) cls += ' cur';
    return `<span class="${cls}"></span>`;
  }).join('');

  $('#pname-x').textContent = `${names.X} (X)`;
  $('#pname-o').textContent = `${names.O} (O)`;
  $('#px').textContent = points.X;
  $('#po').textContent = points.O;
  $('#score-x').classList.toggle('on', !over && turn === 'X');
  $('#score-o').classList.toggle('on', !over && turn === 'O');
  statusEl.innerHTML = over ? msg : `Vez de ${tag(turn)}`;
}

nextBtn.addEventListener('click', () => {
  if (round === TOTAL) { showFinal(); return; }
  round++;
  startRound();
});

/* ---------- Resultado final ---------- */
function showFinal() {
  let verdict = 'Empate geral!';
  if (points.X > points.O) verdict = `🏆 ${tag('X')} venceu a partida!`;
  else if (points.O > points.X) verdict = `🏆 ${tag('O')} venceu a partida!`;
  $('#verdict').innerHTML = verdict;

  $('#fname-x').textContent = `${names.X} (X)`;
  $('#fname-o').textContent = `${names.O} (O)`;
  $('#fx').textContent = points.X;
  $('#fo').textContent = points.O;

  $('#rounds-list').innerHTML = history.map((h, i) =>
    `<li><span>Rodada ${i + 1}</span>${h ? tag(h) : '<em>Empate</em>'}</li>`
  ).join('');

  const draws = history.filter((h) => h === null).length;
  $('#draws').textContent = draws === 0 ? 'Nenhum empate na partida.' : `${draws} ${draws === 1 ? 'rodada empatada' : 'rodadas empatadas'}.`;
  show('final');
}

$('#again').addEventListener('click', startMatch);
$('#change').addEventListener('click', () => { show('setup'); $('#name-x').focus(); });

show('setup');
$('#name-x').focus();
