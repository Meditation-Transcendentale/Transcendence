import { Matrix } from "../babyImport";
import { App3D } from "../3d/App";
import { getRequest, postRequest } from "./requests";
import Router from "./Router";
import { createButton } from "./utils";
import { Popup } from "./Popup";


interface playHtmlReference {
	switch: { html: HTMLDivElement, id: number },
	swCreate: HTMLInputElement,
	swJoin: HTMLInputElement
	join: { html: HTMLDivElement, id: number },
	create: { html: HTMLDivElement, id: number },
	brMod: HTMLInputElement;
	tournamentMod: HTMLInputElement;
	defaultMap: HTMLInputElement;
	localMod: HTMLInputElement;
	onlineMod: HTMLInputElement;
	aiMod: HTMLInputElement;
	createBtn: HTMLInputElement;
	createWin: HTMLDivElement;
	list: HTMLTableElement;
	joinId: HTMLInputElement;
	lobbyInfoWindow: { html: HTMLDivElement, id: number };
	lobbyInfo: HTMLDivElement;
};

enum playState {
	create = 0,
	join = 1,
	lobby = 2
}

interface createState {
	mod: string | null,
	map: string | null,
}

type lobby = {
	lobbyId: string,
	map: string,
	mode: string,
	players: string[]
}

interface listResp {
	lobbies: lobby[];
}

export default class Play {
	private div: HTMLDivElement;
	private css: HTMLLinkElement;
	private ref: playHtmlReference;
	private state: playState;

	private createState: createState;



	private gameIP = window.location.hostname;
	constructor(div: HTMLDivElement) {
		this.div = div;
		console.log(div.id);

		this.css = div.querySelector("link") as HTMLLinkElement;
		this.ref = {
			switch: { html: div.querySelector("#play-switch") as HTMLDivElement, id: -1 },
			swCreate: div.querySelector("#create-switch") as HTMLInputElement,
			swJoin: div.querySelector("#join-switch") as HTMLInputElement,
			create: { html: div.querySelector("#play-create") as HTMLDivElement, id: -1 },
			join: { html: div.querySelector("#play-join") as HTMLDivElement, id: -1 },
			brMod: div.querySelector("#br-mod") as HTMLInputElement,
			tournamentMod: div.querySelector("#tournament-mod") as HTMLInputElement,
			defaultMap: div.querySelector("#default-map") as HTMLInputElement,
			localMod: div.querySelector("#local-mod") as HTMLInputElement,
			onlineMod: div.querySelector("#online-mod") as HTMLInputElement,
			aiMod: div.querySelector("#ai-mod") as HTMLInputElement,
			createBtn: div.querySelector("#create-btn") as HTMLInputElement,
			createWin: div.querySelector("#create-btn-window") as HTMLDivElement,
			list: div.querySelector("#join-list") as HTMLTableElement,
			joinId: div.querySelector("#join-id") as HTMLInputElement,
			lobbyInfoWindow: { html: div.querySelector("#play-lobby-info") as HTMLDivElement, id: -1 },
			lobbyInfo: div.querySelector("#lobby-info") as HTMLDivElement
		}


		this.createState = {
			mod: null,
			map: null,
		}

		this.state = playState.create;

		this.ref.switch.id = App3D.addCSS3dObject({
			html: this.ref.switch.html,
			width: 1.5,
			height: 1.5,
			world: Matrix.RotationY(-Math.PI / 2.).multiply(Matrix.Translation(-2, 6.6, 0)),
			enable: false
		})
		this.ref.create.id = App3D.addCSS3dObject({
			html: this.ref.create.html,
			width: 1.5,
			height: 1.5,
			world: Matrix.RotationY(-Math.PI / 2.).multiply(Matrix.Translation(-4, 5, -8)),
			enable: false
		})
		this.ref.join.id = App3D.addCSS3dObject({
			html: this.ref.join.html,
			width: 1.5,
			height: 1.5,
			world: Matrix.RotationY(-Math.PI / 2.).multiply(Matrix.Translation(-5, 5, -10)),
			enable: false
		})


		this.ref.swJoin.toggleAttribute("down");
		this.ref.swCreate.addEventListener("click", () => {
			App3D.setCSS3dObjectEnable(this.ref.create.id, true);
			App3D.setCSS3dObjectEnable(this.ref.join.id, false);
			this.ref.swJoin.toggleAttribute("down", true);
			this.ref.swCreate.toggleAttribute("down", false);
			this.state = playState.create;
		})
		this.ref.swJoin.addEventListener("click", () => {
			getRequest("lobby/list", "no-cache")
				.then((json: any) => { console.log(json); this.parseListResp(json) })
				.catch((err) => { console.log(err) });
			App3D.setCSS3dObjectEnable(this.ref.create.id, false);
			App3D.setCSS3dObjectEnable(this.ref.join.id, true);
			this.ref.swJoin.toggleAttribute("down", false);
			this.ref.swCreate.toggleAttribute("down", true);
			this.state = playState.join;
		})

		this.ref.createWin.toggleAttribute("off");



		this.ref.brMod.addEventListener("click", () => {
			this.createState.mod = this.ref.brMod.toggleAttribute("on") ? "br" : null;
			this.ref.tournamentMod.removeAttribute("on");
			this.ref.localMod.removeAttribute("on");
			this.ref.onlineMod.removeAttribute("on");
			this.ref.aiMod.removeAttribute("on");
			if (this.createState.mod && this.createState.map) { this.ref.createWin.removeAttribute("off") }
			else { this.ref.createWin.setAttribute("off", "") }
		})

		this.ref.tournamentMod.addEventListener("click", () => {
			this.createState.mod = this.ref.tournamentMod.toggleAttribute("on") ? "tournament" : null;
			this.ref.brMod.removeAttribute("on");
			this.ref.localMod.removeAttribute("on");
			this.ref.onlineMod.removeAttribute("on");
			this.ref.aiMod.removeAttribute("on");
			if (this.createState.mod && this.createState.map) { this.ref.createWin.removeAttribute("off") }
			else { this.ref.createWin.setAttribute("off", "") }
		})

		this.ref.localMod.addEventListener("click", () => {
			this.createState.mod = this.ref.localMod.toggleAttribute("on") ? "local" : null;
			this.ref.tournamentMod.removeAttribute("on");
			this.ref.brMod.removeAttribute("on");
			this.ref.onlineMod.removeAttribute("on");
			this.ref.aiMod.removeAttribute("on");
			if (this.createState.mod && this.createState.map) { this.ref.createWin.removeAttribute("off") }
			else { this.ref.createWin.setAttribute("off", "") }
		})

		this.ref.onlineMod.addEventListener("click", () => {
			this.createState.mod = this.ref.onlineMod.toggleAttribute("on") ? "online" : null;
			this.ref.tournamentMod.removeAttribute("on");
			this.ref.localMod.removeAttribute("on");
			this.ref.brMod.removeAttribute("on");
			this.ref.aiMod.removeAttribute("on");
			if (this.createState.mod && this.createState.map) { this.ref.createWin.removeAttribute("off") }
			else { this.ref.createWin.setAttribute("off", "") }
		})

		this.ref.aiMod.addEventListener("click", () => {
			this.createState.mod = this.ref.aiMod.toggleAttribute("on") ? "ai" : null;
			this.ref.tournamentMod.removeAttribute("on");
			this.ref.localMod.removeAttribute("on");
			this.ref.onlineMod.removeAttribute("on");
			this.ref.brMod.removeAttribute("on");
			if (this.createState.mod && this.createState.map) { this.ref.createWin.removeAttribute("off") }
			else { this.ref.createWin.setAttribute("off", "") }
		})

		this.ref.defaultMap.addEventListener("click", () => {
			this.createState.map = this.ref.defaultMap.toggleAttribute("on") ? "default" : null;
			if (this.createState.mod && this.createState.map) { this.ref.createWin.removeAttribute("off") }
			else { this.ref.createWin.setAttribute("off", "") }
		})

		this.ref.createBtn.addEventListener("click", () => {
			console.log(`create game-> mod:${this.createState.mod}, map:${this.createState.map}`)
			postRequest("lobby/create", {
				mode: this.createState.mod,
				map: this.createState.map
			})
				.then((json) => { this.createResolve(json) })

				.catch((resp) => { this.createReject(resp) });
		})

		this.ref.joinId.addEventListener("focusin", () => {
			//this.div.querySelector("#join-indic")?.setAttribute("on", "");
		})

		this.ref.joinId.addEventListener("focusout", () => {
			//this.div.querySelector("#join-indic")?.removeAttribute("on");
		})

		this.ref.lobbyInfoWindow.id = App3D.addCSS3dObject({
			html: this.ref.lobbyInfoWindow.html,
			width: 2.,
			height: 2.,
			world: Matrix.RotationY(Math.PI * 1).multiply(Matrix.Translation(-20, 4, 24)),
			enable: false
		})

	}

	public load(params: URLSearchParams) {
		App3D.setVue("play");
		App3D.setCSS3dObjectEnable(this.ref.switch.id, true);
		switch (this.state) {
			case playState.create: {
				App3D.setCSS3dObjectEnable(this.ref.create.id, true);
				break;
			}
			case playState.join: {
				getRequest("lobby/list")
					.then((json: any) => { this.parseListResp(json) })
					.catch((err) => { console.log(err) });
				App3D.setCSS3dObjectEnable(this.ref.join.id, true);
				break;
			}
		}
		document.body.appendChild(this.css);
	}

	public async unload() {
		App3D.setCSS3dObjectEnable(this.ref.switch.id, false);
		App3D.setCSS3dObjectEnable(this.ref.create.id, false);
		App3D.setCSS3dObjectEnable(this.ref.join.id, false);
		App3D.setCSS3dObjectEnable(this.ref.lobbyInfoWindow.id, false);
		this.css.remove();
	}

	private createResolve(json: any) {
		Router.nav(`/lobby?id=${json.lobbyId}`, false, false)
		console.log(json);
	}

	private createReject(resp: Response) {
		if (resp?.status) {
			resp.json().then((json) => console.log(json));
		}
	}

	private joinResolve(json: any) {
		Router.nav(`/lobby?id=${json.lobbyId}`, false, false);
	}

	private joinReject(resp: Response) {
		if (resp?.status) {
			resp.json().then((json) => console.log(json));
		}
	}

	private listResolve(json: Array<Object>) {
		console.log(json);
		const div = document.createElement("div");
		json.forEach((elem: any) => {
			let e = document.createElement("div");
			e.innerText = elem.gameId ? elem.gameId : elem.lobbyId;
			e.appendChild(createButton("Join", (btn: HTMLInputElement) => {
				Popup.removePopup();
				Router.nav(`/lobby?id=${elem.lobbyId}`, false, false);
			}))
			div.appendChild(e);
		})

		this.ref.list.innerHTML = '';
		this.ref.list.appendChild(div);
	}

	private listReject(resp: Response) {
		if (resp?.status) {
			resp.json().then((json) => console.log(json));
		}
	}

	private parseListResp(resp: listResp) {
		const body = this.ref.list.querySelector("tbody") as HTMLElement;
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

		const status = this.ref.lobbyInfo.querySelector("#lobby-status") as HTMLDivElement;
		status.innerText = `id: ${lobbyId}
mode: ${state.mode}
map: ${state.map}`;

		const players = this.ref.lobbyInfo.querySelector("ul") as HTMLElement;
		players.innerHTML = "";
		let html = "";
		for (let i = 0; i < state.players.length; i++) {
			const name = await getRequest(`info/uuid/${state.players[i].uuid}`).catch((err) => { console.log(err) }) as any;
			html += `<li>${name.username}</li>`;
		}
		players.innerHTML = html;
		const join = this.ref.lobbyInfo.querySelector("#lobby-join") as HTMLDivElement;
		join.innerHTML = "";
		const btn = document.createElement("input") as HTMLInputElement;
		btn.className = "window-content";
		btn.type = "button";
		btn.value = "JOIN";
		btn.addEventListener(("click"), () => {
			Router.nav(`/lobby?id=${lobbyId}`, false, false);
			Popup.removePopup();
		})
		join.appendChild(btn);
		Popup.addPopup(this.ref.lobbyInfoWindow.html);
	}

}

