import { canvas, player } from './main.js';

export class Invader {
  parentSquadron = undefined;
  width = undefined;
  height = undefined;
  image = undefined;
  position = { x: undefined, y: undefined };
  velocity = { x: 0, y: 0 };
  indexInTheSquadron = 0;

  constructor({ parentSquadron, position }) {
    this.parentSquadron = parentSquadron;
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

  destroyInvader() {
    this.parentSquadron.invaders.splice(this.indexInTheSquadron, 1);
  }

  updatePosition() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  detectProjectileCollision() {
    for (const projectile of player.projectiles) {
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

      if (collisionDetected) {
        projectile.destroyProjectile();
        this.destroyInvader();
      }
    }
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
