import { canvas } from './main.js';

export class Invader {
  width = undefined;
  height = undefined;
  image = undefined;
  position = { x: undefined, y: undefined };
  velocity = { x: 0, y: 0 };

  constructor({ position }) {
    this.position = position;
    const image = this.loadInvaderImage();
    this.setInitialPropertiesAfterImageLoaded(image);
  }

  loadInvaderImage() {
    const image = new Image();
    image.src = './assets/invader.png';
    return image;
  }

  setInitialPropertiesAfterImageLoaded(image) {
    image.onload = () => {
      this.setInitialSize(image);
      this.image = image;
    };
  }

  setInitialSize(image) {
    this.width = image.width;
    this.height = image.height;
  }

  updatePosition() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  draw() {
    canvas.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    if (!this.image) {
      return;
    }
    this.updatePosition();
    this.draw();
  }
}
