import { canvas, nextFrameActions, player } from './main.js';

export class Invader {
  width = undefined;
  height = undefined;
  image = undefined;
  position = { x: undefined, y: undefined };
  velocity = { x: 0, y: 0 };
  destroyInvaderCallback = undefined;
  indexInTheSquadron = undefined;

  constructor({ position, destroyInvaderCallback }) {
    this.position = position;
    this.destroyInvaderCallback = destroyInvaderCallback;
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

  destroyInvader() {
    this.destroyInvaderCallback(this.indexInTheSquadron);
  }

  updatePosition() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  detectProjectileCollision() {
    for (const projectile of player.projectiles) {
      const collisionDetected = this.doesTheProjectileCollidedToThisInvader(projectile);

      if (collisionDetected) {
        nextFrameActions.push(() => {
          projectile.destroyProjectile();
          this.destroyInvader();
        });
        break;
      }
    }
  }

  doesTheProjectileCollidedToThisInvader(projectile) {
    const projectileTop = projectile.position.y - projectile.radius;
    const projectileLeft = projectile.position.x - projectile.radius;
    const invaderTop = this.position.y;
    const invaderBottom = this.position.y + this.height;
    const invaderLeft = this.position.x;
    const invaderRight = this.position.x + this.width;

    const isTheProjectileBetweenTheInvaderInY = 
      projectileTop >= invaderTop && projectileTop <= invaderBottom;
    const isTheProjectileBetweenTheInvaderInX = 
      projectileLeft >= invaderLeft && projectileLeft <= invaderRight;

    const collisionDetected =
      isTheProjectileBetweenTheInvaderInY && isTheProjectileBetweenTheInvaderInX;

    return collisionDetected;
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
    this.detectProjectileCollision();
    this.draw();
  }
}
