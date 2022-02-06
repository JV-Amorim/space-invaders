import { canvasElement, nextFrameActions } from './main.js';
import { Invader } from './invader.js';

export class InvadersSquadron {
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
  destroySquadronCallback = undefined;
  indexInTheSpawner = undefined;

  constructor(destroySquadronCallback) {
    this.destroySquadronCallback = destroySquadronCallback;
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
          },
          destroyInvaderCallback: this.destroyInvader.bind(this)
        });
        this.invaders.push(invader);
      }
    }
  }

  destroyInvader(invaderIndex) {
    this.invaders.splice(invaderIndex, 1);

    if (this.invaders.length === 0) {
      nextFrameActions.push(() => this.destroySquadronCallback(this.indexInTheSpawner));
    }
    else {
      this.recalculateGridWidthAfterInvaderDestroyed();
    }
  }

  recalculateGridWidthAfterInvaderDestroyed() {
    const invadersLength = this.invaders.length;
    const lastInvader = this.invaders[invadersLength - 1];
    const firstInvader = this.invaders[0];

    this.width = lastInvader.position.x - firstInvader.position.x + this.invaderCellWidth;
    this.position.x = firstInvader.position.x;
  }

  shootProjectileFromRandomInvader() {
    const randomInvaderIndex = Math.floor(Math.random() * this.invaders.length);
    const randomInvader = this.invaders[randomInvaderIndex];
    if (randomInvader) {
      randomInvader.shootInvaderProjectile();
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
    this.invaders.forEach((invader, index) => {
      invader.velocity = this.velocity;
      invader.indexInTheSquadron = index;
      invader.update();
    });
  }

  update() {
    this.updateVelocity();
    this.updatePosition();
    this.updateInvaders();
  }
}
