import './style.css'
export { generateAPCATheme } from '../src/index.js';

const trigger = document.getElementById('generate-theme');
const section = document.querySelector('section');
const outputA = document.getElementById('output-a');
const outputB = document.getElementById('output-b');

trigger.addEventListener('click', () => {
   const [colorA, colorB] = generateAPCATheme('', { format: 'hsl'});
   outputA.textContent = colorA;
   outputB.textContent = colorB;
   section.style.setProperty('--color-1', colorA);
   section.style.setProperty('--color-2', colorB);
});