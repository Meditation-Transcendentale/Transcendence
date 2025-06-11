import { decodeServerMessage, encodeClientMessage } from "../encode/helper";
import Router from "./Router";
import { User } from "./User";


interface tournamentHtmlReference {
	ready: HTMLInputElement;
	quit: HTMLInputElement;
	tree: HTMLDivElement;
}




export default class Tournament {
	private div: HTMLDivElement;
	private ref: tournamentHtmlReference;
	private ws: WebSocket | null;
	private id: string | null;
	private mode: string | null; //

	private gameIP = window.location.hostname;

	constructor(div: HTMLDivElement) {
		this.div = div;
		this.ws = null;
		this.id = null;
		this.mode = null;

		this.ref = {
			ready: div.querySelector("#tournament-ready") as HTMLInputElement,
			quit: div.querySelector("#tournament-quit") as HTMLInputElement,
			tree: div.querySelector("#tournament-tree") as HTMLDivElement
		};

		this.ref.ready.addEventListener("click", () => {
			this.ws?.send(encodeClientMessage({ ready: { tournamentId: this.id as string } })); //encodeClientMessage to fix
		})

		this.ref.quit.addEventListener("click", () => {
			this.ws?.close();
			User.status = null;
			Router.nav(`/play`, false, false); //
		})

		this.ref.tree
	}


	public load(params: URLSearchParams) {
		if (!this.ws) {
			this.ref.ready.disabled = true;
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
		const url = `ws://${this.gameIP}:5019/tournament?uuid=${encodeURIComponent(User.uuid as string)}&tournamentId=${encodeURIComponent(id as string)}`;
		console.log("URL", url);
		this.ws = new WebSocket(url);
		this.ws.binaryType = "arraybuffer";

		this.ws.onopen = (e) => {
			console.log(e);
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
				Router.nav("/home/play");
				return;
			}

			if (payload.update != null) {
				// this.mode = payload.update.mode;
				// console.log(`Update :${payload}`);
			}

			if (payload.start != null) {
				const gameId = payload.start.gameId;
				const map = "default"; //payload.start.map;
				Router.nav(encodeURI(`/game?id=${gameId}&mod=${this.mode}&map=${map}`), false, false);
				this.ws?.close();
			}
		}

		this.ws.onclose = () => {
			this.id = null;
			this.ws = null;
			User.status = null;
		}

		this.ws.onerror = (err) => {
			console.warn(err);
		}
    }
}
