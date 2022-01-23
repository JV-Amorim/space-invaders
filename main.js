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
    d: { pressed: false }
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

    if (key === ' ' && isPressed) {
      this.shootProjectile();
      return;
    }

    const keyToChange = this.keyBindings[key];
    if (keyToChange) {
      keyToChange.pressed = isPressed;
    }
  }

  shootProjectile() {
    const projectile = new Projectile({
      position: {
        x: this.position.x + this.width / 2,
        y: this.position.y
      },
      velocity: {
        x: 0,
        y: -10
      }
    });
    projectiles.push(projectile);
  }

  updateVelocityAndRotation() {
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

  updatePosition() {
    this.position.x += this.velocity.x;
    if (this.position.x < 0) {
      this.position.x = 0;
    }
    else if (this.position.x + this.width > canvasElement.width) {
      this.position.x = canvasElement.width - this.width;
    }
  }

  draw() {
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
    this.updateVelocityAndRotation();
    this.updatePosition();
    this.draw();
  }
}

class Projectile {
  position = { x: undefined, y: undefined };
  velocity = { x: undefined, y: undefined };
  radius = 3;
  indexInTheProjectilesArray = 0;

  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
  }

  destroyProjectile() {
    projectiles.splice(this.indexInTheProjectilesArray, 1);
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

class Invader {
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

class InvadersSquadron {
  width = undefined;
  height = undefined;
  position = { x: 0, y: 0 };
  velocity = { x: 3, y: 0 };
  invaders = [];
  invaderCellWidth = 30;
  minRows = 3;
  maxRows = 5;
  minColumns = 8;
  maxColumns = 12;
  rows = undefined;
  columns = undefined;

  constructor() {
    this.setRandomQuantityOfRowsAndColumns();
    this.calculateGridWidthAndHeight();
    this.instantiateInvaders();
  }

  setRandomQuantityOfRowsAndColumns() {
    this.rows = Math.floor(Math.random() * this.maxRows);
    this.rows = this.rows >= this.minRows ? this.rows : this.minRows;

    this.columns = Math.floor(Math.random() * this.maxColumns);
    this.columns = this.columns >= this.minColumns ? this.columns : this.minColumns;
  }

  calculateGridWidthAndHeight() {
    this.width = this.columns * this.invaderCellWidth;
    this.height = this.rows * this.invaderCellWidth;
  }

  instantiateInvaders() {
    for (let column = 0; column < this.columns; column++) {
      for (let row = 0; row < this.rows; row++) {
        const invader = new Invader({
          position: {
            x: column * this.invaderCellWidth,
            y: row * this.invaderCellWidth
          }
        });
        this.invaders.push(invader);
      }
    }
  }

  updateVelocity() {
    const isToReverseVelocityAndPushTheGridDown =
      this.position.x < 0 ||
      this.position.x + this.width >= canvasElement.width;

    if (isToReverseVelocityAndPushTheGridDown) {
      this.velocity.x = -this.velocity.x;
      this.velocity.y = 30;
    }
    else {
      this.velocity.y = 0;
    }
  }

  updatePosition() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  updateInvaders() {
    this.invaders.forEach(invader => {
      invader.velocity = this.velocity;
      invader.update();
    });
  }

  update() {
    this.updateVelocity();
    this.updatePosition();
    this.updateInvaders();
  }
}

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

const player = new Player();
const projectiles = [];
const invadersSquadrons = [new InvadersSquadron()];

window.addEventListener('keyup', ({ key }) => player.handleKeyPressEvent(key, 'up'));
window.addEventListener('keydown', ({ key }) => player.handleKeyPressEvent(key, 'down'));

animate();
