export class Projectile {
  position = { x: undefined, y: undefined };
  velocity = { x: undefined, y: undefined };
  destroyProjectileCallback = undefined;
  indexInTheProjectilesArray = undefined;

  constructor({ position, velocity, destroyProjectileCallback }) {
    if (this.constructor === Projectile) {
      throw new TypeError('Abstract class "Projectile" cannot be instantiated directly.');
    }
    this.position = position;
    this.velocity = velocity;
    this.destroyProjectileCallback = destroyProjectileCallback;
  }

  destroyProjectile() {
    this.destroyProjectileCallback(this.indexInTheProjectilesArray);
  }

  updatePosition() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  draw() { }

  update() { }
}
