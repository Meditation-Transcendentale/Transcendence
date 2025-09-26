import { Matrix } from "../babyImport";
import { App3D } from "../3d/App";
import { decodeServerMessage, encodeClientMessage } from "./proto/helper";
// import { lobbyVue } from "../Vue";
import Router from "./Router";
import { User } from "./User";
import { getRequest, postRequest } from "./requests";
import { gFriendList } from "./Friendlist";
import { gAth } from "./Ath";


interface lobbyHtmlReference {
	playersWindow: { html: HTMLDivElement, id: number }
	infoWindow: { html: HTMLDivElement, id: number }
	inviteWindow: { html: HTMLDivElement, id: number }
	playersList: HTMLDivElement
	lobbyMode: HTMLSpanElement
	lobbyMap: HTMLSpanElement
	lobbyId: HTMLSpanElement
	lobbyIdCopy: HTMLButtonElement
	inviteList: HTMLDivElement
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
	private map: string | null;
	private state: lobbyState;

	private players: Map<string, player>;
	private gameIP = window.location.hostname;
	// private gameIP = "localhost";

	constructor(div: HTMLDivElement) {
		this.div = div;
		this.ws = null;
		this.id = null;
		this.mode = null;
		this.map = null;
		this.state = lobbyState.none;

		this.players = new Map<string, player>;

		this.css = div.querySelector("link") as HTMLLinkElement;

		this.ref = {
			playersWindow: { html: div.querySelector("#players-window") as HTMLDivElement, id: -1 },
			infoWindow: { html: div.querySelector("#info-window") as HTMLDivElement, id: -1 },
			inviteWindow: { html: div.querySelector("#invite-window") as HTMLDivElement, id: -1 },
			playersList: div.querySelector("#players-list") as HTMLDivElement,
			lobbyMode: div.querySelector("#lobby-mode") as HTMLSpanElement,
			lobbyMap: div.querySelector("#lobby-map") as HTMLSpanElement,
			lobbyId: div.querySelector("#lobby-id-text") as HTMLSpanElement,
			lobbyIdCopy: div.querySelector("#lobby-id-copy") as HTMLButtonElement,
			inviteList: div.querySelector("#invite-list") as HTMLDivElement
		};

		this.ref.playersWindow.id = App3D.addCSS3dObject({
			html: this.ref.playersWindow.html,
			width: 1,
			height: 1,
			world: Matrix.RotationY(Math.PI).multiply(Matrix.Translation(0, 9, -40)),
			enable: false
		});
		this.ref.infoWindow.id = App3D.addCSS3dObject({
			html: this.ref.infoWindow.html,
			width: 1,
			height: 1,
			world: Matrix.RotationY(5 * Math.PI / 4).multiply(Matrix.Translation(5, 10, -40)),
			enable: false
		});
		this.ref.inviteWindow.id = App3D.addCSS3dObject({
			html: this.ref.inviteWindow.html,
			width: 1,
			height: 1,
			world: Matrix.RotationY(3 * Math.PI / 4).multiply(Matrix.Translation(-5, 8, -40)),
			enable: false
		});
		console.log(` invite = ${this.ref.inviteWindow.id} info = ${this.ref.infoWindow.id} `);
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
		this.map = params.get("map") as string;
		console.log(`LOBBY MAP = ${this.map}`);
		this.ref.playersList.innerHTML = "";
		this.setupWs(this.id);
		this.ref.lobbyId.innerHTML = `${this.id}`;

		document.body.appendChild(this.css);


		App3D.setVue("lobby");
		App3D.setCSS3dObjectEnable(this.ref.playersWindow.id, true);
		App3D.setCSS3dObjectEnable(this.ref.infoWindow.id, true);
		App3D.setCSS3dObjectEnable(this.ref.inviteWindow.id, true);

		this.ref.lobbyIdCopy.addEventListener("click", () => {
			navigator.clipboard.writeText(this.id);
		})

	}

	public async unload() {
		App3D.setCSS3dObjectEnable(this.ref.playersWindow.id, false);
		App3D.setCSS3dObjectEnable(this.ref.infoWindow.id, false);
		App3D.setCSS3dObjectEnable(this.ref.inviteWindow.id, false);
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
				if (this.mode != "ai" && this.mode != "local") {
					this.initInviteList();
				}
				this.ref.lobbyMode.innerHTML = `MODE : ${this.mode}`;
				this.map = payload.update.map as string;
				this.ref.lobbyMap.innerHTML = `MAP : ${this.map}`;
				console.log(this.map);
				this.updatePlayers(payload.update.players as Array<{ uuid: string, ready: boolean }>);
				console.log(`Update :${payload}`);
			}

			if (payload.start != null) {
				console.log("Everyone is ready");
				const gameId = payload.start.gameId;
				if (this.mode === 'br')
					Router.nav(encodeURI(`/test?id=${gameId}&mod=${this.mode}&map=${this.map}`), false, true);
				else
					Router.nav(encodeURI(`/cajoue?id=${gameId}&mod=${this.mode}&map=${this.map}`), false, true);
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
				this.createPlayerDiv(r[i].uuid, r[i].ready);
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

	private async createPlayerDiv(uuid: string, ready: boolean) {
		const self = User.uuid == uuid;
		const div = document.createElement('tr');
		const name = document.createElement('td');
		const status = document.createElement('td');

		name.className = "username";
		status.className = "status";

		console.log(`POST UUID = ${uuid}`);
		// const rep = await getRequest(`info/uuid/${uuid}`).catch((err) => console.log(err)) as any;
		const rep = await postRequest("info/search", { identifier: uuid, type: "uuid" }).catch((err) => console.log(err)) as any;
		name.innerText = rep.data.username; //NEED TO IMPLEMENT A ROUTE GET /userinfo/:uuid to get Username from uuid
		status.innerText = (ready ? "yes" : "no");
		if (self) {
			status.addEventListener("click", () => {
				this.ws?.send(encodeClientMessage({ ready: { lobbyId: this.id as string } }));
			}, { once: true });
			status.toggleAttribute("click");
		}
		div.appendChild(name);
		div.appendChild(status);
		if (self) {
			this.ref.playersList.prepend(div);
		} else {
			this.ref.playersList.appendChild(div);
		}

		this.players.set(uuid, { td: div, name: name, status: status });
	}

	private async wsSend(type: string) {
		console.log("Lobby: ws send " + type);
		const msg = JSON.stringify({ type: type, lobbyId: this.id, userId: User.uuid });
		if (this.ws) { this.ws?.send(msg); }
	}

	private initInviteList() {
		this.ref.inviteList.innerHTML = "";
		const uuids = gFriendList.onlineFriends;
		for (let i of uuids) {
			this.createPlayerInvite(i[0]);
		}
	}

	private createPlayerInvite(uuid: string) {
		postRequest("info/search", { identifier: uuid, type: "uuid" })
			.then((json: any) => {
				const d = document.createElement("div");
				const u = document.createElement("input");
				const i = document.createElement("input");
				u.type = "button";
				u.value = json.data.username;
				i.type = "button";
				i.value = "invite";
				u.addEventListener("click", () => {
					gAth.loadProfile(uuid);
				})
				i.addEventListener("click", () => {
					alert("need a way to invite");
				})
				d.appendChild(u);
				d.appendChild(i);
				this.ref.inviteList.appendChild(d);
			})
	}
}
