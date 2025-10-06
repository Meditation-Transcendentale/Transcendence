import { Matrix } from "../babyImport";
import { App3D } from "../3d/App";
import { decodeServerMessage, encodeClientMessage } from "../../networking/helper";
// import { lobbyVue } from "../Vue";
import Router from "./Router";
import { User } from "./User";
import { getRequest, postRequest } from "./requests";
import { gFriendList } from "./Friendlist";
import { gAth } from "./Ath";
import { streamManager } from "../../stream/StreamManager";
import { lobby } from "../../networking/message";
import { stateManager } from "../../state/StateManager";
import { gUser } from "../../User";


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
	private invites: Map<string, HTMLDivElement>;
	private gameIP = window.location.hostname;
	// private gameIP = "localhost";
	//
	private needUpdateInvite: boolean;

	constructor(div: HTMLDivElement) {
		this.div = div;
		this.ws = null;
		this.id = null;
		this.mode = null;
		this.map = null;
		this.state = lobbyState.none;

		this.players = new Map<string, player>;
		this.invites = new Map<string, HTMLDivElement>

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
			world: Matrix.RotationY(-Math.PI * 0.3).multiply(Matrix.Translation(5, 5, 1)),
			enable: false
		});
		this.ref.infoWindow.id = App3D.addCSS3dObject({
			html: this.ref.infoWindow.html,
			width: 1,
			height: 1,
			world: Matrix.RotationY(-Math.PI * 0.2).multiply(Matrix.Translation(4.5, 9, 12)),
			enable: false
		});
		this.ref.inviteWindow.id = App3D.addCSS3dObject({
			html: this.ref.inviteWindow.html,
			width: 1,
			height: 1,
			world: Matrix.RotationY(-Math.PI * 0.5).multiply(Matrix.Translation(15, 5, 0)),
			enable: false
		});
		console.log(` invite = ${this.ref.inviteWindow.id} info = ${this.ref.infoWindow.id} `);

		this.needUpdateInvite = false;
	}


	public load(params: URLSearchParams) {
		this.needUpdateInvite = true;
		streamManager.lobby.connect();
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
		this.ref.inviteList.innerHTML = "";

		document.body.appendChild(this.css);


		App3D.setVue("lobby");
		App3D.setCube("ready", () => {
			if (this.ws != null) {
				this.ws?.send(encodeClientMessage({ ready: { lobbyId: this.id as string } }));
				App3D.setCube("");
			}
		})
		App3D.setCSS3dObjectEnable(this.ref.playersWindow.id, true);
		App3D.setCSS3dObjectEnable(this.ref.infoWindow.id, true);

		if (this.mode != "ai" && this.mode != "local") {
		}

		this.ref.lobbyIdCopy.addEventListener("click", () => {
			navigator.clipboard.writeText(this.id as string);
		})

	}

	public async unload() {
		App3D.setCube("");
		App3D.setCSS3dObjectEnable(this.ref.playersWindow.id, false);
		App3D.setCSS3dObjectEnable(this.ref.infoWindow.id, false);
		App3D.setCSS3dObjectEnable(this.ref.inviteWindow.id, false);
		this.ws?.send(encodeClientMessage({ quit: { lobbyId: this.id as string, uuid: User.uuid } }));
		this.ws?.close();
		this.css.remove();
		this.players.clear();
	}

	public update(payload: lobby.IUpdateMessage) {
		if (stateManager.get("mod") === "ai" || stateManager.get("mod") === "local")
			this.needUpdateInvite = false;
		if (this.needUpdateInvite)
			this.updateInvite(payload.players as lobby.IPlayer[]);
		this.updatePlayers(payload.players as lobby.IPlayer[]);

	}

	private updatePlayers(players: lobby.IPlayer[]) {
		for (let i = 0; i < players.length; i++) {
			if (this.players.has(players[i].uuid as string)) {
				this.players.get(players[i].uuid as string)!.status.innerText = (players[i].ready ? "yes" : "no");

			} else {
				this.createPlayerDiv(players[i]);
			}
		}
		for (let i of this.players.keys()) {
			let checked = false;
			for (let y = 0; y < players.length; y++) {
				checked = checked || (i == players[y].uuid as string);
			}
			if (!checked) {
				this.players.get(i)!.td.remove();
				this.players.delete(i);
			}
		}
	}

	private async createPlayerDiv(player: lobby.IPlayer) {
		const self = User.uuid == player.uuid;
		const div = document.createElement('tr');
		const name = document.createElement('td');
		const status = document.createElement('td');

		this.players.set(player.uuid as string, { td: div, name: name, status: status });

		name.className = "username";
		status.className = "status";

		console.log(`POST UUID = ${player.uuid}`);
		const rep = await postRequest("info/search", { identifier: player.uuid, type: "uuid" }).catch((err) => console.log(err)) as any;
		name.innerText = rep.data.username; //NEED TO IMPLEMENT A ROUTE GET /userinfo/:uuid to get Username from uuid
		status.innerText = (player.ready ? "yes" : "no");
		if (self) {
			status.addEventListener("click", () => {
				streamManager.lobby.ready();
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

	}


	private updateInvite(players: lobby.IPlayer[]) {
		this.ref.inviteList.innerHTML = "";
		const uuids = gUser.friendlist.onlineFriends;
		for (let i of uuids) {
			let b = true;
			for (let y = 0; y < players.length; y++) {
				if (players[y].uuid == i[0]) {
					b = false;
					this.invites.get(i[0])?.remove();
					this.invites.delete(i[0]);
					break;
				}
			}
			if (b)
				this.createPlayerInvite(i[0]);
		}
	}

	private createPlayerInvite(uuid: string) {
		const d = document.createElement("div");
		this.invites.set(uuid, d);
		postRequest("info/search", { identifier: uuid, type: "uuid" })
			.then((json: any) => {
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
