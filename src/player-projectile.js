import { canvas, nextFrameActions } from './main.js';
import { Projectile } from './projectile.js';

export class PlayerProjectile extends Projectile {
  radius = 3;

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
