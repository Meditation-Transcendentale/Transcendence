import { App3D } from "../3d/App";
import { playVue } from "../Vue";
import { getRequest, postRequest } from "./requests";
import Router from "./Router";
import { User } from "./User";
import { createButton } from "./utils";


const lr: listResp = {
	lobbies: [
		{
			id: "egeggege-wefwefbwejhf-wefhbwf-wefwfe",
			mod: "local",
			maxPlayers: 1,
			players: ["ehehe"]
		},
		{
			id: "wefbwefb-wefwefwef-wefwefwjhfebwe-we",
			mod: "online",
			maxPlayers: 2,
			players: ["bob"]
		},
		{
			id: "fwefwehfwef-wjehfwejhf-wefjhwv-fwefe",
			mod: 'pongbr',
			maxPlayers: 100,
			players: ["wef", "wefwefwf", "csdcxc", "adsad", "ashdahv", "kklks", "wefef"]
		}, {
			id: "wefbwefb-wefwefwef-wefwefwjhfebwe-we",
			mod: "online",
			maxPlayers: 2,
			players: ["bob"]
		},

		{
			id: "fwefwehfwef-wjehfwejhf-wefjhwv-fwefe",
			mod: 'pongbr',
			maxPlayers: 100,
			players: ["wef", "wefwefwf", "csdcxc", "adsad", "ashdahv", "kklks", "wefef"]
		}, {
			id: "wefbwefb-wefwefwef-wefwefwjhfebwe-we",
			mod: "online",
			maxPlayers: 2,
			players: ["bob"]
		},

		{
			id: "fwefwehfwef-wjehfwejhf-wefjhwv-fwefe",
			mod: 'pongbr',
			maxPlayers: 100,
			players: ["wef", "wefwefwf", "csdcxc", "adsad", "ashdahv", "kklks", "wefef"]
		}, {
			id: "wefbwefb-wefwefwef-wefwefwjhfebwe-we",
			mod: "online",
			maxPlayers: 2,
			players: ["bob"]
		},

		{
			id: "fwefwehfwef-wjehfwejhf-wefjhwv-fwefe",
			mod: 'pongbr',
			maxPlayers: 100,
			players: ["wef", "wefwefwf", "csdcxc", "adsad", "ashdahv", "kklks", "wefef"]
		},
		{
			id: "fwefwehfwef-wjehfwejhf-wefjhwv-fwefe",
			mod: 'pongbr',
			maxPlayers: 100,
			players: ["wef", "wefwefwf", "csdcxc", "adsad", "ashdahv", "kklks", "wefef"]
		},
		{
			id: "wefbwefb-wefwefwef-wefwefwjhfebwe-we",
			mod: "online",
			maxPlayers: 2,
			players: ["bob"]
		},

		{
			id: "fwefwehfwef-wjehfwejhf-wefjhwv-fwefe",
			mod: 'pongbr',
			maxPlayers: 100,
			players: ["wef", "wefwefwf", "csdcxc", "adsad", "ashdahv", "kklks", "wefef"]
		}, {
			id: "wefbwefb-wefwefwef-wefwefwjhfebwe-we",
			mod: "online",
			maxPlayers: 2,
			players: ["bob"]
		},

		{
			id: "fwefwehfwef-wjehfwejhf-wefjhwv-fwefe",
			mod: 'pongbr',
			maxPlayers: 100,
			players: ["wef", "wefwefwf", "csdcxc", "adsad", "ashdahv", "kklks", "wefef"]
		},
		{
			id: "fwefwehfwef-wjehfwejhf-wefjhwv-fwefe",
			mod: 'pongbr',
			maxPlayers: 100,
			players: ["wef", "wefwefwf", "csdcxc", "adsad", "ashdahv", "kklks", "wefef"]
		},




	]
};



interface playHtmlReference {
	create: HTMLDivElement;
	join: HTMLDivElement;
	brMod: HTMLInputElement;
	tournamentMod: HTMLInputElement;
	defaultMap: HTMLInputElement;
	localMod: HTMLInputElement;
	onlineMod: HTMLInputElement;
	aiMod: HTMLInputElement;
	createBtn: HTMLInputElement;
	createWin: HTMLDivElement;
	list: HTMLTableElement;
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
	id: string,
	mod: string,
	maxPlayers: number,
	players: string[]
}

interface listResp {
	lobbies: lobby[];
}

export default class Play {
	private div: HTMLDivElement;
	private ref: playHtmlReference;
	private state: playState;

	private createState: createState;



	private gameIP = "10.19.220.253";
	constructor(div: HTMLDivElement) {
		this.div = div;
		console.log(div.id);

		this.ref = {
			create: div.querySelector('#play-create') as HTMLDivElement,
			join: div.querySelector("#play-join") as HTMLDivElement,
			brMod: div.querySelector("#br-mod") as HTMLInputElement,
			tournamentMod: div.querySelector("#tournament-mod") as HTMLInputElement,
			defaultMap: div.querySelector("#default-map") as HTMLInputElement,
			localMod: div.querySelector("#local-mod") as HTMLInputElement,
			onlineMod: div.querySelector("#online-mod") as HTMLInputElement,
			aiMod: div.querySelector("#ai-mod") as HTMLInputElement,
			createBtn: div.querySelector("#create-btn") as HTMLInputElement,
			createWin: div.querySelector("#create-btn-window") as HTMLDivElement,
			list: div.querySelector("#join-list") as HTMLTableElement
		}

		this.createState = {
			mod: null,
			map: null,
		}

		this.state = playState.create;
		this.ref.create.remove();
		this.ref.join.remove();

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
		})

		//this.ref.smod.toggleAttribute('off');
		//this.ref.createBtn.toggleAttribute('off');

		//
		//this.ref.modPong.addEventListener('click', () => {
		//	this.ref.modPong.toggleAttribute('ok');
		//	this.ref.modBR.removeAttribute('ok');
		//	this.ref.smod.toggleAttribute('off');
		//	this.createState.mod = this.ref.modPong.hasAttribute('ok') ? 1 : 0;
		//	if (this.createState.mod && this.createState.map && this.createState.submod) {
		//		this.ref.createBtn.setAttribute('ok', '');
		//	} else {
		//		this.ref.createBtn.removeAttribute('ok');
		//	}
		//})
		//
		//this.ref.modBR.addEventListener('click', () => {
		//	this.ref.modBR.toggleAttribute('ok');
		//	this.ref.modPong.removeAttribute('ok');
		//	this.ref.smod.setAttribute('off', '');
		//	this.createState.mod = this.ref.modBR.hasAttribute('ok') ? 2 : 0;
		//	if (this.createState.mod && this.createState.map) {
		//		this.ref.createBtn.setAttribute('ok', '');
		//	} else {
		//		this.ref.createBtn.removeAttribute('ok');
		//	}
		//
		//})
		//
		//this.ref.mapDefault.addEventListener('click', () => {
		//	this.ref.mapDefault.toggleAttribute('ok');
		//	this.createState.map = this.ref.mapDefault.hasAttribute('ok');
		//
		//	if ((this.createState.mod == 2 || this.createState.mod == 1 && this.createState.submod) && this.createState.map) {
		//		this.ref.createBtn.setAttribute('ok', '');
		//	} else {
		//		this.ref.createBtn.removeAttribute('ok');
		//	}
		//
		//})
		//
		//this.ref.smodOnline.addEventListener('click', () => {
		//	this.ref.smodOnline.toggleAttribute('ok')
		//	this.ref.smodLocal.removeAttribute('ok')
		//	this.ref.smodAI.removeAttribute('ok')
		//	this.createState.submod = this.ref.smodOnline.hasAttribute('ok');
		//	if (this.createState.mod && this.createState.map && this.createState.submod) {
		//		this.ref.createBtn.setAttribute('ok', '');
		//	} else {
		//		this.ref.createBtn.removeAttribute('ok');
		//	}
		//
		//
		//})
		//
		//this.ref.smodLocal.addEventListener('click', () => {
		//	this.ref.smodLocal.toggleAttribute('ok')
		//	this.ref.smodAI.removeAttribute('ok')
		//	this.ref.smodOnline.removeAttribute('ok')
		//	this.createState.submod = this.ref.smodLocal.hasAttribute('ok');
		//	if (this.createState.mod && this.createState.map && this.createState.submod) {
		//		this.ref.createBtn.setAttribute('ok', '');
		//	} else {
		//		this.ref.createBtn.removeAttribute('ok');
		//	}
		//
		//
		//})
		//
		//this.ref.smodAI.addEventListener('click', () => {
		//	this.ref.smodAI.toggleAttribute('ok')
		//	this.ref.smodLocal.removeAttribute('ok')
		//	this.ref.smodOnline.removeAttribute('ok')
		//	this.createState.submod = this.ref.smodAI.hasAttribute('ok');
		//	if (this.createState.mod && this.createState.map && this.createState.submod) {
		//		this.ref.createBtn.setAttribute('ok', '');
		//	} else {
		//		this.ref.createBtn.removeAttribute('ok');
		//	}
		//
		//})




		//this.ref = {
		//	mod: div.querySelector("#play-mod") as HTMLSelectElement,
		//	map: div.querySelector("#play-map") as HTMLSelectElement,
		//	submod: div.querySelector("#play-submod") as HTMLSelectElement,
		//	create: div.querySelector("#create-btn") as HTMLInputElement,
		//	joinID: div.querySelector("#join-id") as HTMLInputElement,
		//	join: div.querySelector("#join-btn") as HTMLInputElement,
		//	refresh: div.querySelector("#play-refresh") as HTMLInputElement,
		//	list: div.querySelector("#play-list") as HTMLDivElement
		//}

		App3D.setVue('play');
		playVue.windowAddEvent('create', 'click', () => {
			this.ref.join.remove();
			this.div.appendChild(this.ref.create);
			this.state = playState.create;
		})

		playVue.windowAddEvent('join', 'click', () => {
			this.ref.create.remove();
			this.div.appendChild(this.ref.join);
			this.state = playState.join;
		})


		//this.ref.mod.addEventListener("change", () => {
		//	if (this.ref.mod.value == "pong") {
		//		this.ref.submod.removeAttribute("disabled");
		//	} else {
		//		this.ref.submod.setAttribute("disabled", "");
		//	}
		//});
		//
		//this.ref.joinID.addEventListener('input', () => {
		//	this.ref.join.disabled = false;
		//})
		//
		//this.ref.create.addEventListener("click", () => {
		//	console.log(`create lobby: mod=${this.ref.mod.value == "pong" ? this.ref.submod.value : this.ref.mod.value}, map=${this.ref.map.value}`);
		//	this.postRequest("lobby/create", {
		//		mode: this.ref.mod.value == "pong" ? this.ref.submod.value : this.ref.mod.value,
		//		map: this.ref.map.value
		//	})
		//		.then((json) => { this.createResolve(json) })
		//		.catch((resp) => { this.createReject(resp) });
		//});
		//
		//this.ref.join.addEventListener("click", () => {
		//	console.log(`join lobby: id=${this.ref.joinID.value}`);
		//	this.getRequest(`lobby/${this.ref.joinID.value}`)
		//		.then((json) => { this.joinResolve(json) })
		//		.catch((resp) => { this.joinReject(resp) });
		//})
		//
		//this.ref.refresh.addEventListener("click", () => {
		//	console.log("refresh lobby list")
		//	this.getRequest(`lobby/list`)
		//		.then((json) => { this.listResolve(json) })
		//		.catch((resp) => { this.listReject(resp) });
		//})
	}

	public load(params: URLSearchParams) {
		App3D.loadVue('play');
		switch (this.state) {
			case playState.create: {
				this.div.appendChild(this.ref.create);
				break;
			}
			case playState.join: {
				this.div.appendChild(this.ref.join);
				break;
			}

		}
		this.parseListResp(lr);
		if (User.status?.lobby) {
			Router.nav(`/lobby?id=${User.status.lobby}`, false, false);
		}
		//this.ref.join.disabled = true;
		document.querySelector("#main-container")?.appendChild(this.div);
	}

	public async unload() {
		App3D.unloadVue('play');
		this.div.remove();
	}

	async postRequest(path: string, body: {}): Promise<JSON> {
		const response = await fetch(`http://${this.gameIP}:5001/${path}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)

		});

		if (!response.ok) {
			return Promise.reject(response);
		}

		return response.json();
	}

	async getRequest(path: string): Promise<JSON> {
		const response = await fetch(`http://${this.gameIP}:5001/${path}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		});

		if (!response.ok) {
			return Promise.reject(response);
		}

		return response.json();
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
		//this.ref.list.innerHTML = '';
		//const div = document.createElement('tr');
		//const id = document.createElement('th');
		//const mod = document.createElement('th');
		//const player = document.createElement('th');
		//id.innerText = "lobby id";
		//mod.innerText = "mod";
		//player.innerText = "players";
		//div.appendChild(id);
		//div.appendChild(mod);
		//div.appendChild(player);
		//
		//this.ref.list.appendChild(div);

		for (let i = 0; i < resp.lobbies.length; i++) {
			body.appendChild(this.createLobbyList(resp.lobbies[i]));
		}
	}

	private createLobbyList(l: lobby): HTMLElement {
		const div = document.createElement('tr');
		const id = document.createElement('td');
		const mod = document.createElement('td');
		const player = document.createElement('td');
		id.innerText = l.id;
		mod.innerText = l.mod;
		player.innerText = `${l.players.length}/${l.maxPlayers}`;
		div.appendChild(id);
		div.appendChild(mod);
		div.appendChild(player);

		return div;
	}


}

