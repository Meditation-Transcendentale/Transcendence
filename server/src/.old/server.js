import { WebSocketServer } from "ws";
import NetworkManager from "./NetworkManager.js";
import Game from "./Game.js";

const PORT = 8080;
const game = new Game(100, 5, 130); // 100 players, 5 balls

const wss = new WebSocketServer({ port: PORT });
const networkManager = new NetworkManager(wss, game);

console.log(`WebSocket server running on ws://localhost:${PORT}`);
