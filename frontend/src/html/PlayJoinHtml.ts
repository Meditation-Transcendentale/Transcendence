import { Matrix } from "../babylon";
import { getRequest, postRequest } from "../networking/request";
import { routeManager } from "../route/RouteManager";
import { sceneManager } from "../scene/SceneManager";
import { stateManager } from "../state/StateManager";
import { IHtml } from "./IHtml";


type lobby = {
	lobbyId: string,
	map: string,
	mode: string,
	players: string[]
}

interface listResp {
	lobbies: lobby[];
}

export class PlayJoinHtml implements IHtml {
	private css!: HTMLLinkElement;

	private lobbiesWindow!: HTMLDivElement;
	private inputWindow!: HTMLDivElement;
	private lobbyInfoWindow!: HTMLDivElement;
	private lobbiesList!: HTMLTableElement;
	private lobbyId!: HTMLInputElement;
	private lobbyInfo!: HTMLDivElement;

	private _update: boolean;


	constructor() {
		this._update = false;
	}

	public init(div: HTMLElement) {
		this.css = div.querySelector("link") as HTMLLinkElement;
		this.lobbiesWindow = div.querySelector("#join-list-container") as HTMLDivElement;
		this.inputWindow = div.querySelector("#join-input-container") as HTMLDivElement;
		this.lobbyInfoWindow = div.querySelector("#play-lobby-info") as HTMLDivElement;
		this.lobbiesList = div.querySelector("#join-list") as HTMLTableElement;
		this.lobbyId = div.querySelector("#join-id") as HTMLInputElement;
		this.lobbyInfo = div.querySelector("#lobby-info") as HTMLDivElement;

		sceneManager.css3dRenderer.addObject("join-list", {
			html: this.lobbiesWindow,
			width: 1.5,
			height: 1.5,
			world: Matrix.RotationY(Math.PI * 0.6).multiply(Matrix.Translation(-1, 4.5, 14)),
			enable: false
		})

		sceneManager.css3dRenderer.addObject("join-id", {
			html: this.inputWindow,
			width: 1.5,
			height: 1.5,
			world: Matrix.RotationY(Math.PI * 0.75).multiply(Matrix.Translation(0.5, 3, 10)),
			enable: false
		})

		this._update = false;

		// sceneManager.css3dRenderer.addObject("join-info", {
		// 	html: this.lobbyInfoWindow,
		// 	width: 1.5,
		// 	height: 1.5,
		// 	world: Matrix.RotationY(Math.PI * 1).multiply(Matrix.Translation(-20, 4, 24)),
		// 	enable: false
		// })
	}

	public load() {
		this._update = true;
		this.update();
		document.head.appendChild(this.css);
		sceneManager.css3dRenderer.setObjectEnable("join-list", true);
		sceneManager.css3dRenderer.setObjectEnable("join-id", true);
	}

	public unload() {
		this._update = false;
		sceneManager.css3dRenderer.setObjectEnable("join-list", false);
		sceneManager.css3dRenderer.setObjectEnable("join-id", false);
		this.css.remove();
	}

	private async update() {
		if (!this._update)
			return;
		const json: any = await getRequest("lobby/list", "no-cache")
			.catch((err) => { console.error(err); return null; });

		if (!json) {
			return;
		}
		this.parseListResp(json)
		setTimeout(() => { this.update() }, 1000);
	}

	private parseListResp(resp: listResp) {
		const body = this.lobbiesList.querySelector("tbody") as HTMLElement;
		body.innerHTML = '';
		for (let i = 0; i < resp.lobbies.length; i++) {
			body.appendChild(this.createLobbyList(resp.lobbies[i]));
		}
	}

	private createLobbyList(l: lobby): HTMLElement {
		const div = document.createElement('tr');
		const id = document.createElement('td');
		const mod = document.createElement('td');
		const player = document.createElement('td');
		id.innerText = l.lobbyId;
		mod.innerText = l.mode;
		player.innerText = `${l.players.length}/?`;
		div.appendChild(id);
		div.appendChild(mod);
		div.appendChild(player);
		div.addEventListener("click", () => {
			this.setLobbyInfo(l.lobbyId);
		})
		return div;
	}

	private async setLobbyInfo(lobbyId: string) {
		let state = await getRequest(`lobby/${lobbyId}`).catch((err) => { console.log(err) }) as any;
		state = state.state;

		const status = this.lobbyInfo.querySelector("#lobby-status") as HTMLDivElement;
		status.innerText = `id: ${lobbyId}
mode: ${state.mode}
map: ${state.map}`;

		const players = this.lobbyInfo.querySelector("ul") as HTMLElement;
		players.innerHTML = "";
		let html = "";
		for (let i = 0; i < state.players.length; i++) {
			const name = await postRequest("info/search", { identifier: state.players[i].uuid, type: "uuid" }).catch((err) => { console.log(err) }) as any;
			html += `<li>${name.data.username}</li>`;
		}
		players.innerHTML = html;
		const join = this.lobbyInfo.querySelector("#lobby-join") as HTMLDivElement;
		join.innerHTML = "";
		const btn = document.createElement("input") as HTMLInputElement;
		btn.className = "window-content";
		btn.type = "button";
		btn.value = "JOIN";
		btn.addEventListener(("click"), () => {
			stateManager.lobbyId = lobbyId;
			routeManager.nav("/lobby", false, false);
			// Popup.removePopup();
		})
		join.appendChild(btn);
		// Popup.addPopup(this.lobbyInfoWindow);
	}
}
