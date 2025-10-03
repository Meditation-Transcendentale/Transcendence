import { BuilderStream } from "./BuilderStream";
import { LobbyStream } from "./LobbyStream";
import { NotificationStream } from "./NotificationStream";

class StreamManager {
	public builder: BuilderStream;
	public notification: NotificationStream;
	public lobby: LobbyStream;
	// private pongWs?: WebSocket
	// private brWs?: WebSocket

	constructor() {
		console.log("%c STREAM Manager", "color: white; background-color: red");

		this.builder = new BuilderStream();
		this.notification = new NotificationStream();
		this.lobby = new LobbyStream();
	}
}

export const streamManager = new StreamManager();
