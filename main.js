const canvasElement = document.getElementById('canvas');
const canvas = canvasElement.getContext('2d');

canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight;

class Player {
  constructor() {
    const image = this.loadPlayerImage();
    this.setInitialPropertiesAfterImageLoaded(image);
  }

  loadPlayerImage() {
    const image = new Image();
    image.src = './assets/spaceship.png';
    return image;
  }

  setInitialPropertiesAfterImageLoaded(image) {
    image.onload = () => {
      this.setPlayerInitialSize(image);
      this.setPlayerInitialPosition();
      this.velocity = { x: 0, y: 0 };
      this.image = image;
    };
  }

  setPlayerInitialSize(image) {
    const scale = 0.15;
    this.width = image.width * scale;
    this.height = image.height * scale;
  }

  setPlayerInitialPosition() {
    this.position = {
      x: canvasElement.width / 2 - this.width / 2,
      y: canvasElement.height - this.height - 20
    };
  }

  draw() {
    if (this.image) {
      canvas.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }
  }
}

function animate() {
  window.requestAnimationFrame(animate);
  canvas.fillStyle = 'black';
  canvas.fillRect(0, 0, canvasElement.width, canvasElement.height);
  player.draw();
}

const player = new Player();

animate();
