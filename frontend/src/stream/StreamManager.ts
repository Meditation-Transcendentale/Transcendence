import { BuilderStream } from "./BuilderStream";
import { LobbyStream } from "./LobbyStream";
import { NotificationStream } from "./NotificationStream";
import { TournamentStream } from "./TournamentStream";

class StreamManager {
	public builder: BuilderStream;
	public notification: NotificationStream;
	public lobby: LobbyStream;
	public tournament: TournamentStream;
	// private pongWs?: WebSocket
	// private brWs?: WebSocket

	constructor() {
		console.log("%c STREAM Manager", "color: white; background-color: red");

		this.builder = new BuilderStream();
		this.notification = new NotificationStream();
		this.lobby = new LobbyStream();
		this.tournament = new TournamentStream();
	}
}

export const streamManager = new StreamManager();
