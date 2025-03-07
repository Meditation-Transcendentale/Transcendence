import WebSocket from "ws";
import Player from "./Player.js";

export default class NetworkManager {
    constructor(wss, game) {
        this.wss = wss;
        this.game = game;
        this.clientsMap = new Map();

        this.wss.on("connection", (ws) => this.handleConnection(ws));

        setInterval(() => this.broadcastGameState(), 1000 / 30); // 30 ticks per second
    }

    handleConnection(ws) {
        const id = this.game.getSize() + 1;
        const newPlayer = new Player(id);

        if (!this.game.addPlayer(newPlayer)) {
            ws.send(JSON.stringify({ type: "error", message: "Game is full" }));
            ws.close();
            return;
        }

        this.clientsMap.set(id.toString(), ws);
        ws.send(JSON.stringify({ type: "init", id }));

        ws.on("message", (message) => this.handleMessage(message, id));
        ws.on("close", () => this.handleDisconnect(id));
    }

    handleMessage(message, id) {
        try {
            const data = JSON.parse(message);
            if (data.type === "move") {
                this.game.updateState(data.position, data.rotation, id);
            }
        } catch (err) {
            console.error("Error processing message:", err);
        }
    }

    handleDisconnect(id) {
        this.game.removePlayer(id);
        this.clientsMap.delete(id);
    }

    broadcastGameState() {
        const deltaSnapshot = this.game.getDeltaSnapshot();

        // Skip sending if there are no updates
        if (Object.keys(deltaSnapshot.players).length === 0 && deltaSnapshot.balls.length === 0) return;

        const message = JSON.stringify({ type: "update", state: deltaSnapshot });

        this.clientsMap.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }
}
