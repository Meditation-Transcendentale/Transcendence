import { Scene } from "@babylonjs/core";
import { Arena, calculateArenaRadius } from "./objects/arena";
import { Player } from "./objects/Player";

export class GameManager {
	public scene: Scene;
	public playerZones: Player[];
	public arena: Arena;
	public localPlayerIndex: number;

	/**
	 * Creates the game manager by initializing the arena and player zones.
	 * @param scene - The BabylonJS scene.
	 * @param numPlayers - Total number of players in the game.
	 * @param localPlayerIndex - The index of the local player's zone.
	 */
	constructor(scene: Scene, numPlayers: number, localPlayerIndex: number) {
		this.scene = scene;
		this.localPlayerIndex = localPlayerIndex;

		// Calculate arena radius based on the number of players.
		const arenaRadius = calculateArenaRadius(numPlayers);

		// Create the circular arena.
		this.arena = new Arena(scene, arenaRadius);

		// Initialize player zones.
		this.playerZones = [];
		for (let i = 0; i < numPlayers; i++) {
			// Each PlayerZone calculates its own center, pillars, and creates a paddle thin instance.
			const zone = new Player(scene, i, numPlayers, arenaRadius);
			this.playerZones.push(zone);
			// Initialize paddle with an x offset of 0.
			zone.updatePaddleX(0, scene);
		}
	}

	/**
	 * Client-side prediction: Update the local player's paddle position continuously.
	 * @param deltaX - The change in x position (derived from input and delta time).
	 */
	public updateLocalPaddleByDelta(deltaX: number): void {
		const localZone = this.playerZones[this.localPlayerIndex];
		// Update the local predicted x offset.
		localZone.predictedX += deltaX;
		// Update the paddle's thin instance using the new predicted x.
		localZone.updatePaddleX(localZone.predictedX, this.scene);
	}

	/**
	 * Reconciliation: Apply the authoritative server state.
	 * @param serverState - The game state object received from the server.
	 * Expected format: { paddleOffsets: number[] }
	 */
	public applyServerState(serverState: any): void {
		for (let i = 0; i < this.playerZones.length; i++) {
			const zone = this.playerZones[i];
			// Use the server's paddle offset.
			const authoritativeX = serverState.paddleOffsets[i];
			// Update the local predicted value to match the server.
			zone.predictedX = authoritativeX;
			zone.updatePaddleX(authoritativeX, this.scene);
		}
	}
}
