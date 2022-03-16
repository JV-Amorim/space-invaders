import { canvas, nextFrameActions, player, particles } from './main.js';
import { InvaderProjectile } from './invader-projectile.js';
import { Particle } from './particle.js';

export class Invader {
  width = undefined;
  height = undefined;
  image = undefined;
  position = { x: undefined, y: undefined };
  velocity = { x: 0, y: 0 };
  destroyInvaderCallback = undefined;
  indexInTheSquadron = undefined;
  invaderProjectiles = [];
  explosionParticles = [];

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
    this.instantiateExplosionParticles();
  }

  instantiateExplosionParticles() {
    for (let i = 0; i < 15; i++) {
      const newParticle = new Particle({
        position: {
          x: this.position.x + this.width / 2,
          y: this.position.y + this.height / 2
        },
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2
        },
        radius: Math.random() * 3,
        color: 'yellow'
      });
      particles.push(newParticle);
    }
  }

  shootInvaderProjectile() {
    const projectile = new InvaderProjectile({
      position: {
        x: this.position.x + this.width / 2,
        y: this.position.y + this.height
      },
      velocity: {
        x: 0,
        y: 5
      },
      destroyProjectileCallback: this.destroyInvaderProjectile.bind(this)
    });
    this.invaderProjectiles.push(projectile);
  }

  destroyInvaderProjectile(projectileIndex) {
    this.invaderProjectiles.splice(projectileIndex, 1);
  }

  updateInvaderProjectiles() {
    this.invaderProjectiles.forEach((projectile, index) => {
      projectile.indexInTheProjectilesArray = index;
      projectile.update();
    });
  }

  updateExplosionParticles() {
    this.explosionParticles.forEach(particle => particle.update());
  }

  updatePosition() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  detectCollisionWithPlayerProjectiles() {
    for (const projectile of player.playerProjectiles) {
      const collisionDetected = this.doesThePlayerProjectileCollidedToThisInvader(projectile);

      if (collisionDetected) {
        nextFrameActions.push(() => {
          projectile.destroyProjectile();
          this.destroyInvader();
        });
        break;
      }
    }
  }

  doesThePlayerProjectileCollidedToThisInvader(projectile) {
    const projectileTop = projectile.position.y - projectile.radius;
    const projectileLeft = projectile.position.x - projectile.radius;
    const invaderTop = this.position.y;
    const invaderBottom = this.position.y + this.height;
    const invaderLeft = this.position.x;
    const invaderRight = this.position.x + this.width;

    const isTheProjectileWithinTheInvaderInY = 
      projectileTop >= invaderTop && projectileTop <= invaderBottom;
    const isTheProjectileWithinTheInvaderInX = 
      projectileLeft >= invaderLeft && projectileLeft <= invaderRight;

    const collisionDetected =
      isTheProjectileWithinTheInvaderInY && isTheProjectileWithinTheInvaderInX;

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
    this.updateInvaderProjectiles();
    this.updatePosition();
    this.detectCollisionWithPlayerProjectiles();
    this.draw();
  }
}
