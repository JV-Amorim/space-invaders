const canvasElement = document.getElementById('canvas');
const canvas = canvasElement.getContext('2d');

canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight;

class Player {
  width = undefined;
  height = undefined;
  image = undefined;
  position = { x: undefined, y: undefined };
  velocity = { x: 0, y: 0 };
  rotation = 0;
  keyBindings = {
    a: { pressed: false },
    d: { pressed: false },
    space: { pressed: false }
  };

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
      this.setInitialSize(image);
      this.setInitialPosition();
      this.image = image;
    };
  }

  setInitialSize(image) {
    const scale = 0.15;
    this.width = image.width * scale;
    this.height = image.height * scale;
  }

  setInitialPosition() {
    this.position = {
      x: canvasElement.width / 2 - this.width / 2,
      y: canvasElement.height - this.height - 20
    };
  }

  handleKeyPressEvent(key, eventType) {
    const isPressed = eventType === 'down';
    if (key === ' ') {
      key = 'space';
    }
    const keyToChange = this.keyBindings[key];
    if (keyToChange) {
      keyToChange.pressed = isPressed;
    }
  }

  handleCurrentPressedKeys() {
    if (this.keyBindings.a.pressed) {
      this.velocity.x = -7;
      this.rotation = -0.15;
      return;
    }
    if (this.keyBindings.d.pressed) {
      this.velocity.x = 7;
      this.rotation = 0.15;
      return;
    }
    this.velocity.x = 0;
    this.rotation = 0;
  }

  updatePositionAccordingToVelocity() {
    this.position.x += this.velocity.x;
    if (this.position.x < 0) {
      this.position.x = 0;
    }
    else if (this.position.x + this.width > canvasElement.width) {
      this.position.x = canvasElement.width - this.width;
    }
  }

  draw() {
    if (!this.image) {
      return;
    }

    canvas.save();

    canvas.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );
    canvas.rotate(this.rotation);
    canvas.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    );

    canvas.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    canvas.restore();
  }

  update() {
    if (!this.image) {
      return;
    }
    this.handleCurrentPressedKeys();
    this.updatePositionAccordingToVelocity();
    this.draw();
  }
}

function animate() {
  window.requestAnimationFrame(animate);
  canvas.fillStyle = 'black';
  canvas.fillRect(0, 0, canvasElement.width, canvasElement.height);
  player.update();
}

const player = new Player();

window.addEventListener('keyup', ({ key }) => player.handleKeyPressEvent(key, 'up'));
window.addEventListener('keydown', ({ key }) => player.handleKeyPressEvent(key, 'down'));

animate();
