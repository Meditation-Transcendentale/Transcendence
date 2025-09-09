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
	createOption: { html: HTMLDivElement, id: number },
	//brMod: HTMLInputElement;
	//tournamentMod: HTMLInputElement;
	//defaultMap: HTMLInputElement;
	//localMod: HTMLInputElement;
	//onlineMod: HTMLInputElement;
	//aiMod: HTMLInputElement;
	createBtn: HTMLInputElement;
	createWin: HTMLDivElement;
	list: HTMLTableElement;
	joinId: HTMLInputElement;
	lobbyInfoWindow: { html: HTMLDivElement, id: number };
	lobbyInfo: HTMLDivElement;
	brMode: HTMLInputElement;
	createGame: HTMLInputElement;
	pongMode: HTMLInputElement;
	tournamentMode: HTMLInputElement;
	brickMode: HTMLInputElement;
	pongModes: HTMLInputElement;
	createReturn: HTMLInputElement;
	createReturnOption: HTMLInputElement;
	ponglocal: HTMLInputElement;
	pongai: HTMLInputElement;
	pongonline: HTMLInputElement;
	voidmap: HTMLInputElement;
	monolithmap: HTMLInputElement;
	grassmap: HTMLInputElement;
};

enum playState {
	create = 0,
	join = 1,
	lobby = 2
}

interface createState {
	mod: string | null,
	map: string,
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
			createOption: { html: div.querySelector("#play-create-option") as HTMLDivElement, id: -1 },
			join: { html: div.querySelector("#play-join") as HTMLDivElement, id: -1 },
			//brMod: div.querySelector("#br-mod") as HTMLInputElement,
			//tournamentMod: div.querySelector("#tournament-mod") as HTMLInputElement,
			//defaultMap: div.querySelector("#default-map") as HTMLInputElement,
			//localMod: div.querySelector("#local-mod") as HTMLInputElement,
			//onlineMod: div.querySelector("#online-mod") as HTMLInputElement,
			//aiMod: div.querySelector("#ai-mod") as HTMLInputElement,
			createBtn: div.querySelector("#create-btn") as HTMLInputElement,
			createWin: div.querySelector("#create-btn-window") as HTMLDivElement,
			list: div.querySelector("#join-list") as HTMLTableElement,
			joinId: div.querySelector("#join-id") as HTMLInputElement,
			lobbyInfoWindow: { html: div.querySelector("#play-lobby-info") as HTMLDivElement, id: -1 },
			lobbyInfo: div.querySelector("#lobby-info") as HTMLDivElement,
			brMode: div.querySelector("#br-mode") as HTMLInputElement,
			pongMode: div.querySelector("#pong-mode") as HTMLInputElement,
			tournamentMode: div.querySelector("#tournament-mode") as HTMLInputElement,
			brickMode: div.querySelector("#brick-mode") as HTMLInputElement,
			createGame: div.querySelector("#create-game") as HTMLInputElement,
			createReturn: div.querySelector("#create-return") as HTMLInputElement,
			createReturnOption: div.querySelector("#create-return-option") as HTMLInputElement,
			ponglocal: div.querySelector("#pong-local") as HTMLInputElement,
			pongai: div.querySelector("#pong-ai") as HTMLInputElement,
			pongonline: div.querySelector("#pong-online") as HTMLInputElement,
			voidmap: div.querySelector("#void-map") as HTMLInputElement,
			monolithmap: div.querySelector("#monolith-map") as HTMLInputElement,
			grassmap: div.querySelector("#grass-map") as HTMLInputElement,
			pongModes: div.querySelector("#create-pong") as HTMLInputElement
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
		this.ref.createOption.id = App3D.addCSS3dObject({
			html: this.ref.createOption.html,
			width: 1.5,
			height: 1.5,
			world: Matrix.RotationY(-Math.PI / 2.).multiply(Matrix.Translation(-5, 5, -8)),
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

		//this.ref.pongModes.disabled = true;
		this.ref.createWin.toggleAttribute("off");

		this.ref.pongMode.addEventListener("click", () => {
			this.ref.tournamentMode.removeAttribute("on");
			this.ref.brMode.removeAttribute("on");
			//this.ref.brickMode.removeAttribute("on");
			this.ref.pongModes.classList.remove('window--play-disabled')
			this.ref.pongModes.classList.add('window--play-enable')
			this.ref.createGame.classList.remove('window--play-enable')
			this.ref.createGame.classList.add('window--play-disabled')
			this.ref.createReturn.classList.remove('create-return-disable')
			this.ref.createReturn.classList.add('create-return-enable')
			document.getElementById('create-pong')?.classList.add('enabled');
			if (this.createState.mod && this.createState.map) { this.ref.createWin.removeAttribute("off") }
			else { this.ref.createWin.setAttribute("off", "") }
		})

		this.ref.createReturn.addEventListener("click", () => {
			this.returnButton();
		})

		this.ref.createReturnOption.addEventListener("click", () => {
			this.createOption(false);
			//this.returnButton();
		})

		this.ref.ponglocal.addEventListener("click", () => {
			this.createState.mod = "local";
			this.ref.pongonline.removeAttribute("on");
			this.ref.brMode.removeAttribute("on");
			this.ref.pongai.removeAttribute("on");
			this.ref.tournamentMode.removeAttribute("on");
			if (this.createState.mod && this.createState.map) { this.ref.createWin.removeAttribute("off") }
			else { this.ref.createWin.setAttribute("off", "") }
			this.returnButton();
			this.createOption(true);
			//this.create();
		})

		this.ref.pongonline.addEventListener("click", () => {
			this.createState.mod = "online";
			this.ref.ponglocal.removeAttribute("on");
			this.ref.brMode.removeAttribute("on");
			this.ref.pongai.removeAttribute("on");
			this.ref.tournamentMode.removeAttribute("on");
			if (this.createState.mod && this.createState.map) { this.ref.createWin.removeAttribute("off") }
			else { this.ref.createWin.setAttribute("off", "") }
			this.returnButton();
			this.createOption(true);
			//this.create();
		})

		this.ref.pongai.addEventListener("click", () => {
			this.createState.mod = "ai";
			this.ref.pongonline.removeAttribute("on");
			this.ref.brMode.removeAttribute("on");
			this.ref.ponglocal.removeAttribute("on");
			this.ref.tournamentMode.removeAttribute("on");
			if (this.createState.mod && this.createState.map) { this.ref.createWin.removeAttribute("off") }
			else { this.ref.createWin.setAttribute("off", "") }
			this.returnButton();
			this.createOption(true);
			//this.create();
		})


		this.ref.brMode.addEventListener("click", () => {
			this.createState.mod = "br";
			this.ref.pongonline.removeAttribute("on");
			this.ref.ponglocal.removeAttribute("on");
			this.ref.pongai.removeAttribute("on");
			this.ref.tournamentMode.removeAttribute("on");
			if (this.createState.mod && this.createState.map) { this.ref.createWin.removeAttribute("off") }
			else { this.ref.createWin.setAttribute("off", "") }
			this.returnButton();
			//this.createOption(true);
			this.create();
		})

		this.ref.brickMode.addEventListener("click", () => {
			this.createState.mod = "brick";
			this.ref.brMode.removeAttribute("on");
			this.ref.pongonline.removeAttribute("on");
			this.ref.ponglocal.removeAttribute("on");
			this.ref.pongai.removeAttribute("on");
			this.ref.tournamentMode.removeAttribute("on");
			if (this.createState.mod && this.createState.map) { this.ref.createWin.removeAttribute("off") }
			else { this.ref.createWin.setAttribute("off", "") }
			this.returnButton();
			this.createOption(true);
			Router.nav("/brick")
		})

		//this.ref.pongMode.addEventListener("click", () => {
		//	this.createState.mod = this.ref.pongMode.toggleAttribute("on") ? "br" : null;
		//	this.ref.tournamentMode.removeAttribute("on");
		//	this.ref.brMode.removeAttribute("on");
		//	//this.ref.brickMode.removeAttribute("on");
		//	if (this.createState.mod && this.createState.map) { this.ref.createWin.removeAttribute("off") }
		//	else { this.ref.createWin.setAttribute("off", "") }
		//})

		//this.ref.brMod.addEventListener("click", () => {
		//	this.createState.mod = this.ref.brMod.toggleAttribute("on") ? "br" : null;
		//	this.ref.tournamentMod.removeAttribute("on");
		//	this.ref.localMod.removeAttribute("on");
		//	this.ref.onlineMod.removeAttribute("on");
		//	this.ref.aiMod.removeAttribute("on");
		//	if (this.createState.mod && this.createState.map) { this.ref.createWin.removeAttribute("off") }
		//	else { this.ref.createWin.setAttribute("off", "") }
		//})
		//
		//this.ref.tournamentMod.addEventListener("click", () => {
		//	this.createState.mod = this.ref.tournamentMod.toggleAttribute("on") ? "tournament" : null;
		//	this.ref.brMod.removeAttribute("on");
		//	this.ref.localMod.removeAttribute("on");
		//	this.ref.onlineMod.removeAttribute("on");
		//	this.ref.aiMod.removeAttribute("on");
		//	if (this.createState.mod && this.createState.map) { this.ref.createWin.removeAttribute("off") }
		//	else { this.ref.createWin.setAttribute("off", "") }
		//})
		//
		//this.ref.localMod.addEventListener("click", () => {
		//	this.createState.mod = this.ref.localMod.toggleAttribute("on") ? "local" : null;
		//	this.ref.tournamentMod.removeAttribute("on");
		//	this.ref.brMod.removeAttribute("on");
		//	this.ref.onlineMod.removeAttribute("on");
		//	this.ref.aiMod.removeAttribute("on");
		//	if (this.createState.mod && this.createState.map) { this.ref.createWin.removeAttribute("off") }
		//	else { this.ref.createWin.setAttribute("off", "") }
		//})
		//
		//this.ref.onlineMod.addEventListener("click", () => {
		//	this.createState.mod = this.ref.onlineMod.toggleAttribute("on") ? "online" : null;
		//	this.ref.tournamentMod.removeAttribute("on");
		//	this.ref.localMod.removeAttribute("on");
		//	this.ref.brMod.removeAttribute("on");
		//	this.ref.aiMod.removeAttribute("on");
		//	if (this.createState.mod && this.createState.map) { this.ref.createWin.removeAttribute("off") }
		//	else { this.ref.createWin.setAttribute("off", "") }
		//})
		//
		//this.ref.aiMod.addEventListener("click", () => {
		//	this.createState.mod = this.ref.aiMod.toggleAttribute("on") ? "ai" : null;
		//	this.ref.tournamentMod.removeAttribute("on");
		//	this.ref.localMod.removeAttribute("on");
		//	this.ref.onlineMod.removeAttribute("on");
		//	this.ref.brMod.removeAttribute("on");
		//	if (this.createState.mod && this.createState.map) { this.ref.createWin.removeAttribute("off") }
		//	else { this.ref.createWin.setAttribute("off", "") }
		//})
		//
		this.ref.grassmap.addEventListener("click", () => {
			this.createState.map = "grass";
			if (this.createState.mod && this.createState.map) { this.ref.createWin.removeAttribute("off") }
			else { this.ref.createWin.setAttribute("off", "") }
			this.createOption(false);
			this.create();
		})

		this.ref.voidmap.addEventListener("click", () => {
			this.createState.map = "void";
			if (this.createState.mod && this.createState.map) { this.ref.createWin.removeAttribute("off") }
			else { this.ref.createWin.setAttribute("off", "") }
			this.createOption(false);
			this.create();
		})

		this.ref.monolithmap.addEventListener("click", () => {
			this.createState.map = "monolith";
			if (this.createState.mod && this.createState.map) { this.ref.createWin.removeAttribute("off") }
			else { this.ref.createWin.setAttribute("off", "") }
			this.createOption(false);
			this.create();
		})

		this.ref.createBtn.addEventListener("click", () => {
			console.log(`create game-> mod:${this.createState.mod}, map:${this.createState.map}`)
			postRequest("lobby/create", {
				mode: this.createState.mod,
				map: this.createState.map
			})
				.then((json) => { this.createResolve(json, this.createState.map) })

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
		this.returnButton();
		this.createOption(false);
		App3D.setCSS3dObjectEnable(this.ref.switch.id, false);
		App3D.setCSS3dObjectEnable(this.ref.create.id, false);
		App3D.setCSS3dObjectEnable(this.ref.join.id, false);
		App3D.setCSS3dObjectEnable(this.ref.lobbyInfoWindow.id, false);
		App3D.setCSS3dObjectEnable(this.ref.createOption.id, false);
		this.css.remove();
	}

	private returnButton() {
		this.ref.pongModes.classList.add('window--play-disabled')
		this.ref.pongModes.classList.remove('window--play-enable')
		this.ref.createGame.classList.add('window--play-enable')
		this.ref.createGame.classList.remove('window--play-disabled')
		this.ref.createReturn.classList.add('create-return-disable')
		this.ref.createReturn.classList.remove('create-return-enable')
	}

	private create() {
		postRequest("lobby/create", {
			mode: this.createState.mod,
			map: this.createState.map
		})
			.then((json) => { this.createResolve(json, this.createState.map) })

			.catch((resp) => { this.createReject(resp) });
	}

	private createOption(on: boolean) {
		const mode = this.createState.mod;

		switch (mode) {
			case 'brick':
				this.toggleMainWindow(!on);
				break;

			case 'ai':
			case 'local':
			case 'online':
				this.toggleMainWindow(!on);
				this.toggleOptionWindow(on);
				this.toggleReturnButton(on);
				break;

			case 'br':
				this.toggleMainWindow(false);
				this.toggleOptionWindow(true);
				break;

			default:
				this.toggleMainWindow(true);
				this.toggleOptionWindow(false);
				this.toggleReturnButton(false);
				break;
		}
	}
	private toggleMainWindow(show: boolean) {
		App3D.setCSS3dObjectEnable(this.ref.create.id, show);
	}

	private toggleOptionWindow(show: boolean) {
		App3D.setCSS3dObjectEnable(this.ref.createOption.id, show);
	}

	private toggleReturnButton(enable: boolean) {
		if (enable) {
			this.ref.createReturnOption.classList.remove('create-return-disable');
			this.ref.createReturnOption.classList.add('create-return-enable');
		} else {
			this.ref.createReturnOption.classList.add('create-return-disable');
			this.ref.createReturnOption.classList.remove('create-return-enable');
		}
	}

	private createResolve(json: any, map: string) {
		Router.nav(`/lobby?id=${json.lobbyId}&map=${map}`, false, false)
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

