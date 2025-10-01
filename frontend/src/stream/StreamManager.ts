class StreamManager {
	private builderWs: WebSocket | null;
	private notificationWs: WebSocket | null;
	private lobbyWs: WebSocket | null;
	// private pongWs?: WebSocket
	// private brWs?: WebSocket

	constructor() {
		console.log("%c STREAM Manager", "color: white; background-color: red");
		this.builderWs = null;
		this.notificationWs = null;
		this.lobbyWs = null;
	}

	public connectBuilder() {
		this.builderWs = new WebSocket(`wss://${window.location.hostname}:7000/ws`);
		this.builderWs.onopen = () => console.log('Connected securely via WSS');
		this.builderWs.onmessage = (event) => {
			console.log(event.data);
			if (event.data === 'reload') window.location.reload();
		};
	}

	public connectLobby() { }

	public connectNotification() { }

	public disconnectBuilder() { }

	public disconnectLobby() { }

	public disconnectNotification() { }
}


let g_StreamManager: StreamManager | null = null;

export function createStreamManager(): StreamManager {
	if (g_StreamManager === undefined || g_StreamManager === null) {
		g_StreamManager = new StreamManager();
		//Object.freeze(g_StreamManager) // Not sure if necessary or working
	}
	return g_StreamManager;
}

export const streamManager = new StreamManager();
