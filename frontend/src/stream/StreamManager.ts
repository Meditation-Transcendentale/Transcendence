import { BuilderStream } from "./BuilderStream";

class StreamManager {
	public builder: BuilderStream;
	// private pongWs?: WebSocket
	// private brWs?: WebSocket

	constructor() {
		console.log("%c STREAM Manager", "color: white; background-color: red");

		this.builder = new BuilderStream();
	}
}

export const streamManager = new StreamManager();
