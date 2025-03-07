import { Matrix, Scene } from '@babylonjs/core';
import { Arena, calculateArenaRadius } from './objects/arena';


import { Player } from "./objects/Player";

export function initializeGame(scene: Scene, numPlayers: number): Player[] {
    const arenaRadius = calculateArenaRadius(numPlayers);

    const arena = new Arena(scene, arenaRadius);

    const playerZones: Player[] = [];

    for (let i = 0; i < numPlayers; i++) {
        const zone = new Player(scene, i, numPlayers, arenaRadius);
        playerZones.push(zone);

        zone.updatePaddleX(0, scene);
    }

    return playerZones;
}

