import { decodeServerMessage, encodeClientMessage } from "../encode/helper";
import Router from "./Router";
import { User } from "./User";


interface lobbyHtmlReference {
	ready: HTMLInputElement;
	quit: HTMLInputElement;
	list: HTMLDivElement;
}

enum lobbyState {
	none = 0,
	connect = 1,
	ready = 3
};



export default class Lobby {
	private div: HTMLDivElement;
	private ref: lobbyHtmlReference;
	private ws: WebSocket | null;
	private id: string | null;
	private mode: string | null;
	private state: lobbyState;

	private gameIP = "10.19.219.221";
	// private gameIP = "localhost";

	constructor(div: HTMLDivElement) {
		this.div = div;
		this.ws = null;
		this.id = null;
		this.mode = null;
		this.state = lobbyState.none;

		this.ref = {
			ready: div.querySelector("#lobby-ready") as HTMLInputElement,
			quit: div.querySelector("#lobby-quit") as HTMLInputElement,
			list: div.querySelector("#lobby-player-list") as HTMLDivElement
		};

		this.ref.ready.addEventListener("click", () => {
			this.ws?.send(encodeClientMessage({ ready: { lobbyId: this.id as string } }));
			console.log("je suis la")
		})

		this.ref.quit.addEventListener("click", () => {
			this.ws?.close();
			User.status = null;
			Router.nav(`/play`, false, false);
		})
	}


	public load(params: URLSearchParams) {
		if (!this.ws) {
			this.ref.ready.disabled = true;
			this.state = lobbyState.none;
			this.setupWs(params.get("id") as string);
		} else if (this.id && this.id == params.get("id")) {
			//nav to past lobby
		}
		document.querySelector('#home-container')?.appendChild(this.div);
	}

	public async unload() {
		this.div.remove();
	}

	private setupWs(id: string) {
		const url = `ws://${this.gameIP}:5011/lobbies?uuid=${encodeURIComponent(User.uuid as string)}&lobbyId=${encodeURIComponent(id as string)}`;
		console.log("URL", url);
		this.ws = new WebSocket(url);
		this.ws.binaryType = "arraybuffer";

		this.ws.onopen = (e) => {
			console.log(e);
			console.log("OPEN");
			this.state = lobbyState.connect;
			this.ref.ready.disabled = false;
			User.status = { lobby: id };
		}

		this.ws.onmessage = (msg) => {
			const buf = new Uint8Array(msg.data as ArrayBuffer);
			const payload = decodeServerMessage(buf);
			console.log('Raw message data:', new Uint8Array(msg.data));
			console.log('Decoded payload:', payload);
			if (payload.error != null) {
				this.id = null;
				this.ws?.close();
				this.ws = null;
				this.state = 0;
				Router.nav("/home/play");
				return;
			}

			if (payload.update != null) {
				this.mode = payload.update.mode;
				console.log(`Update :${payload}`);
			}

			if (payload.start != null) {
				console.log("Everyone is ready");
				const gameId = payload.start.gameId;
				const map = "default"; //payload.start.map;
				Router.nav(encodeURI(`/game?id=${gameId}&mod=${this.mode}&map=${map}`), false, false);
				this.ws?.close();
			}
		}

		this.ws.onclose = () => {
			this.id = null;
			this.ws = null;
			console.log("WS CLOSE");
			User.status = null;
		}

		this.ws.onerror = (err) => {
			console.warn(err);
		}
	}

	private async wsSend(type: string) {
		console.log("Lobby: ws send " + type);
		const msg = JSON.stringify({ type: type, lobbyId: this.id, userId: User.uuid });
		if (this.ws) { this.ws?.send(msg); }
	}


}
