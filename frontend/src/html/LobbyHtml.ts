import { Matrix } from "../babylon";
import { lobby } from "../networking/message";
import { postRequest } from "../networking/request";
import { sceneManager } from "../scene/SceneManager";
import { stateManager } from "../state/StateManager";
import { streamManager } from "../stream/StreamManager";
import { User } from "../User";
import { htmlManager } from "./HtmlManager";
import { IHtml } from "./IHtml";
import { NotificationType } from "./NotificationHtml";

interface IPlayer {
	div: HTMLElement,
	name: HTMLElement,
	status: HTMLElement
}

export class LobbyHtml implements IHtml {
	private css!: HTMLLinkElement;

	// private playersWindow!: HTMLDivElement;

	private playersWindow!: HTMLDivElement;
	private infoWindow!: HTMLDivElement;
	private inviteWindow!: HTMLDivElement;
	private playersList!: HTMLDivElement;
	private lobbyMode!: HTMLSpanElement;
	private lobbyMap!: HTMLSpanElement;
	private lobbyId!: HTMLSpanElement;
	private lobbyIdCopy!: HTMLButtonElement;
	private inviteList!: HTMLDivElement;

	private readyWindow!: HTMLDivElement;
	private ready!: HTMLButtonElement;

	private players: Map<string, IPlayer>;
	private invites: Map<string, HTMLDivElement>;
	private needUpdateInvite: boolean;



	constructor() {
		this.players = new Map<string, IPlayer>;
		this.invites = new Map<string, HTMLDivElement>;
		this.needUpdateInvite = false;
	}

	public init(div: HTMLDivElement) {
		this.css = div.querySelector("link") as HTMLLinkElement;

		// this.playersWindow = div.querySelector("#players-window") as HTMLDivElement;
		this.infoWindow = div.querySelector("#info-window") as HTMLDivElement;
		this.playersList = div.querySelector(".lobby-players__container") as HTMLDivElement;
		this.lobbyMode = div.querySelector("#lobby-mode") as HTMLSpanElement;
		this.lobbyMap = div.querySelector("#lobby-map") as HTMLSpanElement;
		this.lobbyId = div.querySelector("#lobby-info-id") as HTMLSpanElement;
		this.lobbyIdCopy = div.querySelector("#lobby-info-copy") as HTMLButtonElement;
		this.inviteList = div.querySelector(".lobby-invite__container") as HTMLDivElement;

		this.playersWindow = div.querySelector(".lobby-players-window") as HTMLDivElement;
		this.inviteWindow = div.querySelector(".lobby-invite-window") as HTMLDivElement;
		this.infoWindow = div.querySelector(".lobby-info-window") as HTMLDivElement;

		this.readyWindow = div.querySelector(".lobby-ready-window") as HTMLDivElement;
		this.ready = div.querySelector(".lobby-ready__button") as HTMLButtonElement;

		sceneManager.css3dRenderer.addObject("lobby-info", {
			html: this.infoWindow,
			width: 1,
			height: 1,
			world: Matrix.RotationY(-Math.PI * 0.2).multiply(Matrix.Translation(3, 8, 7)),
			enable: false
		});
		sceneManager.css3dRenderer.addObject("lobby-players", {
			html: this.playersWindow,
			width: 1,
			height: 1,
			world: Matrix.RotationY(-Math.PI * 0.3).multiply(Matrix.Translation(5, 6.5, 1)),
			enable: false
		});
		sceneManager.css3dRenderer.addObject("lobby-invite", {
			html: this.inviteWindow,
			width: 1,
			height: 1,
			world: Matrix.RotationY(-Math.PI * 0.5).multiply(Matrix.Translation(15, 5, 0)),
			enable: false
		});

		sceneManager.css3dRenderer.addObject("lobby-ready", {
			html: this.readyWindow,
			width: 1,
			height: 1,
			world: Matrix.RotationX(-Math.PI * 0.2).multiply(Matrix.RotationY(-Math.PI * 0.3)).multiply(Matrix.Translation(5, 3.9, 1)),
			enable: false
		});

		this.lobbyIdCopy.addEventListener("click", () => {
			navigator.clipboard.writeText(stateManager.lobbyId);
			htmlManager.notification.add({
				type: NotificationType.text,
				text: "lobbyid coppied to clipboard",
				duration: 500
			})
		})

		this.playersList.addEventListener("wheel", () => { //ULTRA IMPORTANT SINON LE SCROLL MARCHE PAS????????????????????????
		})

		this.inviteList.addEventListener("wheel", () => { //ULTRA IMPORTANT SINON LE SCROLL MARCHE PAS????????????????????????
		})

		this.ready.addEventListener("click", () => {
			streamManager.lobby.ready();
		})
	}

	public load(): void {
		this.needUpdateInvite = true;
		this.playersList.innerHTML = "";
		this.lobbyId.innerHTML = stateManager.lobbyId;
		this.inviteList.innerHTML = "";

		document.body.appendChild(this.css);
		sceneManager.css3dRenderer.setObjectEnable("lobby-players", true);
		sceneManager.css3dRenderer.setObjectEnable("lobby-info", true);
		sceneManager.css3dRenderer.setObjectEnable("lobby-ready", true);
	}

	public unload(): void {
		sceneManager.css3dRenderer.setObjectEnable("lobby-players", false);
		sceneManager.css3dRenderer.setObjectEnable("lobby-info", false);
		sceneManager.css3dRenderer.setObjectEnable("lobby-invite", false);
		sceneManager.css3dRenderer.setObjectEnable("lobby-ready", false);
		this.css.remove();
		this.players.clear();
		this.invites.clear();
	}

	public update(payload: lobby.IUpdateMessage) {
		this.lobbyMap.textContent = payload.map as string;
		this.lobbyMode.textContent = payload.mode as string;
		if (payload.mode === "ai" || payload.mode === "local")
			this.needUpdateInvite = false;
		if (this.needUpdateInvite) {
			sceneManager.css3dRenderer.setObjectEnable("lobby-invite", true);
			this.updateInvite(payload.players as lobby.IPlayer[]);
		}
		this.updatePlayers(payload.players as lobby.IPlayer[]);
	}

	private updatePlayers(players: lobby.IPlayer[]) {
		for (let i = 0; i < players.length; i++) {
			if (this.players.has(players[i].uuid as string)) {
				const player = this.players.get(players[i].uuid as string) as IPlayer;
				player.status.setAttribute("ready", players[i].ready ? "true" : "false");
				if (players[i].uuid == User.uuid && players[i].ready) {
					sceneManager.css3dRenderer.setObjectEnable("lobby-ready", false);
				}
				player.status.textContent = (players[i].ready ? "ready" : "waiting");
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
				this.players.get(i)!.div.remove();
				this.players.delete(i);
			}
		}
	}

	private async createPlayerDiv(player: lobby.IPlayer) {
		console.log("LOBYY CREATE PLAYER DIV");
		const self = User.uuid == player.uuid;
		const div = document.createElement('div');
		const name = document.createElement('span');
		const status = document.createElement('span');

		this.players.set(player.uuid as string, { div: div, name: name, status: status });

		div.className = "lobby-players__content";
		name.className = "lobby-players__username";
		status.className = "lobby-players__status";

		console.log(`POST UUID = ${player.uuid}`);
		const rep = await postRequest("info/search", { identifier: player.uuid, type: "uuid" }).catch((err) => console.log(err)) as any;
		name.textContent = rep.data.username; //NEED TO IMPLEMENT A ROUTE GET /userinfo/:uuid to get Username from uuid
		status.setAttribute("ready", player.ready ? "true" : "false");
		status.textContent = (player.ready ? "ready" : "waiting");

		div.appendChild(name);
		div.appendChild(status);
		if (self) {
			this.playersList.prepend(div);
		} else {
			this.playersList.appendChild(div);
		}

	}


	private updateInvite(players: lobby.IPlayer[]) {
		// this.inviteList.innerHTML = "";
		const uuids = User.friendsOnline;
		for (let i of uuids) {
			let b = true;
			for (let y = 0; y < players.length; y++) {
				if (players[y].uuid == i) {
					b = false;
					this.invites.get(i)?.remove();
					this.invites.delete(i);
					break;
				}
			}
			if (b && !this.invites.has(i))
				this.createPlayerInvite(i);
		}
	}

	private createPlayerInvite(uuid: string) {
		const d = document.createElement("div");
		this.invites.set(uuid, d);
		postRequest("info/search", { identifier: uuid, type: "uuid" })
			.then((json: any) => {
				const u = document.createElement("span");
				const i = document.createElement("button");
				u.className = "lobby-invite__username";
				u.textContent = json.data.username;
				i.className = "lobby-invite__button";
				i.textContent = "+";
				i.addEventListener("click", () => {
					alert("need a way to invite");
				})
				d.appendChild(u);
				d.appendChild(i);
				this.inviteList.appendChild(d);
			})
			.catch(() => htmlManager.notification.add({ type: NotificationType.error, error: "lobby create invite" }));
	}

}
