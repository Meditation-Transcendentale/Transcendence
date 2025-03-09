let socket: WebSocket;
let serverStateCallback: (serverState: any) => void;

export function setupNetwork(): void {
	socket = new WebSocket("ws://localhost:8080");

	socket.onopen = () => {
		console.log("Connected to server");
	};

	socket.onmessage = (event) => {
		const serverState = JSON.parse(event.data);
		if (serverStateCallback) {
			serverStateCallback(serverState);
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
