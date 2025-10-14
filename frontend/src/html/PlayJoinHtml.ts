import { Matrix } from "../babylon";
import { getRequest, postRequest } from "../networking/request";
import { routeManager } from "../route/RouteManager";
import { sceneManager } from "../scene/SceneManager";
import { stateManager } from "../state/StateManager";
import { IHtml } from "./IHtml";
import { Popup, PopupType } from "./Popup";


type lobby = {
	lobbyId: string,
	map: string,
	mode: string,
	players: Array<{ uuid: string, ready: boolean }>,
	maxPlayers: number
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

	private lobbyWindow!: HTMLDivElement;
	private lobbyList!: HTMLDivElement;
	private infoWindow!: HTMLDivElement;
	private input!: HTMLInputElement;

	private infoPlayers!: HTMLDivElement;
	private infoID!: HTMLSpanElement;
	private infoMode!: HTMLSpanElement;
	private infoMap!: HTMLSpanElement;
	private infoJoin!: HTMLButtonElement;

	private _update: boolean;

	private currentInfoId: string;
	private currentInfoLobby!: lobby;

	constructor() {
		this._update = false;
		this.currentInfoId = "";
	}

	public init(div: HTMLElement) {
		this.css = div.querySelector("link") as HTMLLinkElement;
		this.lobbiesWindow = div.querySelector("#join-list-container") as HTMLDivElement;
		this.lobbyInfoWindow = div.querySelector("#play-lobby-info") as HTMLDivElement;
		this.lobbiesList = div.querySelector("#join-list") as HTMLTableElement;
		this.lobbyId = div.querySelector("#join-id") as HTMLInputElement;
		this.lobbyInfo = div.querySelector("#lobby-info") as HTMLDivElement;

		this.lobbyWindow = div.querySelector(".join-lobby-window") as HTMLDivElement;
		this.lobbyList = div.querySelector(".join-lobby__container") as HTMLDivElement;
		this.infoWindow = div.querySelector(".join-info-window") as HTMLDivElement;
		this.infoPlayers = div.querySelector(".join-info__players") as HTMLDivElement;
		this.inputWindow = div.querySelector(".join-input-window") as HTMLDivElement;
		this.input = div.querySelector(".join-input__input") as HTMLInputElement;

		this.infoID = div.querySelector(".join-info__id") as HTMLSpanElement;
		this.infoMode = div.querySelector(".join-info--mode") as HTMLSpanElement;
		this.infoMap = div.querySelector(".join-info--map") as HTMLSpanElement;
		this.infoJoin = div.querySelector(".join-info__button") as HTMLButtonElement;

		sceneManager.css3dRenderer.addObject("join-list", {
			html: this.lobbyWindow,
			width: 1.5,
			height: 1.5,
			world: Matrix.RotationY(Math.PI * 0.7).multiply(Matrix.Translation(-1, 4.5, 10)),
			enable: false
		})

		sceneManager.css3dRenderer.addObject("join-info", {
			html: this.infoWindow,
			width: 1.5,
			height: 1.5,
			world: Matrix.RotationY(Math.PI * 0.6).multiply(Matrix.Translation(-1, 4.5, 13)),
			enable: false
		})

		sceneManager.css3dRenderer.addObject("join-id", {
			html: this.inputWindow,
			width: 1.5,
			height: 1.5,
			world: Matrix.RotationY(Math.PI * 0.6).multiply(Matrix.Translation(-3, 2.9, 13)),
			enable: false
		})

		this._update = false;

		div.querySelector(".join-info--right")?.addEventListener("wheel", () => { })

		this.infoJoin.addEventListener("click", () => {
			stateManager.lobbyId = this.currentInfoId;
			routeManager.nav("/lobby", false, false);
		})

		this.input.addEventListener("keypress", (e) => {
			if (e.key == "Enter") {
				stateManager.lobbyId = this.input.value;
				routeManager.nav("/lobby", false, false);
			}
		})

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
		this.resetInfo();
		this.input.value = "";
		this.lobbyList.innerHTML = "";
		sceneManager.css3dRenderer.setObjectEnable("join-list", true);
		sceneManager.css3dRenderer.setObjectEnable("join-id", true);
	}

	public unload() {
		this._update = false;
		sceneManager.css3dRenderer.setObjectEnable("join-list", false);
		sceneManager.css3dRenderer.setObjectEnable("join-info", false);
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
		setTimeout(() => { this.update() }, 2000);
	}

	private parseListResp(resp: listResp) {
		this.lobbyList.innerHTML = "";
		// const body = this.lobbiesList.querySelector("tbody") as HTMLElement;
		// body.innerHTML = '';
		let found = false;
		for (let i = 0; i < resp.lobbies.length; i++) {
			if (resp.lobbies[i].mode == "ai" || resp.lobbies[i].mode == "local")
				continue;
			this.lobbyList.appendChild(this.createLobbyList(resp.lobbies[i]));
			if (resp.lobbies[i].lobbyId == this.currentInfoId) {
				found = true;
				if (this.currentInfoLobby.players.length != resp.lobbies[i].players.length)
					this.setLobbyInfo(resp.lobbies[i])
				else
					for (let j = 0; j < this.currentInfoLobby.players.length; j++)
						if (this.currentInfoLobby.players[j].uuid != resp.lobbies[i].players[j].uuid)
							this.setLobbyInfo(resp.lobbies[i])

			}
		}
		if (!found)
			this.resetInfo();
	}

	private resetInfo() {
		sceneManager.css3dRenderer.setObjectEnable("join-info", false);
		this.infoID.textContent = "";
		this.infoMap.textContent = "";
		this.infoMode.textContent = "";
		this.infoPlayers.innerHTML = "";
		this.currentInfoId = "";
		this.infoJoin.disabled = true;
	}

	private createLobbyList(l: lobby): HTMLElement {
		const div = document.createElement("div");
		const id = document.createElement("span");
		const mode = document.createElement("span");
		const count = document.createElement("span");

		div.className = "join-lobby__content";
		id.className = "join-lobby__id";
		mode.className = "join-lobby__mode";
		count.className = "join-lobby__count";
		console.log(l);

		id.textContent = l.lobbyId;
		mode.textContent = l.mode;
		count.textContent = `${l.players.length}/${l.maxPlayers}`;

		div.appendChild(id);
		div.appendChild(mode);
		div.appendChild(count);

		div.addEventListener("click", () => {
			this.currentInfoId = l.lobbyId;
			console.log(l);
			this.setLobbyInfo(l);
		})
		return div;
	}

	private async setLobbyInfo(lobby: lobby) {
		this.infoPlayers.innerHTML = "";
		this.infoID.textContent = lobby.lobbyId;
		this.infoMap.textContent = lobby.map;
		this.infoMode.textContent = lobby.mode;
		this.infoJoin.disabled = false;
		this.currentInfoLobby = lobby;
		for (let i = 0; i < lobby.players.length; i++) {
			const name = await postRequest("info/search", { identifier: lobby.players[i].uuid, type: "uuid" }).catch((err) => { console.log(err) }) as any;
			if (this.currentInfoId == lobby.lobbyId)
				this.infoPlayers.innerHTML += `<span>${name.data.username}</span>`;
			else
				return;
		}
		sceneManager.css3dRenderer.setObjectEnable("join-info", true);
	}
}
