import { WebSocketServer } from "ws";
import { PORT } from "./utils/config.js";
import { info } from "./utils/logger.js";
import { handleConnection } from "./core/network.js";
import { startGameLoop } from "./core/gameLoop.js";
import { initializeState } from "./core/stateManager.js";

const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (socket) => {
    handleConnection(socket);
});

const numPlayers = 100;
const numBalls = 4;
initializeState(numPlayers, numBalls);

startGameLoop();

info(`Server started on port ${PORT}`);
