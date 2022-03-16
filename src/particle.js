import { canvas } from './main.js';

export class Particle {
  position = { x: undefined, y: undefined };
  velocity = { x: undefined, y: undefined };
  radius = undefined;
  color = undefined;

  constructor({ position, velocity, radius, color }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.color = color;
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
    canvas.fillStyle = this.color;
    canvas.fill();
    canvas.closePath();
  }
  
  updatePosition() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  update() {
    this.updatePosition();
    this.draw();
  }
}
