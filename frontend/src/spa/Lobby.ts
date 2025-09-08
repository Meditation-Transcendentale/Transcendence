import { Matrix } from "../babyImport";
import { App3D } from "../3d/App";
import { decodeServerMessage, encodeClientMessage } from "./proto/helper";
// import { lobbyVue } from "../Vue";
import Router from "./Router";
import { User } from "./User";
import { getRequest } from "./requests";


interface lobbyHtmlReference {
	playersWindow: { html: HTMLDivElement, id: number }
	playersList: HTMLDivElement
}

enum lobbyState {
	none = 0,
	connect = 1,
	ready = 3
};

interface player {
	td: HTMLElement,
	name: HTMLElement,
	status: HTMLElement
}

export default class Lobby {
	private div: HTMLDivElement;
	private ref: lobbyHtmlReference;
	private css: HTMLLinkElement;

	private ws: WebSocket | null;
	private id: string | null;
	private mode: string | null;
	private state: lobbyState;

	private players: Map<string, player>;
	private gameIP = window.location.hostname;
	// private gameIP = "localhost";

	constructor(div: HTMLDivElement) {
		this.div = div;
		this.ws = null;
		this.id = null;
		this.mode = null;
		this.state = lobbyState.none;

		this.players = new Map<string, player>;

		this.css = div.querySelector("link") as HTMLLinkElement;

		this.ref = {
			playersWindow: { html: div.querySelector("#players-window") as HTMLDivElement, id: -1 },
			playersList: div.querySelector("#players-list") as HTMLDivElement
		};

		this.ref.playersWindow.id = App3D.addCSS3dObject({
			html: this.ref.playersWindow.html,
			width: 1,
			height: 1,
			world: Matrix.RotationY(Math.PI).multiply(Matrix.Translation(0, 9, -40)),
			enable: false
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
		this.id = params.get("id") as string;
		this.setupWs(this.id);
		this.ref.playersList.innerHTML = "";

		this.createPlayerDiv(User.uuid as string, false, true);

		document.body.appendChild(this.css);
		App3D.setVue("lobby");
		App3D.setCSS3dObjectEnable(this.ref.playersWindow.id, true);
	}

	public async unload() {
		App3D.setCSS3dObjectEnable(this.ref.playersWindow.id, false);
		this.ws?.send(encodeClientMessage({ quit: { lobbyId: this.id as string, uuid: User.uuid } }));
		this.ws?.close();
		this.css.remove();
		this.players.clear();
	}

	private setupWs(id: string) {
		//const url = `wss://${this.gameIP}:5011/lobbies?uuid=${encodeURIComponent(User.uuid as string)}&lobbyId=${encodeURIComponent(id as string)}`;
		const url = `wss://${window.location.hostname}:7000/lobbies?uuid=${encodeURIComponent(User.uuid as string)}&lobbyId=${encodeURIComponent(id as string)}`;
		console.log("URL", url);
		this.ws = new WebSocket(url);
		this.ws.binaryType = "arraybuffer";

		this.ws.onopen = (e) => {
			console.log(e);
			console.log("OPEN");
			this.state = lobbyState.connect;
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
				this.mode = payload.update.mode as string;
				this.updatePlayers(payload.update.players as Array<{ uuid: string, ready: boolean }>);
				console.log(`Update :${payload}`);
			}

			if (payload.start != null) {
				console.log("Everyone is ready");
				const gameId = payload.start.gameId;
				const map = "default"; //payload.start.map;
				if (this.mode === 'br')
					Router.nav(encodeURI(`/test?id=${gameId}&mod=${this.mode}&map=${map}`), false, true);
				else
					Router.nav(encodeURI(`/game?id=${gameId}&mod=${this.mode}&map=${map}`), false, true);
				this.ws?.close();
			}

			if (payload.startTournament != null) {
				const tournamentId = payload.startTournament.tournamentId;
				Router.nav(encodeURI(`/tournament?id=${tournamentId}`), false, true);
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

	private updatePlayers(r: Array<{ uuid: string, ready: boolean }>) {
		for (let i = 0; i < r.length; i++) {
			if (this.players.has(r[i].uuid)) {
				this.players.get(r[i].uuid)!.status.innerText = (r[i].ready ? "yes" : "no");

			} else {
				this.createPlayerDiv(r[i].uuid, r[i].ready, false);
			}
		}
		for (let i of this.players.keys()) {
			let checked = false;
			for (let y = 0; y < r.length; y++) {
				checked = checked || (i == r[y].uuid);
			}
			if (!checked) {
				console.log("destroy");
				this.players.get(i)!.td.remove();
				this.players.delete(i);
			}
		}
	}

	private async createPlayerDiv(uuid: string, ready: boolean, self: boolean) {
		const div = document.createElement('tr');
		const name = document.createElement('td');
		const status = document.createElement('td');

		name.className = "username";
		status.className = "status";

		const rep = await getRequest(`info/uuid/${uuid}`).catch((err) => console.log(err)) as any;
		name.innerText = rep.username; //NEED TO IMPLEMENT A ROUTE GET /userinfo/:uuid to get Username from uuid
		status.innerText = (ready ? "yes" : "no");
		if (self) {
			status.addEventListener("click", () => {
				this.ws?.send(encodeClientMessage({ ready: { lobbyId: this.id as string } }));
			}, { once: true });
			status.toggleAttribute("click");
		}
		div.appendChild(name);
		div.appendChild(status);
		this.ref.playersList.appendChild(div);

		this.players.set(uuid, { td: div, name: name, status: status });
	}

	private async wsSend(type: string) {
		console.log("Lobby: ws send " + type);
		const msg = JSON.stringify({ type: type, lobbyId: this.id, userId: User.uuid });
		if (this.ws) { this.ws?.send(msg); }
	}


}
