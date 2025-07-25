import { App3D } from "../3d/App";
import { decodeServerMessage, encodeClientMessage } from "../encode/helper";
// import { lobbyVue } from "../Vue";
import Router from "./Router";
import { User } from "./User";


interface lobbyHtmlReference {
	ready: HTMLInputElement;
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

	private gameIP = window.location.hostname;
	// private gameIP = "localhost";

	constructor(div: HTMLDivElement) {
		this.div = div;
		this.ws = null;
		this.id = null;
		this.mode = null;
		this.state = lobbyState.none;

		this.ref = {
			ready: div.querySelector("#ready-btn") as HTMLInputElement,
		};

		this.ref.ready.addEventListener("click", () => {
			this.ws?.send(encodeClientMessage({ ready: { lobbyId: this.id as string } }));
			console.log("je suis la")
		})

		App3D.setVue("lobby");

		const lobbyVue = App3D.getVue('lobby');
		lobbyVue.windowAddEvent('BACK', 'click', () => {
			Router.nav("/play", false, true);
		})
	}


	public load(params: URLSearchParams) {
		this.ws = null;
		this.id = null;
		this.mode = null;
		this.state = lobbyState.none;
		if (!params.has("id")) {
			console.error("Not id passed to lobby");
			//return;
		}
		App3D.loadVue("lobby");
		this.id = params.get("id") as string;
		this.setupWs(this.id);
		document.querySelector('#main-container')?.appendChild(this.div);
	}

	public async unload() {
		App3D.unloadVue("lobby");
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
				Router.nav("/play");
				return;
			}

			if (payload.update != null) {
				this.mode = payload.update.mode as null;
				console.log(`Update :${payload}`);
			}

			if (payload.start != null) {
				console.log("Everyone is ready");
				const gameId = payload.start.gameId;
				const map = "default"; //payload.start.map;
				if (this.mode === 'br')
					Router.nav(encodeURI(`/test?id=${gameId}&mod=${this.mode}&map=${map}`), false, true);
				if (this.mode === 'tournament')
					Router.nav(encodeURI(`/brick`), false, true);
				else
					Router.nav(encodeURI(`/game?id=${gameId}&mod=${this.mode}&map=${map}`), false, true);
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
