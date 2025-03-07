import { parentPort } from "worker_threads";
import Ball from "./Ball.js";

let balls = [];
let players = new Map();
let deltaTime = 1 / 30; // 30 FPS physics
let arenaRadius = 15;

parentPort.on("message", (message) => {
    if (message.type === "init") {
        balls = message.balls.map((data) => new Ball(data.id, data.position, data.velocity));
        players = new Map(Object.entries(message.players));
        arenaRadius = message.arenaRadius;
    } else if (message.type === "update") {
        players = new Map(Object.entries(message.players));
        balls.forEach(ball => ball.update(deltaTime, arenaRadius));
        parentPort.postMessage({ type: "physicsUpdate", balls: balls.map(ball => ball.getState()) });
    }
});
