import { Vector3 } from "@babylonjs/core";
import { Scene } from "@babylonjs/core";
import { Arena, calculateArenaRadius } from "./objects/arena";
import { Player } from "./objects/Player";
import { BallManager } from "./BallManager";

interface Walls {
    id: number;
    wall: boolean;
    // Add any other properties if needed
}
interface PaddleUpdate {
    id: number;
    offset: number;
    isStatic: number;
    // Add any other properties if needed
}
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
        if (delta.walls) {
            //console.log("walls=" + delta.walls);
            for (const id of delta.walls) {
                console.log("id=" + id.id + " bool=" + id.wall)
                if (id.wall == true)
                    this.playerZones[id.id].showWall(this.scene);
                else if (id.wall == false)
                    this.playerZones[id.id].hideWall(this.scene);

            }
        }
        if (delta.paddles) {
            for (const update of Object.values(delta.paddles) as PaddleUpdate[]) {
                if (update.id == this.localPlayerIndex) continue;
                const zone = this.playerZones[update.id];
                //console.log(update.offset);
                zone.predictedX = update.offset;
                zone.updatePaddleX(update.offset, this.scene);
            }
        }

        if (delta.balls) {
            for (const ballUpdate of delta.balls) {
                this.ballManager.updateBall(ballUpdate.id, new Vector3(ballUpdate.x, 0.5, ballUpdate.y));
            }
        }

    }
}
