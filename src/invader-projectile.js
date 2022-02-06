import { canvas, canvasElement, nextFrameActions } from './main.js';
import { Projectile } from './projectile.js';

export class InvaderProjectile extends Projectile {
  width = 3;
  height = 10;

  draw() {
    canvas.fillStyle = 'white';
    canvas.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.updatePosition();

    if (this.position.y + this.height > canvasElement.height) {
      nextFrameActions.push(() => this.destroyProjectile());
      return;
    }

    this.draw();
  }
}
