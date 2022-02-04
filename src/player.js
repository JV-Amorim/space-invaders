import { canvasElement, canvas } from './main.js';
import { PlayerProjectile } from './player-projectile.js';

export class Player {
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
  projectiles = [];

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
    const projectile = new PlayerProjectile({
      position: {
        x: this.position.x + this.width / 2,
        y: this.position.y
      },
      velocity: {
        x: 0,
        y: -10
      },
      destroyProjectileCallback: this.destroyProjectile.bind(this)
    });
    this.projectiles.push(projectile);
  }

  destroyProjectile(projectileIndex) {
    this.projectiles.splice(projectileIndex, 1);
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

  updateProjectiles() {
    this.projectiles.forEach((projectile, index) => {
      projectile.indexInTheProjectilesArray = index;
      projectile.update();
    });
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
    this.updateProjectiles();
    this.draw();
  }
}
