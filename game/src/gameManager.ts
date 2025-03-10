import { Scene } from "@babylonjs/core";
import { Arena, calculateArenaRadius } from "./objects/arena";
import { Player } from "./objects/Player";
import { BallManager } from "./BallManager";

export class GameManager {
    public scene: Scene;
    public playerZones: Player[];
    public arena: Arena;
    public localPlayerIndex: number;
    public ballManager: BallManager;

    constructor(scene: Scene, numPlayers: number, localPlayerIndex: number, numBalls: number) {
        this.scene = scene;
        this.localPlayerIndex = localPlayerIndex;

        const arenaRadius = calculateArenaRadius(numPlayers);
        this.arena = new Arena(scene, arenaRadius, numPlayers);

        this.playerZones = [];
        for (let i = 0; i < numPlayers; i++) {
            const zone = new Player(scene, i, numPlayers, arenaRadius);
            this.playerZones.push(zone);
            zone.updatePaddleX(0, scene);
        }

        this.ballManager = new BallManager(scene, numBalls);
    }

    public updateLocalPaddleByDelta(deltaX: number): void {
        const localZone = this.playerZones[this.localPlayerIndex];
        localZone.predictedX += deltaX;
        localZone.updatePaddleX(localZone.predictedX, this.scene);
    }

    public applyServerDelta(delta: any): void {
        if (delta.paddleUpdates) {
            for (const update of delta.paddleUpdates) {
                const zone = this.playerZones[update.id];
                zone.predictedX = update.offset;
                zone.updatePaddleX(update.offset, this.scene);
            }
        }

        if (delta.ballUpdates) {
            for (const ballUpdate of delta.ballUpdates) {
                this.ballManager.updateBall(ballUpdate.id, ballUpdate.position);
            }
        }

        if (delta.zoneActive) {
            for (let i = 0; i < delta.zoneActive.length; i++) {
                const zone = this.playerZones[i];
                if (!delta.zoneActive[i]) {
                    zone.showWall(this.scene);
                } else {
                    zone.hideWall(this.scene);
                }
            }
        }
    }
}
