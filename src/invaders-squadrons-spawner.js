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
    this.invadersSquadrons.push(new InvadersSquadron());
  }

  generateRandomInstantiationInterval() {
    this.instantiationInterval = Math.floor(Math.random() * 1000);
    if (this.instantiationInterval < this.minInstantiationInterval) {
      this.instantiationInterval = this.minInstantiationInterval;
    }
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
    this.invadersSquadrons.forEach(invadersSquadron => invadersSquadron.update());
  }

  update() {
    this.handleNewFrame();
    this.updateInvadersSquadrons();
  }
}
