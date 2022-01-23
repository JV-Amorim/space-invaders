import { InvadersSquadron } from './invaders-squadron.js';

export class InvadersSquadronsSpawner {
  frameCounter = 0;
  invadersSquadrons = [];

  constructor() {
    this.instantiateNewInvadersSquadron();
  }
  
  handleNewFrame() {
    this.frameCounter++;
    // TODO - Method implementation.
  }

  instantiateNewInvadersSquadron() {
    this.invadersSquadrons.push(new InvadersSquadron());
  }

  updateInvadersSquadrons() {
    this.invadersSquadrons.forEach(invadersSquadron => invadersSquadron.update());
  }

  update() {
    this.handleNewFrame();
    this.updateInvadersSquadrons();
  }
}
