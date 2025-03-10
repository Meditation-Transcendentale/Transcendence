import { TICK_RATE } from "../utils/config.js";
import { updateState, getDirtyDelta, updateZoneActive } from "./stateManager.js";
import { broadcastDelta } from "./network.js";
import { dequeueInputs } from "./inputQueue.js";

let lastTime = performance.now();

function gameLoopIteration() {
    const currentTime = performance.now();
    const deltaTime = (currentTime - lastTime) / 1000; // in seconds
    lastTime = currentTime;

    const queuedInputs = dequeueInputs();
    for (const [clientId, inputs] of queuedInputs.entries()) {
        for (const input of inputs) {
            import("./stateManager.js").then(module => {
                module.processInput(clientId, input, 1 / TICK_RATE); // Using fixed delta.
            });
        }
    }

    updateState(deltaTime);

    import("./stateManager.js").then(module => {
        module.updateZoneActive();
    });

    const delta = getDirtyDelta();
    if (Object.keys(delta).length > 0) {
        broadcastDelta(delta);
    }
}

export function startGameLoop() {
    function loop() {
        gameLoopIteration();
        setTimeout(loop, 1000 / TICK_RATE);
    }
    loop();
}
