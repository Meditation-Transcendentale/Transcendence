import { connected } from "process";
import { stateManager } from "../state/StateManager";
import { User } from "../User";
import { IStream } from "./IStream";
import { decodeTournamentServerMessage, encodeTournamentClientMessage } from "../networking/helper";
import { tournament } from "../networking/message";
import { htmlManager } from "../html/HtmlManager";
import { routeManager } from "../route/RouteManager";
import { TournamentServerMessage, TournamentServerUpdate } from "../html/TournamentHtml";

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
		const url = `${this.url}?uuid=${encodeURIComponent(User.uuid as string)}&tournamentId=${encodeURIComponent(stateManager.tournamentId)}`

		this.ws = new WebSocket(url);
		this.ws.binaryType = "arraybuffer";

		this.connected = true;
		this.ws.onmessage = (msg) => { this.onMessage(msg) };

		this.ws.onerror = () => { console.log("tournament stream error") };

		this.ws.onclose = () => { this.connected = false; /*htmlManager.tournament.close()*/ };

	}

	public disconnect(): void {
		if (!this.connected)
			return;
		this.connected = false;
		this.ws?.close();
		this.ws = null;
	}

	public onMessage(msg: MessageEvent) {
		const buf = new Uint8Array(msg.data as ArrayBuffer);
		if (!buf) return;
		const payload = decodeTournamentServerMessage(new Uint8Array(buf)) as TournamentServerMessage;

		if (payload.update) {
			console.log(`UPDATE RECEIVED: ${payload.update.tournamentRoot}`);
			htmlManager.tournament.update(payload.update);
		}
		if (payload.readyCheck) {
			htmlManager.tournament.readyCheck(payload.readyCheck);
			console.log(`READY CHECK RECEIVED: ${payload.readyCheck.deadlineMs}`);
		}
		if (payload.startGame) {
			console.log(`START GAME RECEIVED`);
			stateManager.gameId = payload.startGame.gameId;
			stateManager.gameMap = "void";
			stateManager.gameMode = "tournament";
			routeManager.comebackRoute = "/tournament";
			routeManager.nav("/pong");
			this.disconnect();
		};
		if (payload.finished) {
			htmlManager.tournament.finished();
		}
		htmlManager.tournament.render();
	}

	public ready() {
		const buf = encodeTournamentClientMessage({ ready: {} });
		this.ws?.send(buf);
	}

	public quit() {
		const buf = encodeTournamentClientMessage({ ready: {} });
		this.ws?.send(buf);
	}

	public spectate() {
		routeManager.comebackRoute = "/tournament";
		routeManager.nav("/pong");
		this.disconnect();
	}
}
