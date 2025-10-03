export interface IStream {
	ws: WebSocket | null;
	connected: boolean;
	connect(): void;
	disconnect(): void;
}
