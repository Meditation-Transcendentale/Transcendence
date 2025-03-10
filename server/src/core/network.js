// File: /server/lib/network.js
import { info, error } from "../utils/logger.js";

const clients = new Map();
let clientCounter = 0;

export function handleConnection(socket) {
    const clientId = clientCounter++;
    socket.clientId = clientId;
    clients.set(clientId, socket);
    info(`Client ${clientId} connected. Total clients: ${clients.size}`);

    socket.send(JSON.stringify({ type: "ASSIGN_ID", id: clientId }));

    socket.addEventListener("message", (event) => {
        try {
            const input = JSON.parse(event.data);
            import("./inputQueue.js").then(module => {
                module.enqueueInput(clientId, input);
            });
        } catch (err) {
            error("Error processing message: " + err);
        }
    });

    socket.addEventListener("close", () => {
        clients.delete(clientId);
        info(`Client ${clientId} disconnected. Total clients: ${clients.size}`);
    });
}

export function broadcastDelta(delta) {
    const deltaString = JSON.stringify(delta);
    for (const socket of clients.values()) {
        if (socket.readyState === socket.OPEN) {
            socket.send(deltaString);
        }
    }
}

export { clients };
