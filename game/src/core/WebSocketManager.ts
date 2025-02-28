export class WebSocketManager {
	private socket: WebSocket;
	private playerId: number;
	private onUpdateCallback: (data: any) => void = () => { };
	private lastServerTimestamp: number = 0;
	private latency: number = 0;

	private offset: number = 0; // In milliseconds; client time + offset ≈ server time.
	private pingStartTime: number = 0;

	constructor(serverUrl: string) {
		this.socket = new WebSocket(serverUrl);

		this.socket.onopen = () => {
			console.log("Connected to WebSocket server");
			setInterval(() => this.sendPing(), 2000);
		};

		this.socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			const clientReceiveTime = Date.now();

			if (data.type === "assignPlayer") {
				this.playerId = data.playerId;
				console.log(`Assigned as ${this.playerId}`);
			} else if (data.type === "update") {
				this.latency = clientReceiveTime - data.timestamp;
				this.lastServerTimestamp = data.timestamp;
				if (this.onUpdateCallback) this.onUpdateCallback(data);
			} else if (data.type === "pong") {
				const now = performance.now();
				const rtt = now - this.pingStartTime;
				this.offset = data.serverTime - (now - rtt / 2);
			}
		};

		this.socket.onerror = (error) => console.error("WebSocket error:", error);
	}

	public sendPing(): void {
		this.pingStartTime = performance.now();
		this.socket.send(JSON.stringify({ type: "ping" }));
	}

	public sendMove(x: number): void {
		this.socket.send(JSON.stringify({ type: "move", playerId: this.playerId, x }));
	}

	public onUpdate(callback: (data: any) => void): void {
		this.onUpdateCallback = callback;
	}

	public getPlayerId(): number {
		return this.playerId;
	}

	public getLatency(): number {
		return this.latency;
	}

	// New getter for the current offset. Add this offset to performance.now() in your render loop.
	public getOffset(): number {
		return this.offset;
	}
}
