import WebSocket, { WebSocketServer } from "ws";
import Player from "./Player.js";
import Game from "./Game.js";
//import { v4 as uuidv4 } from "uuid";

const wss = new WebSocketServer({ port: 8080 });
const game = new Game(100, 200, 130); // 100 players, 5 balls
const clientsMap = new Map();

wss.on("connection", function (ws) {
    const id = game.getSize() + 1;
    const newPlayer = new Player(id);

    if (!game.addPlayer(newPlayer)) {
        ws.send(JSON.stringify({ type: "error", message: "Game is full" }));
        ws.close();
        return;
    }

    clientsMap.set(id.toString(), ws);
    ws.send(JSON.stringify({ type: "init", id }));

    ws.on("message", function (message) {
        try {
            const data = JSON.parse(message);
            if (data.type === "move" && data.id === id) {
                game.updateState(data.position, data.rotation, id);
            }
        } catch (err) {
            console.error("Error processing message:", err);
        }
    });

    ws.on("close", function () {
        game.removePlayer(id);
        clientsMap.delete(id);
    });
});

const TICK_RATE = 60;
const TICK_INTERVAL = 1000 / TICK_RATE;

setInterval(() => {
    const deltaTime = 1 / TICK_RATE;
    game.update(deltaTime);
    const deltaSnapshot = game.getDeltaSnapshot();

    if (Object.keys(deltaSnapshot.players).length > 0 || deltaSnapshot.balls.length > 0) {
        const message = JSON.stringify({ type: "update", state: deltaSnapshot });

        clientsMap.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }
}, TICK_INTERVAL);

console.log("WebSocket server running on ws://localhost:8080");
//import WebSocket, { WebSocketServer } from 'ws';
//import Player from "./Player.js";
//import Game from "./Game.js";
////import { v4 as uuidv4 } from 'uuid';
//
//const wss = new WebSocketServer({ port: 8080 });
//const game = new Game(100);
//const clientsMap = new Map();
//
//wss.on('connection', function (ws) {
//    //const uid = uuidv4();
//    const id = game.getSize() + 1;
//    const newPlayer = new Player(id);
//
//    if (!game.addPlayer(newPlayer)) {
//        ws.send(JSON.stringify({ type: 'error', message: 'Game is full' }));
//        ws.close();
//        return;
//    }
//
//    clientsMap.set(id.toString(), ws);
//
//    ws.send(JSON.stringify({ type: 'init', id }));
//
//    ws.on('message', function (message) {
//        try {
//            const data = JSON.parse(message);
//            // Expecting messages like: { type: 'move', uid, position, rotation }
//            if (data.type === 'move' && data.id === id) {
//                //console.log("receiving content move =" + id);
//                game.updateState(data.position, data.rotation, id);
//            }
//        } catch (err) {
//            console.error('Error processing message:', err);
//        }
//    });
//
//    ws.on('close', function () {
//        game.removePlayer(id);
//        clientsMap.delete(id);
//    });
//});
//
//const TICK_RATE = 60;
//const TICK_INTERVAL = 1000 / TICK_RATE;
//
//setInterval(() => {
//    const deltaTime = 1 / TICK_RATE;
//    game.update(deltaTime);
//    const deltaSnapshot = game.getDeltaSnapshot();
//
//    if (Object.keys(deltaSnapshot).length > 0) {
//        const message = JSON.stringify({ type: 'update', state: deltaSnapshot });
//
//        for (const id in deltaSnapshot) {
//            const client = clientsMap.get(id.toString());
//
//            if (client) {
//                client.send(message);
//            }
//        }
//    }
//}, TICK_INTERVAL);
