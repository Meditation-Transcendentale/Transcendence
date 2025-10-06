import { IStream } from "./IStream";

export class BuilderStream implements IStream {
	public ws: WebSocket | null;
	public connected: boolean;

	constructor() {
		this.ws = null;
		this.connected = false;
	}

	connect(): void {
		this.ws = new WebSocket(`wss://${window.location.hostname}:7000/ws`);
		this.ws.onopen = () => console.log('Connected securely via WSS');
		this.ws.onmessage = (event) => {
			console.log(event.data);
			if (event.data === 'reload') window.location.reload();
		};
		this.connected = true;
	}

	disconnect(): void {
		this.ws?.close();
		this.connected = false;
	}

}
