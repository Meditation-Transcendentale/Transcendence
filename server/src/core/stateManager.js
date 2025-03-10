import { clients } from "./network.js";
import SpatialGrid from "./SpatialGrid.js";

export let gameState = {
    paddleOffsets: [],
    ballPositions: []
};

export const dirtyState = {
    paddleUpdates: new Set(),
    ballUpdates: new Set(),
    zoneActiveChanged: false
};
let CELL_SIZE = 5;
export let numPlayersGlobal = 0;
export let globalArenaRadius = 0;
export let initialBallSpeed = 0;

export function initializeState(numPlayers, numBalls = 1) {
    numPlayersGlobal = numPlayers;
    gameState.paddleOffsets = new Array(numPlayers).fill(0);
    gameState.zoneActive = new Array(numPlayers).fill(true);
    gameState.ballPositions = [];
    for (let i = 0; i < numBalls; i++) {
        gameState.ballPositions.push({ x: 0, y: 0, vx: initialBallSpeed, vy: initialBallSpeed });
    }
}
export function updateZoneActive() {

    gameState.zoneActive = [];
    for (let i = 0; i < numPlayersGlobal; i++) {

        gameState.zoneActive.push(clients.has(i));
    }
}

function computePaddleWorldPosition(clientId) {
    const zoneAngle = (2 * Math.PI / numPlayersGlobal) * clientId;
    const radialDistance = globalArenaRadius * 0.9;
    const baseX = radialDistance * Math.cos(zoneAngle);
    const baseY = radialDistance * Math.sin(zoneAngle);
    const tangentAngle = zoneAngle + Math.PI / 2;
    const offset = gameState.paddleOffsets[clientId] || 0;
    const offsetX = offset * Math.cos(tangentAngle);
    const offsetY = offset * Math.sin(tangentAngle);
    return { x: baseX + offsetX, y: baseY + offsetY };
}

export function updateState(deltaTime) {
    const grid = new SpatialGrid(CELL_SIZE);

    for (let i = 0; i < numPlayersGlobal; i++) {
        const paddlePos = computePaddleWorldPosition(i);
        grid.addObject(`paddle_${i}`, paddlePos.x, paddlePos.y);
    }

    gameState.ballPositions = gameState.ballPositions.map((ball, index) => {
        let newX = ball.x + ball.vx * deltaTime;
        let newY = ball.y + ball.vy * deltaTime;

        grid.addObject(`ball_${index}`, newX, newY);

        const nearby = grid.getNearbyObjects(newX, newY);

        for (const id of nearby) {
            if (id.startsWith("paddle_")) {
                const paddleIndex = parseInt(id.split("_")[1]);
                const paddlePos = computePaddleWorldPosition(paddleIndex);
                const dx = newX - paddlePos.x;
                const dy = newY - paddlePos.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const collisionThreshold = 0.5; // Adjust as needed.
                if (dist < collisionThreshold) {
                    ball.vx = -ball.vx;
                    ball.vy = -ball.vy;
                    newX = ball.x + ball.vx * deltaTime;
                    newY = ball.y + ball.vy * deltaTime;
                    dirtyState.ballUpdates.add(index);
                    break;
                }
            }
        }

        // Check if the ball passed a player's goal.
        // For simplicity, assume that if the ball's distance from the center exceeds a threshold, it's a goal.
        const centerDist = Math.sqrt(newX * newX + newY * newY);
        const goalThreshold = globalArenaRadius; // If the ball goes beyond the arena radius, it's a goal.
        if (centerDist > goalThreshold) {
            // Reset ball: center it and set velocity to initial values.
            newX = 0;
            newY = 0;
            ball.vx = initialBallSpeed;
            ball.vy = initialBallSpeed;
            dirtyState.ballUpdates.add(index);
        }

        return { x: newX, y: newY, vx: ball.vx, vy: ball.vy };
    });

    return gameState;
}

export function getDirtyDelta() {
    const delta = {};

    if (dirtyState.paddleUpdates.size > 0) {
        delta.paddleUpdates = [];
        for (const id of dirtyState.paddleUpdates) {
            delta.paddleUpdates.push({ id, offset: gameState.paddleOffsets[id] });
        }
    }

    if (dirtyState.ballUpdates.size > 0) {
        delta.ballUpdates = [];
        for (const id of dirtyState.ballUpdates) {
            delta.ballUpdates.push({ id, position: { x: gameState.ballPositions[id].x, y: gameState.ballPositions[id].y } });
        }
    }

    // (Include zoneActive if applicable)

    // Clear dirty flags.
    dirtyState.paddleUpdates.clear();
    dirtyState.ballUpdates.clear();
    dirtyState.zoneActiveChanged = false;

    return delta;
}

export function getState() {
    return gameState;
}
//// File: /server/lib/stateManager.js
//import { clients } from "./network.js";
//export let gameState = {
//    paddleOffsets: [],
//    ballPositions: [],
//    zoneActive: []
//};
//
//export const dirtyState = {
//    paddleUpdates: new Set(),
//    ballUpdates: new Set(),
//    zoneActiveChanged: true
//};
//export let numPlayersGlobal = 0;
//
//export function initializeState(numPlayers, numBalls = 1) {
//    numPlayersGlobal = numPlayers;
//    gameState.paddleOffsets = new Array(numPlayers).fill(0);
//    gameState.zoneActive = new Array(numPlayers).fill(true); // Assume active initially.
//    gameState.ballPositions = [];
//    for (let i = 0; i < numBalls; i++) {
//        gameState.ballPositions.push({ x: 0, y: 0 });
//    }
//}
//
//export function updateZoneActive() {
//
//    gameState.zoneActive = [];
//    for (let i = 0; i < numPlayersGlobal; i++) {
//
//        gameState.zoneActive.push(clients.has(i));
//    }
//}
//
//export function processInput(clientId, input, deltaTime) {
//    if (input.type === "MOVE_PADDLE") {
//        const displacement = input.direction;
//        const offset = Math.max(-2.905, Math.min(gameState.paddleOffsets[clientId] + displacement, 2.905));
//        gameState.paddleOffsets[clientId] = offset;
//        dirtyState.paddleUpdates.add(clientId);
//    }
//}
//
//export function updateState(deltaTime) {
//    const ballSpeed = 0.5; // units per second
//    gameState.ballPositions = gameState.ballPositions.map((ball, index) => {
//        const newX = ball.x + ballSpeed * deltaTime;
//        if (newX !== ball.x) {
//            dirtyState.ballUpdates.add(index);
//        }
//        return { x: newX, y: ball.y };
//    });
//    return gameState;
//}
//export function getDirtyDelta() {
//    const delta = {};
//
//    if (dirtyState.paddleUpdates.size > 0) {
//        delta.paddleUpdates = [];
//        for (const id of dirtyState.paddleUpdates) {
//            delta.paddleUpdates.push({ id, offset: gameState.paddleOffsets[id] });
//        }
//    }
//    if (dirtyState.ballUpdates.size > 0) {
//        delta.ballUpdates = [];
//        for (const id of dirtyState.ballUpdates) {
//            delta.ballUpdates.push({ id, position: gameState.ballPositions[id] });
//        }
//    }
//
//    delta.zoneActive = gameState.zoneActive;
//
//    dirtyState.paddleUpdates.clear();
//    dirtyState.ballUpdates.clear();
//    dirtyState.zoneActiveChanged = false;
//
//    return delta;
//}
//
//export function getState() {
//    return gameState;
//}
//
////
////export let gameState = {
////    paddleOffsets: [],
////    ballPositions: []
////};
////
////export const dirtyState = {
////    paddleUpdates: new Set(),
////    ballUpdates: new Set()
////};
////
////export function initializeState(numPlayers, numBalls = 1) {
////    gameState.paddleOffsets = new Array(numPlayers).fill(0);
////    gameState.ballPositions = [];
////    for (let i = 0; i < numBalls; i++) {
////        gameState.ballPositions.push({ x: 0, y: 0 });
////    }
////}
////
////export function processInput(clientId, input) {
////    const delta = 0.1; // Movement delta per input event
////    if (input.type === "MOVE_PADDLE") {
////        const offset = Math.max(-2.905, Math.min(gameState.paddleOffsets[clientId] + input.direction * delta, 2.905));
////
////        gameState.paddleOffsets[clientId] = offset;
////        //console.log("paddle offsets" + gameState.paddleOffsets[clientId] + "input=" + input.direction);
////        dirtyState.paddleUpdates.add(clientId);
////    }
////}
////
////export function updateState(deltaTime) {
////    const ballSpeed = 0.5; // units per second (adjust as needed)
////    gameState.ballPositions = gameState.ballPositions.map((ball, index) => {
////        const newX = ball.x + ballSpeed * deltaTime;
////        if (newX !== ball.x) {
////            dirtyState.ballUpdates.add(index);
////        }
////        return { x: newX, y: ball.y };
////    });
////    return gameState;
////}
////
////export function getDirtyDelta() {
////    const delta = {};
////
////    if (dirtyState.paddleUpdates.size > 0) {
////        delta.paddleUpdates = [];
////        for (const id of dirtyState.paddleUpdates) {
////            delta.paddleUpdates.push({ id, offset: gameState.paddleOffsets[id] });
////        }
////    }
////
////    if (dirtyState.ballUpdates.size > 0) {
////        delta.ballUpdates = [];
////        for (const id of dirtyState.ballUpdates) {
////            delta.ballUpdates.push({ id, position: gameState.ballPositions[id] });
////        }
////    }
////
////    dirtyState.paddleUpdates.clear();
////    dirtyState.ballUpdates.clear();
////
////    return delta;
////}
////
////export function getState() {
////    return gameState;
////}
