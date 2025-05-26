export class WebSocketManager {
	public socket: WebSocket;
	private messageQueue: any[] = [];

	constructor(url: string) {
		console.log("websocket connection..");
		this.socket = new WebSocket(url);
		this.socket.binaryType = 'arraybuffer'; // set binary mode
		this.socket.onopen = () => console.log("Connected to server");

		this.socket.onmessage = (event) => {
			this.handleMessage(event.data);
		};

		this.socket.onerror = (error) => console.error("WebSocket error", error);
	}

	private handleMessage(data: any): void {
		this.messageQueue.push(data);
	}

	getMessages(): any[] {
		const messages = [...this.messageQueue];
		this.messageQueue = [];
		return messages;
	}

	send(data: any): void {
		if (this.socket.readyState === WebSocket.OPEN) {
			this.socket.send(JSON.stringify(data));
		}
	}
}
