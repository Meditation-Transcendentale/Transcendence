import { Worker } from "worker_threads";
import Ball from "./Ball.js";
import SpatialGrid from "./SpatialGrid.js";

export default class Game {
    constructor(maxPlayers = 100, numBalls = 5) {
        this.players = new Map();
        this.balls = [];
        this.maxPlayers = maxPlayers;
        this.grid = new SpatialGrid(2);
        this.walls = new Map();

        this.arenaRadius = this.calculateArenaRadius(maxPlayers, 10);
        console.log(`Arena radius: ${this.arenaRadius}`);

        for (let i = 0; i < numBalls; i++) {
            this.balls.push(new Ball(i, this.arenaRadius, this.grid));
        }

        for (let i = 0; i < maxPlayers; i++) {
            this.walls.set(i, true);
        }

        this.worker = new Worker("./PhysicsWorker.js");

        this.worker.on("message", (message) => {
            if (message.type === "physicsUpdate") {
                this.balls = message.balls; // Update ball states
            }
        });

        this.worker.postMessage({
            type: "init",
            balls: this.balls.map(ball => ball.getState()),
            players: Object.fromEntries(this.players),
            arenaRadius: this.arenaRadius
        });
    }

    calculateArenaRadius(numPlayers, playerWidth) {
        const centralAngleDeg = 360 / numPlayers;
        const halfCentralAngleRad = (centralAngleDeg / 2) * Math.PI / 180;
        return playerWidth / (2 * Math.sin(halfCentralAngleRad));
    }

    addPlayer(player) {
        if (this.players.size < this.maxPlayers) {
            this.players.set(player.id, player);
            this.walls.set(player.id, false);
            return true;
        }
        return false;
    }

    removePlayer(id) {
        this.players.delete(id);
        this.walls.set(id, true);
    }

    updateState(newPosition, newRotation, id) {
        let player = this.players.get(id);
        if (player) {
            player.updateState(newPosition, newRotation);
            player.dirty = true;
        }
    }

    update(deltaTime) {
        this.worker.postMessage({
            type: "update",
            players: Object.fromEntries(this.players)
        });
    }

    getDeltaSnapshot() {
        return { players: Object.fromEntries(this.players), balls: this.balls };
    }
}
