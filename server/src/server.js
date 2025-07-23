import { WebSocketServer } from "ws";
import { config } from "./utils/config.js";
import { info } from "./utils/logger.js";
import * as Networking from './Network.js';
import GameLoop from "./GameLoop.js";

const wss = new WebSocketServer({ port: config.SERVER_PORT }, () => {
    info(`Server started on port ${config.SERVER_PORT}`);
});

wss.on('connection', (ws) => {
    Networking.handleNewConnection(ws);
    ws.on('message', (message) => {
        Networking.handleMessage(ws, message);
    });
    ws.on('close', () => {
        Networking.handleDisconnection(ws);
    });
});

const gameLoop = new GameLoop(wss);
gameLoop.start();
