import { canvas } from './main.js';

export class Projectile {
  player = undefined;
  position = { x: undefined, y: undefined };
  velocity = { x: undefined, y: undefined };
  radius = 3;
  indexInTheProjectilesArray = 0;

  constructor({ player, position, velocity }) {
    this.player = player;
    this.position = position;
    this.velocity = velocity;
  }

  destroyProjectile() {
    this.player.projectiles.splice(this.indexInTheProjectilesArray, 1);
  }

  updatePosition() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  draw() {
    canvas.beginPath();
    canvas.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2
    );
    canvas.fillStyle = 'red';
    canvas.fill();
    canvas.closePath();
  }

  update() {
    this.updatePosition();

    if (this.position.y + this.radius < 0) {
      this.destroyProjectile();
      return;
    }

    this.draw();
  }
}
