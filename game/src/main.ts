import { createScene } from "./sceneManager";
import { initializeInput } from "./inputHandler";
import { setupNetwork, onServerState } from "./websocketManager";
import { GameManager } from "./gameManager";
import { inputState } from "./inputState";
import { Engine } from "@babylonjs/core";

// Get the canvas and create the BabylonJS engine/scene.
const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const engine = new Engine(canvas, true);
const scene = createScene(engine, canvas);

// Setup network connection.
setupNetwork();

// Set number of players and determine which one is local.
const numPlayers = 100;
const localPlayerIndex = 1;

// Create the GameManager.
const gameManager = new GameManager(scene, numPlayers, localPlayerIndex);

// Initialize input handling, injecting the GameManager via dependency injection.
initializeInput(gameManager);

// Register network callback to receive authoritative state updates.
onServerState((serverState: any) => {
	gameManager.applyServerState(serverState);
});

// Set up a continuous game loop for smooth input processing and rendering.
let previousTime = performance.now();
const movementSpeed = 5; // units per second

function gameLoop(currentTime: number) {
	const deltaTime = (currentTime - previousTime) / 1000; // Convert milliseconds to seconds.
	previousTime = currentTime;

	// Continuously check the current input state.
	let moveDelta = 0;
	if (inputState.a) {
		moveDelta -= movementSpeed * deltaTime;
	}
	if (inputState.d) {
		moveDelta += movementSpeed * deltaTime;
	}

	// If there is any movement, update the local paddle.
	if (moveDelta !== 0) {
		gameManager.updateLocalPaddleByDelta(moveDelta);
	}

	// Render the scene.
	scene.render();

	// Request the next frame.
	requestAnimationFrame(gameLoop);
}

// Start the game loop.
requestAnimationFrame(gameLoop);
