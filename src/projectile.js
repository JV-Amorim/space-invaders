import { canvas, nextFrameActions } from './main.js';

export class Projectile {
  position = { x: undefined, y: undefined };
  velocity = { x: undefined, y: undefined };
  radius = 3;
  destroyProjectileCallback = undefined;
  indexInTheProjectilesArray = undefined;

  constructor({ position, velocity, destroyProjectileCallback }) {
    this.position = position;
    this.velocity = velocity;
    this.destroyProjectileCallback = destroyProjectileCallback;
  }

  destroyProjectile() {
    this.destroyProjectileCallback(this.indexInTheProjectilesArray);
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
      nextFrameActions.push(() => this.destroyProjectile());
      return;
    }

    this.draw();
  }
}
