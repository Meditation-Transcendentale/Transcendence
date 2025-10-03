import { htmlManager } from "../html/HtmlManager";
import { NotificationType } from "../html/NotificationHtml";
import { decodeServerMessage, encodeClientMessage } from "../networking/helper";
import { routeManager } from "../route/RouteManager";
import { stateManager } from "../state/StateManager";
import { gUser } from "../User";
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

		const url = `${this.url}${encodeURIComponent(gUser.uuid as string)}&lobbyId=${stateManager.get("lobbyId")}`;

		this.ws = new WebSocket(url);
		this.ws.binaryType = "arraybuffer";

		this.ws.onopen = () => {
			htmlManager.notification.add({ type: NotificationType.text, text: "Lobby joined successfully!" });
		}

		this.ws.onmessage = this.onMessage;

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
		this.ws?.send(encodeClientMessage({ ready: { lobbyId: stateManager.get("lobbyId") } }));
	}

	private onMessage(msg: MessageEvent) {
		const buf = new Uint8Array(msg.data as ArrayBuffer);
		const payload = decodeServerMessage(buf);
		// console.log('Decoded payload:', payload);
		if (payload.error != null) {
			this.disconnect();
			routeManager.nav("/play");
		}

		if (payload.update != null) {
			stateManager.set("mode", payload.update.mode);
			stateManager.set("map", payload.update.map);
			// htmlManager.lobby.update(payload.update);
		}

		if (payload.start != null) {
			console.log("Everyone is ready");
			stateManager.set("gameId", payload.start.gameId);
			if (stateManager.get("mode") === "br")
				routeManager.nav("/test", false, true);
			else
				routeManager.nav("/cajoue", false, true);
			this.disconnect();
		}

		if (payload.startTournament != null) {
			stateManager.set("tournamentId", payload.startTournament.tournamentId);
			routeManager.nav("/tournament", false, true);
			this.disconnect();
		}
	}
}
