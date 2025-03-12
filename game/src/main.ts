import { createScene } from "./sceneManager";
import { sendInput } from "./websocketManager";
import { initializeInput } from "./inputHandler";
import { setupNetwork, onServerState, localPlayerId } from "./websocketManager";
import { GameManager } from "./gameManager";
import { inputState } from "./inputState";
import { Engine } from "@babylonjs/core";
import "@babylonjs/inspector";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const engine = new Engine(canvas, true);
const scene = createScene(engine, canvas);
//scene.debugLayer.show();

setupNetwork();
const waitForId = setInterval(() => {
	if (localPlayerId !== null) {
		clearInterval(waitForId);

		const numPlayers = 100;
		const numBalls = 1;
		const gameManager = new GameManager(scene, numPlayers, localPlayerId, numBalls);

		initializeInput(gameManager);

		onServerState((serverState: any) => {
			gameManager.applyServerDelta(serverState);
		});

		let previousTime = performance.now();
		const movementSpeed = 0.1; // units per second

		function gameLoop(currentTime: number) {
			//const deltaTime = (currentTime - previousTime) / 1000; // Convert milliseconds to seconds.
			previousTime = currentTime;

			let moveDelta = 0;
			if (inputState.a) {
				moveDelta -= movementSpeed;
			}
			if (inputState.d) {
				moveDelta += movementSpeed;
			}

			if (moveDelta !== 0) {
				gameManager.updateLocalPaddleByDelta(moveDelta);
				sendInput({ type: "input", direction: moveDelta });
			}

			scene.render();

			requestAnimationFrame(gameLoop);
		}

		requestAnimationFrame(gameLoop);
	}
}, 50);
