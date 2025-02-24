export class WebSocketManager {
	private socket: WebSocket;
	private playerId: string = "";
	private onUpdateCallback: (data: any) => void = () => { };
	private lastServerTimestamp: number = 0;
	private latency: number = 0;

	constructor(serverUrl: string) {
		this.socket = new WebSocket(serverUrl);

		this.socket.onopen = () => console.log("Connected to WebSocket server");

		this.socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			const clientReceiveTime = Date.now();

			if (data.type === "assignPlayer") {
				this.playerId = data.playerId;
				console.log(`Assigned as ${this.playerId}`);
			}
			if (data.type === "update") {
				this.latency = clientReceiveTime - data.timestamp;
				this.lastServerTimestamp = data.timestamp;
				if (this.onUpdateCallback) this.onUpdateCallback(data);
			}
		};

		this.socket.onerror = (error) => console.error("WebSocket error:", error);
	}

	public sendMove(x: number): void {
		this.socket.send(JSON.stringify({ type: "move", playerId: this.playerId, x }));
	}

	public onUpdate(callback: (data: any) => void): void {
		this.onUpdateCallback = callback;
	}

	public getPlayerId(): string {
		return this.playerId;
	}
	public getLatency(): number {
		return this.latency;
	}
}

