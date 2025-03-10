let socket: WebSocket;
export let localPlayerId: number | null = null;
let serverStateCallback: (serverState: any) => void;

export function setupNetwork(): void {
    socket = new WebSocket("ws://10.12.12.4:8080");

    socket.onopen = () => {
        console.log("Connected to server");
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "ASSIGN_ID") {
            localPlayerId = data.id;
            console.log("Assigned local player ID:", localPlayerId);
        } else {
            if (serverStateCallback) {
                serverStateCallback(data);
            }
        }
    };

    socket.onerror = (error) => {
        console.error("WebSocket error:", error);
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
