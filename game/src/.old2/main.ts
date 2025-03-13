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

// Create an array to hold any state updates received before GameManager is ready.
const pendingUpdates: any[] = [];

// This will hold our GameManager instance once initialized.
let gameManagerInstance: GameManager | null = null;

// Setup the network connection.
setupNetwork();

// Register the server state callback immediately.
onServerState((serverState: any) => {
    console.log("Server state update received:", serverState);
    // If the GameManager instance is ready, apply the update.
    if (gameManagerInstance) {
        gameManagerInstance.applyServerDelta(serverState);
    } else {
        // Otherwise, push it to the pending queue.
        pendingUpdates.push(serverState);
    }
});

// Wait until localPlayerId is assigned before creating the GameManager.
const waitForId = setInterval(() => {
    if (localPlayerId !== null) {
        clearInterval(waitForId);

        const numPlayers = 100;
        const numBalls = 1;
        gameManagerInstance = new GameManager(scene, numPlayers, localPlayerId, numBalls);

        // Process any pending state updates received before GameManager was created.
        pendingUpdates.forEach((update) => {
            gameManagerInstance!.applyServerDelta(update);
        });
        pendingUpdates.length = 0; // Clear the queue.

        // Initialize input handling now that GameManager exists.
        initializeInput(gameManagerInstance);

        let previousTime = performance.now();
        const movementSpeed = 0.1; // units per second

        function gameLoop(currentTime: number) {
            const deltaTime = currentTime - previousTime;
            previousTime = currentTime;

            let moveDelta = 0;
            if (inputState.a) {
                moveDelta -= movementSpeed;
            }
            if (inputState.d) {
                moveDelta += movementSpeed;
            }

            if (moveDelta !== 0) {
                gameManagerInstance!.updateLocalPaddleByDelta(moveDelta);
                sendInput({ type: "input", direction: moveDelta });
            }

            scene.render();
            requestAnimationFrame(gameLoop);
        }

        requestAnimationFrame(gameLoop);
    }
}, 50);
