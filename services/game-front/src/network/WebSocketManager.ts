export class WebSocketManager {
	public socket: WebSocket;
	private messageQueue: any[] = [];

	constructor(url: string) {
		this.socket = new WebSocket(url);
		// Set the binary type to 'arraybuffer'
		this.socket.binaryType = 'arraybuffer';
		this.socket.onopen = () => console.log("Connected to server");

		this.socket.onmessage = (event) => {
			let data: any;
			if (typeof event.data === 'string') {
				try {
					data = JSON.parse(event.data);
				} catch (e) {
					console.error("Error parsing JSON message:", e);
					return;
				}
			} else {
				data = event.data;
			}
			this.handleMessage(data);
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
			// If data is an object and not a binary type, send it as JSON.
			// if (typeof data === 'object' &&
			// 	!(data instanceof ArrayBuffer) &&
			// 	!Buffer?.isBuffer(data)) {
			this.socket.send(JSON.stringify(data));
			// } else {
			// 	this.socket.send(data);
			// }
		}
	}
}
// export class WebSocketManager {
//     public socket: WebSocket;
//     private messageQueue: any[] = [];
//
//     constructor(url: string) {
//         this.socket = new WebSocket(url);
//         this.socket.onopen = () => console.log("Connected to server");
//         this.socket.onmessage = (event) => {
//             const data = JSON.parse(event.data);
//             this.handleMessage(data);
//         };
//         this.socket.onerror = (error) => console.error("WebSocket error", error);
//     }
//
//     private handleMessage(data: any): void {
//         this.messageQueue.push(data);
//     }
//
//     getMessages(): any[] {
//         const messages = [...this.messageQueue];
//         this.messageQueue = [];
//         return messages;
//     }
//
//     send(data: any): void {
//         if (this.socket.readyState === WebSocket.OPEN) {
//             this.socket.send(JSON.stringify(data));
//         }
//     }
// }
