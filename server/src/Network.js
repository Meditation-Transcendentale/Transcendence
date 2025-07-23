import Game from './Game.js';
import { Paddle } from './Paddle.js';

const players = {};

export function handleNewConnection(ws) {
    const playerId = Object.keys(players).length;
    ws.playerId = playerId;
    players[playerId] = { ws, state: {} };
    console.log(`Player connected: ${playerId}`);

    Game.addPaddle(playerId, 50, 100);
    Game.setWallOff(playerId);
    Game.setDirty();
    ws.send(JSON.stringify({ type: 'welcome', playerId }));
    ws.send(JSON.stringify({ type: 'fullState', state: Game.getFullState() }));
}

export function handleMessage(ws, message) {
    try {
        const data = JSON.parse(message);
        if (data.type === 'input') {
            Game.updatePaddleInput(ws.playerId, data);
        }
    } catch (err) {
        console.error('Error processing message:', err);
    }
}

export function broadcastState(wss, state) {
    const msg = JSON.stringify({ type: 'stateUpdate', state });
    wss.clients.forEach(client => {
        //if (client.readyState === client.OPEN) {
        client.send(msg);
        //}
    });
}

export function handleDisconnection(ws) {
    const playerId = ws.playerId;
    console.log(`Player disconnected: ${playerId}`);
    Game.setWallOn(playerId);
    delete players[playerId];
}
