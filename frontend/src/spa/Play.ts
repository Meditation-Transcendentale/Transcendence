import { App3D } from "../3d/App";
import { playVue } from "../Vue";
import { getRequest, postRequest } from "./requests";
import Router from "./Router";
import { User } from "./User";
import { createButton } from "./utils";


interface playHtmlReference {
	create: HTMLDivElement;
	join: HTMLDivElement;
	modPong: HTMLInputElement;
	modBR: HTMLInputElement;
	mapDefault: HTMLInputElement;
	smod: HTMLDivElement;
	smodLocal: HTMLInputElement;
	smodOnline: HTMLInputElement;
	smodAI: HTMLInputElement;
};

enum playState {
	create = 0,
	join = 1,
	lobby = 2
}

export default class Play {
	private div: HTMLDivElement;
	private ref: playHtmlReference;
	private state: playState;

	private gameIP = "10.19.220.253";
	constructor(div: HTMLDivElement) {
		this.div = div;
		console.log(div.id);

		this.ref = {
			create: div.querySelector('#play-create') as HTMLDivElement,
			join: div.querySelector("#play-join") as HTMLDivElement,
			modPong: div.querySelector("#pong-mod") as HTMLInputElement,
			modBR: div.querySelector("#br-mod") as HTMLInputElement,
			mapDefault: div.querySelector("#default-map") as HTMLInputElement,
			smod: div.querySelector("#create-submod") as HTMLDivElement,
			smodLocal: div.querySelector("#local-submod") as HTMLInputElement,
			smodAI: div.querySelector("#ia-submod") as HTMLInputElement,
			smodOnline: div.querySelector("#online-submod") as HTMLInputElement,


		}

		this.state = playState.create;
		this.ref.create.remove();
		this.ref.join.remove();
		this.ref.smod.toggleAttribute('off');
		this.ref.smodLocal.toggleAttribute('on');
		this.ref.smodOnline.toggleAttribute('on');


		this.ref.modPong.addEventListener('click', () => {
			this.ref.modPong.toggleAttribute('ok');
			this.ref.modBR.removeAttribute('ok');
			this.ref.smod.toggleAttribute('off');
			this.ref.smodAI.toggleAttribute('on');
			this.ref.smodLocal.toggleAttribute('on');
			this.ref.smodOnline.toggleAttribute('on');
		})

		this.ref.modBR.addEventListener('click', () => {
			this.ref.modBR.toggleAttribute('ok');
			this.ref.modPong.removeAttribute('ok');
			this.ref.smod.setAttribute('off', '');
			this.ref.smodLocal.setAttribute('on', '')
			this.ref.smodOnline.setAttribute('on', '')
			this.ref.smodAI.setAttribute('on', '')

		})

		this.ref.mapDefault.addEventListener('click', () => {
			this.ref.mapDefault.toggleAttribute('ok');
		})

		this.ref.smodOnline.addEventListener('click', () => {
			this.ref.smodOnline.toggleAttribute('ok')
			this.ref.smodLocal.removeAttribute('ok')
			this.ref.smodAI.removeAttribute('ok')
		})

		this.ref.smodLocal.addEventListener('click', () => {
			this.ref.smodLocal.toggleAttribute('ok')
			this.ref.smodAI.removeAttribute('ok')
			this.ref.smodOnline.removeAttribute('ok')
		})

		this.ref.smodAI.addEventListener('click', () => {
			this.ref.smodAI.toggleAttribute('ok')
			this.ref.smodLocal.removeAttribute('ok')
			this.ref.smodOnline.removeAttribute('ok')
		})




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


}

