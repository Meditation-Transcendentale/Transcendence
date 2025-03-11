import Game from './Game.js';
import { Paddle } from './Paddle.js';

const players = {};
let i = 0;

export function handleNewConnection(ws) {
    const playerId = i++;
    ws.playerId = playerId;
    players[playerId] = { ws, state: {} };
    console.log(`Player connected: ${playerId}`);

    Game.addPaddle(playerId, 50, 100);

    ws.send(JSON.stringify({ type: 'welcome', playerId }));
}

export function handleMessage(ws, message) {
    try {
        const data = JSON.parse(message);
        if (data.type === 'input') {
            Game.updatePaddleInput(ws.playerId, data);
            // Optionally, update paddle position directly here if needed.
        }
    } catch (err) {
        console.error('Error processing message:', err);
    }
}

export function broadcastState(wss, state) {
    const msg = JSON.stringify({ type: 'stateUpdate', state });
    wss.clients.forEach(client => {
        if (client.readyState === client.OPEN) {
            client.send(msg);
        }
    });
}

export function handleDisconnection(ws) {
    const playerId = ws.playerId;
    console.log(`Player disconnected: ${playerId}`);
    // Convert the player's paddle to a static wall
    Game.convertPaddleToWall(playerId);
}
//// File: /server/lib/network.js
//import { info, error } from "../utils/logger.js";
//
//const clients = new Map();
//let clientCounter = 0;
//
//export function handleConnection(socket) {
//    const clientId = clientCounter++;
//    socket.clientId = clientId;
//    clients.set(clientId, socket);
//    info(`Client ${clientId} connected. Total clients: ${clients.size}`);
//
//    socket.send(JSON.stringify({ type: "ASSIGN_ID", id: clientId }));
//
//    socket.addEventListener("message", (event) => {
//        try {
//            const input = JSON.parse(event.data);
//            import("./inputQueue.js").then(module => {
//                module.enqueueInput(clientId, input);
//            });
//        } catch (err) {
//            error("Error processing message: " + err);
//        }
//    });
//
//    socket.addEventListener("close", () => {
//        clients.delete(clientId);
//        info(`Client ${clientId} disconnected. Total clients: ${clients.size}`);
//    });
//}
//
//export function broadcastDelta(delta) {
//    const deltaString = JSON.stringify(delta);
//    for (const socket of clients.values()) {
//        if (socket.readyState === socket.OPEN) {
//            socket.send(deltaString);
//        }
//    }
//}
//
//export { clients };
