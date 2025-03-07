let socket: WebSocket;

export function setupNetwork(): void {
    socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
        console.log("Connected to server");
    };

    socket.onmessage = (event) => {
        const gameState = JSON.parse(event.data);
        updateGameObjects(gameState);
    };

    socket.onerror = (error) => {
        console.error("WebSocket error:", error);
    };
}

export function sendInput(action: any): void {
    socket.send(JSON.stringify(action));
}

function updateGameObjects(gameState: any): void {
    // Update game objects based on the state received from the server
    // For example, update positions of paddles and ball
}

