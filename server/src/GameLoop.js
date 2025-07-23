import { config } from "./utils/config.js";
import Physics from './Physics.js';
import * as Networking from "./Network.js";

class GameLoop {
    constructor(wss) {
        this.wss = wss;
        this.lastTime = performance.now();
        this.interval = 1000 / config.TICK_RATE;
    }

    start() {
        this.loop();
    }

    loop() {
        const now = performance.now();
        const deltaTime = (now - this.lastTime) / 1000;
        this.lastTime = now;

        Physics.update(deltaTime);
        const gameState = Physics.getState();
        Networking.broadcastState(this.wss, gameState);

        Physics.clearDirty();
        setTimeout(() => this.loop(), this.interval);
    }
}

export default GameLoop;
