import { htmlManager } from "../html/HtmlManager";
import { NotificationType } from "../html/NotificationHtml";
import { decodeServerMessage, encodeClientMessage } from "../networking/helper";
import { routeManager } from "../route/RouteManager";
import { stateManager } from "../state/StateManager";
import { User } from "../User";
import { IStream } from "./IStream";

export class LobbyStream implements IStream {
	public ws: WebSocket | null;
	public connected: boolean;

	public url = `wss://${window.location.hostname}:7000/lobbies?uuid=`;

	constructor() {
		this.ws = null;
		this.connected = false;
	}

	connect(): void {
		if (this.connected) {
			this.disconnect();
		}

		const url = `${this.url}${encodeURIComponent(User.uuid as string)}&lobbyId=${stateManager.lobbyId}`;

		this.ws = new WebSocket(url);
		this.ws.binaryType = "arraybuffer";

		this.ws.onopen = () => {
			htmlManager.notification.add({ type: NotificationType.text, text: "Lobby joined successfully!" });
		}

		this.ws.onmessage = (msg) => { this.onMessage(msg) };

		this.ws.onclose = () => {
			this.disconnect();
		}

		this.ws.onerror = (err) => {
			console.warn(err);
			this.disconnect();
			routeManager.nav("/play");
		}
		this.connected = true;
	}

	public disconnect(): void {
		this.ws?.close();
		this.ws = null;
		this.connected = false;
	}

	public ready() {
		this.ws?.send(encodeClientMessage({ ready: { lobbyId: stateManager.lobbyId } }));
	}

	public quit() {
		this.ws?.send(encodeClientMessage({ quit: { lobbyId: stateManager.lobbyId, uuid: User.uuid } }));
	}

	private onMessage(msg: MessageEvent) {
		const buf = new Uint8Array(msg.data as ArrayBuffer);
		const payload = decodeServerMessage(buf);

		console.log('Decoded payload:', payload);
		if (payload.error != null) {
			this.disconnect();
			routeManager.nav("/play");
		}

		if (payload.update != null) {
			stateManager.gameMode = payload.update.mode as string;
			stateManager.gameMap = payload.update.map as string;
			htmlManager.lobby.update(payload.update);
		}

		if (payload.start != null) {
			console.log("Everyone is ready");
			stateManager.gameId = payload.start.gameId as string;
			if (stateManager.gameMode === "br")
				routeManager.nav("/br", false, true);
			else
				routeManager.nav("/pong", false, true);
			this.disconnect();
		}

		if (payload.startTournament != null) {
			stateManager.tournamentId = payload.startTournament.tournamentId as string;
			routeManager.nav("/tournament", false, true);
			this.disconnect();
		}
	}
}
