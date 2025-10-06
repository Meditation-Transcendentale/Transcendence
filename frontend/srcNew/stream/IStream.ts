/**
 * Interface representing a WebSocket-based stream connection.
 *
 * Structure:
 * - `ws`: WebSocket | null — the underlying WebSocket instance or null if not connected
 * - `connected`: boolean — indicates the current connection status
 * - `connect()`: void — initiates the WebSocket connection
 * - `disconnect()`: void — closes the WebSocket connection
 */
export interface IStream {
	ws: WebSocket | null;
	connected: boolean;
	connect(): void;
	disconnect(): void;
}
