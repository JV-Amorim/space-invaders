import { InvadersSquadron } from './invaders-squadron.js';
import { Player } from './player.js';

export const canvasElement = document.getElementById('canvas');
export const canvas = canvasElement.getContext('2d');

canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight;

export const player = new Player();
export const projectiles = [];
export const invadersSquadrons = [new InvadersSquadron()];

window.addEventListener('keyup', ({ key }) => player.handleKeyPressEvent(key, 'up'));
window.addEventListener('keydown', ({ key }) => player.handleKeyPressEvent(key, 'down'));

function animate() {
  window.requestAnimationFrame(animate);

  canvas.fillStyle = 'black';
  canvas.fillRect(0, 0, canvasElement.width, canvasElement.height);

  player.update();

  projectiles.forEach((projectile, index) => {
    projectile.indexInTheProjectilesArray = index;
    projectile.update();
  });

  invadersSquadrons.forEach(invadersSquadron => invadersSquadron.update());
}

animate();
