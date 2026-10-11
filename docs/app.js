/* global localStorage */
'use strict';
const $ = id => document.getElementById(id);
const next = window.cyclicNext.cyclicNext;
let format = 'esm';
let timer;
let trail = [4];
let toastTimer;
const recipes = {
  carousel: { label: 'A carousel that never runs out of slides.', code: "import cyclicNext from 'cyclic-next';\n\nconst slides = ['mountains', 'ocean', 'city'];\nlet index = 0;\n\nfunction nextSlide() {\n  index = cyclicNext(slides.length, index);\n  return slides[index];\n}\n\nnextSlide(); // 'ocean'\nnextSlide(); // 'city'\nnextSlide(); // 'mountains'" },
  week: { label: 'One more day, all the way around.', code: "import cyclicNext from 'cyclic-next';\n\nconst days = ['Mon', 'Tue', 'Wed', 'Thu',\n              'Fri', 'Sat', 'Sun'];\nconst today = 6; // Sunday\nconst tomorrow = cyclicNext(days.length, today);\n\ndays[tomorrow]; // 'Mon'\n\n// Jump three days from Friday.\ndays[cyclicNext(days.length, 4, 3)]; // 'Mon'" },
  turns: { label: 'Everyone gets a turn. Then it starts again.', code: "const cyclicNext = require('cyclic-next');\n\nconst players = ['Ada', 'Lin', 'Sam'];\nlet turn = 0;\n\nfunction nextPlayer() {\n  turn = cyclicNext(players.length, turn);\n  return players[turn];\n}\n\nnextPlayer(); // 'Lin'\nnextPlayer(); // 'Sam'\nnextPlayer(); // 'Ada'" },
};
function state() {
  const max = Number($('max').value);
  const curr = Number($('curr').value);
  const inc = Number($('inc').value);
  const valid = ['max', 'curr', 'inc'].every(id => $(id).value.trim() !== '') && Number.isInteger(max) && max >= 1 && max <= 24 && Number.isFinite(curr) && Number.isFinite(inc);
  return { max, curr, inc, valid };
}
function showToast(message) {
  clearTimeout(toastTimer);
  $('toast').textContent = message;
  $('toast').hidden = false;
  toastTimer = setTimeout(() => { $('toast').hidden = true; }, 2200);
}
async function copy(text) {
  try { await navigator.clipboard.writeText(text); showToast('Copied to clipboard'); }
  catch { showToast('Copy is unavailable here. Select the code to copy it.'); }
}
function snippet(max, curr, inc, result) {
  const call = `cyclicNext(${max}, ${curr}, ${inc}); // ${result}`;
  if (format === 'cjs') return `const cyclicNext = require('cyclic-next');\n// Named imports work too: const { cyclicNext } = require('cyclic-next');\n\n${call}`;
  if (format === 'browser') return `<script src="https://cdn.jsdelivr.net/npm/cyclic-next@{{VERSION}}/dist/cyclic-next.umd.js"><\/script>\n<script>\n  const { cyclicNext } = window.cyclicNext;\n  ${call}\n<\/script>`;
  return `import cyclicNext from 'cyclic-next';\n// Named imports work too: import { cyclicNext } from 'cyclic-next';\n\n${call}`;
}
function stop() {
  clearInterval(timer); timer = undefined;
  $('play').setAttribute('aria-pressed', 'false');
  $('play').textContent = 'Auto play ▷';
}
function render() {
  const { max, curr, inc, valid } = state();
  $('input-error').hidden = valid;
  $('input-error').textContent = valid ? '' : 'Use a whole cycle size from 1 to 24 and finite numbers for index and step.';
  for (const id of ['advance', 'play']) $(id).disabled = !valid;
  if (!valid) { stop(); $('result').textContent = '—'; $('result-caption').textContent = 'check your parameters'; $('nodes').replaceChildren(); $('snippet').textContent = '// Enter valid parameters to explore the cycle.'; return; }
  const result = next(max, curr, inc);
  const shown = Object.is(result, -0) ? '-0' : String(result);
  $('result').textContent = shown;
  $('result').style.fontSize = shown.length > 4 ? '35px' : '65px';
  $('result-caption').textContent = result === 0 ? 'back to the beginning ↻' : result < 0 || !Number.isInteger(result) ? 'the JavaScript remainder' : `from ${curr}, move ${inc > 0 ? '+' : ''}${inc}`;
  $('cycle-label').textContent = `${max} position${max === 1 ? '' : 's'}`;
  $('remainder-note').hidden = result >= 0;
  $('snippet').textContent = snippet(max, curr, inc, shown).replace('{{VERSION}}', document.querySelector('.version').textContent.slice(1));
  $('trail').textContent = trail.join(' → ');
  const elements = [];
  for (let i = 0; i < max; i++) {
    const angle = (i / max) * Math.PI * 2 - Math.PI / 2;
    const x = 170 + 112 * Math.cos(angle), y = 150 + 112 * Math.sin(angle);
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', `cycle-node${i === curr ? ' current' : ''}${i === result ? ' next' : ''}`);
    g.setAttribute('role', 'button'); g.setAttribute('tabindex', '0');
    g.setAttribute('aria-label', `Set current index to ${i}${i === curr ? ', current' : ''}${i === result ? ', next' : ''}`);
    g.setAttribute('transform', `translate(${x} ${y})`);
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); circle.setAttribute('r', max > 14 ? '11' : '18');
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text'); text.textContent = i; if (max > 14) text.style.fontSize = '10px';
    g.append(circle, text);
    const select = () => { stop(); $('curr').value = i; trail = [i]; render(); $('nodes').children[i].focus(); };
    g.addEventListener('click', select);
    g.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(); } });
    elements.push(g);
  }
  $('nodes').replaceChildren(...elements);
}
function advance() {
  const { max, curr, inc, valid } = state();
  if (!valid) return;
  const result = next(max, curr, inc);
  $('curr').value = result;
  trail = [...trail, Object.is(result, -0) ? '-0' : result].slice(-9);
  render();
}
$('parameters').addEventListener('submit', event => { event.preventDefault(); advance(); });
$('parameters').addEventListener('input', () => { stop(); trail = [Number($('curr').value)]; render(); });
$('advance').addEventListener('click', advance);
$('play').addEventListener('click', () => { if (timer) { stop(); return; } timer = setInterval(advance, 950); $('play').setAttribute('aria-pressed', 'true'); $('play').textContent = 'Pause Ⅱ'; });
$('reset').addEventListener('click', () => { stop(); $('max').value = 5; $('curr').value = 4; $('inc').value = 1; trail = [4]; render(); });
document.querySelectorAll('[data-preset]').forEach(button => button.addEventListener('click', () => {
  stop(); const preset = { carousel: [5, 4, 1], week: [7, 6, 1], skip: [8, 6, 3] }[button.dataset.preset];
  ['max', 'curr', 'inc'].forEach((id, i) => { $(id).value = preset[i]; }); trail = [preset[1]]; render();
}));
function tabs(selector, activate) {
  const buttons = [...document.querySelectorAll(selector)];
  for (const button of buttons) {
    button.addEventListener('click', () => {
      buttons.forEach(item => { item.setAttribute('aria-selected', String(item === button)); item.tabIndex = item === button ? 0 : -1; }); activate(button);
    });
    button.addEventListener('keydown', event => {
      const i = buttons.indexOf(button); let target;
      if (['ArrowRight', 'ArrowDown'].includes(event.key)) target = buttons[(i + 1) % buttons.length];
      if (['ArrowLeft', 'ArrowUp'].includes(event.key)) target = buttons[(i + buttons.length - 1) % buttons.length];
      if (event.key === 'Home') target = buttons[0]; if (event.key === 'End') target = buttons[buttons.length - 1];
      if (target) { event.preventDefault(); target.click(); target.focus(); }
    });
  }
}
tabs('[data-format]', button => { format = button.dataset.format; $('code').setAttribute('aria-labelledby', button.id); render(); });
function recipe(button) { const data = recipes[button.dataset.recipe]; $('recipe-label').textContent = data.label; $('recipe-snippet').textContent = data.code; $('recipe-content').setAttribute('aria-labelledby', button.id); }
tabs('[data-recipe]', recipe);
recipe($('recipe-carousel'));
$('install').addEventListener('click', () => copy('npm install cyclic-next'));
$('copy-code').addEventListener('click', () => copy($('snippet').textContent));
function theme(dark) { document.body.classList.toggle('dark', dark); $('theme').setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme'); }
try { theme(localStorage.getItem('cyclic-next-theme') === 'dark'); } catch { /* Storage is optional. */ }
$('theme').addEventListener('click', () => { const dark = !document.body.classList.contains('dark'); theme(dark); try { localStorage.setItem('cyclic-next-theme', dark ? 'dark' : 'light'); } catch { /* Storage is optional. */ } });
document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
render();
