import { connected } from "process";
import { stateManager } from "../state/StateManager";
import { User } from "../User";
import { IStream } from "./IStream";
import {
	decodeTournamentServerMessage,
	encodeTournamentClientMessage,
} from "../networking/helper";
import { tournament } from "../networking/message";
import { htmlManager } from "../html/HtmlManager";
import { routeManager } from "../route/RouteManager";
import {
	TournamentServerMessage,
	TournamentServerUpdate,
} from "../html/TournamentHtml";
import { NotificationType } from "../html/NotificationHtml";

export class TournamentStream implements IStream {
	public ws: WebSocket | null;
	public connected: boolean;

	private url = `wss://${window.location.hostname}:7000/sacrifice`;

	constructor() {
		this.ws = null;
		this.connected = false;
	}

	public connect(): void {
		if (this.connected) {
			return;
		}
		const url = `${this.url}?uuid=${encodeURIComponent(
			User.uuid as string
		)}&tournamentId=${encodeURIComponent(stateManager.tournamentId)}`;

		this.ws = new WebSocket(url);
		this.ws.binaryType = "arraybuffer";
		stateManager.gameId = "";

		this.connected = true;
		this.ws.onmessage = (msg) => {
			this.onMessage(msg);
		};

		this.ws.onerror = () => {
		};

		this.ws.onclose = () => {
			this.connected = false;
		};
	}

	public disconnect(): void {
		if (!this.connected) return;
		this.connected = false;
		this.ws?.close();
		this.ws = null;
	}

	public onMessage(msg: MessageEvent) {
		const buf = new Uint8Array(msg.data as ArrayBuffer);
		if (!buf) return;
		const payload = decodeTournamentServerMessage(
			new Uint8Array(buf)
		) as TournamentServerMessage;

		if (payload.update) {
			htmlManager.tournament.update(payload.update);
			if (payload.update.tournamentRoot.winnerId)
				htmlManager.tournament.finished();
			else {
				htmlManager.tournament.render();
			}
		}
		if (payload.readyCheck) {
			htmlManager.tournament.readyCheck(payload.readyCheck);
		}
		if (payload.startGame) {
			stateManager.gameId = payload.startGame.gameId;
			stateManager.gameMap = "grass";
			stateManager.gameMode = "tournament";
			routeManager.comebackRoute = "/tournament";
			routeManager.nav("/pong", false, false, true);
			this.disconnect();
		}
		if (payload.finished) {
			routeManager.nav("/play", false, false, true);
			htmlManager.notification.add({ type: NotificationType.error, error: "A player was not ready" });
			this.disconnect();
		}
	}

	public ready() {
		const buf = encodeTournamentClientMessage({ ready: {} });
		this.ws?.send(buf);
	}

	public quit() {
		const buf = encodeTournamentClientMessage({ ready: {} });
		this.ws?.send(buf);
	}

	public spectate(gameId: string) {
		stateManager.gameId = gameId;
		stateManager.gameMap = "grass";
		stateManager.gameMode = "tournament";
		routeManager.comebackRoute = "/tournament";
		routeManager.nav("/pong");
		this.disconnect();
	}
}
