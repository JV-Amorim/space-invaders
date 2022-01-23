import { InvadersSquadronsSpawner } from './invaders-squadrons-spawner.js';
import { Player } from './player.js';

export const canvasElement = document.getElementById('canvas');
export const canvas = canvasElement.getContext('2d');

canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight;

export const player = new Player();
export const invadersSquadronsSpawner = new InvadersSquadronsSpawner();

window.addEventListener('keyup', ({ key }) => player.handleKeyPressEvent(key, 'up'));
window.addEventListener('keydown', ({ key }) => player.handleKeyPressEvent(key, 'down'));

function animate() {
  window.requestAnimationFrame(animate);

  canvas.fillStyle = 'black';
  canvas.fillRect(0, 0, canvasElement.width, canvasElement.height);

  player.update();
  invadersSquadronsSpawner.update();
}

animate();
