type ServerMessage =
    | { type: "welcome"; playerId: number }
    | { type: "fullState"; state: any }   // Replace "any" with your GameState interface when available
    | { type: "stateUpdate"; state: any }
    | { type: string;[key: string]: any }; // for any additional message types

let socket: WebSocket;
export let localPlayerId: number | null = null;
let serverStateCallback: (serverState: any) => void = () => { };


export function setupNetwork(): void {
    socket = new WebSocket("ws://10.12.12.4:8080");

    socket.onopen = () => {
        console.log("Connected to server");
    };

    socket.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        if (data.type === "welcome") {
            localPlayerId = data.playerId;
            console.log("Assigned local player ID:", localPlayerId);
        } else if (data.type === "fullState") {
            console.log("Received full state:", data.state);
            serverStateCallback(data.state);  // process state update (e.g., render it)
        } else if (data.type === "stateUpdate") {
            serverStateCallback(data.state);
        }
    };
    socket.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
        console.log("Socket closed");
        // Optionally implement reconnection logic here.
    };
}

export function sendInput(action: any): void {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(action));
    }
}

export function onServerState(callback: (serverState: any) => void): void {
    serverStateCallback = callback;
}
