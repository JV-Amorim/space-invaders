import { InvadersSquadronsSpawner } from './invaders-squadrons-spawner.js';
import { Player } from './player.js';

export const canvasElement = document.getElementById('canvas');
export const canvas = canvasElement.getContext('2d');

canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight;

export const player = new Player();
export const invadersSquadronsSpawner = new InvadersSquadronsSpawner();
export const particles = [];

window.addEventListener('keyup', ({ key }) => {
  player.handleKeyPressEvent(key, 'up');
});
window.addEventListener('keydown', ({ key, repeat }) => {
  if (!repeat) {
    player.handleKeyPressEvent(key, 'down');
  }
});

/** Push a callback function to this array every time that a action must be executed with a minimal
 * delay or in the next frame.
 * 
 * Example: destroying an invader after collision detected with an
 * projectile. In this example this is needed because the Invader collision happens inside a update
 * loop executed by the parent InvadersSquadron. The Invader cannot be destroyed in the exact time
 * that the collision is detected, because this would cause issues in the mentioned loop.  */
export let nextFrameActions = [];

function executeNextFrameActions() {
  for (const nextFrameAction of nextFrameActions) {
    nextFrameAction();
  }
  nextFrameActions = [];
}

function animate() {
  window.requestAnimationFrame(animate);

  canvas.fillStyle = 'black';
  canvas.fillRect(0, 0, canvasElement.width, canvasElement.height);
  
  executeNextFrameActions();

  player.update();
  invadersSquadronsSpawner.update();
  particles.forEach(particle => particle.update());
}

animate();
