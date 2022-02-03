import { InvadersSquadron } from './invaders-squadron.js';

export class InvadersSquadronsSpawner {
  frameCounter = 0;
  minInstantiationInterval = 500;
  instantiationInterval = undefined;
  invadersSquadrons = [];

  constructor() {
    this.instantiateNewInvadersSquadron();
    this.generateRandomInstantiationInterval();
  }

  instantiateNewInvadersSquadron() {
    const newSquadron = new InvadersSquadron(
      this.destroyInvadersSquadron.bind(this)
    );
    this.invadersSquadrons.push(newSquadron);
  }

  generateRandomInstantiationInterval() {
    this.instantiationInterval = Math.floor(Math.random() * 1000);
    if (this.instantiationInterval < this.minInstantiationInterval) {
      this.instantiationInterval = this.minInstantiationInterval;
    }
  }

  destroyInvadersSquadron(squadronIndex) {
    this.invadersSquadrons.splice(squadronIndex, 1);
  }

  handleNewFrame() {
    this.frameCounter++;

    if (this.frameCounter === this.instantiationInterval) {
      this.instantiateNewInvadersSquadron();
      this.frameCounter = 0;
      this.generateRandomInstantiationInterval();
    }
  }

  updateInvadersSquadrons() {
    this.invadersSquadrons.forEach((squadron, index) => {
      squadron.indexInTheSpawner = index;
      squadron.update();
    });
  }

  update() {
    this.handleNewFrame();
    this.updateInvadersSquadrons();
  }
}
