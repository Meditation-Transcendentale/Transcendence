import { getRequest, postRequest } from "./requests";
import Router from "./Router";
import { User } from "./User";
import { createButton } from "./utils";


interface playHtmlReference {
	mod: HTMLSelectElement;
	map: HTMLSelectElement;
	submod: HTMLSelectElement;
	create: HTMLInputElement;
	joinID: HTMLInputElement;
	join: HTMLInputElement;
	refresh: HTMLInputElement;
	list: HTMLDivElement;
};

export default class Play {
	private div: HTMLDivElement;
	private ref: playHtmlReference;

	private gameIP = "10.19.219.221";
	// private gameIP = "localhost";
	constructor(div: HTMLDivElement) {
		this.div = div;

		this.ref = {
			mod: div.querySelector("#play-mod") as HTMLSelectElement,
			map: div.querySelector("#play-map") as HTMLSelectElement,
			submod: div.querySelector("#play-submod") as HTMLSelectElement,
			create: div.querySelector("#create-btn") as HTMLInputElement,
			joinID: div.querySelector("#join-id") as HTMLInputElement,
			join: div.querySelector("#join-btn") as HTMLInputElement,
			refresh: div.querySelector("#play-refresh") as HTMLInputElement,
			list: div.querySelector("#play-list") as HTMLDivElement
		}

		this.ref.mod.addEventListener("change", () => {
			if (this.ref.mod.value == "pong") {
				this.ref.submod.removeAttribute("disabled");
			} else {
				this.ref.submod.setAttribute("disabled", "");
			}
		});

		this.ref.joinID.addEventListener('input', () => {
			this.ref.join.disabled = false;
		})

		this.ref.create.addEventListener("click", () => {
			console.log(`create lobby: mod=${this.ref.mod.value == "pong" ? this.ref.submod.value : this.ref.mod.value}, map=${this.ref.map.value}`);
			this.postRequest("lobby/create", {
				mode: this.ref.mod.value == "pong" ? this.ref.submod.value : this.ref.mod.value,
				map: this.ref.map.value
			})
				.then((json) => { this.createResolve(json) })
				.catch((resp) => { this.createReject(resp) });
		});

		this.ref.join.addEventListener("click", () => {
			console.log(`join lobby: id=${this.ref.joinID.value}`);
			this.getRequest(`lobby/${this.ref.joinID.value}`)
				.then((json) => { this.joinResolve(json) })
				.catch((resp) => { this.joinReject(resp) });
		})

		this.ref.refresh.addEventListener("click", () => {
			console.log("refresh lobby list")
			this.getRequest(`lobby/list`)
				.then((json) => { this.listResolve(json) })
				.catch((resp) => { this.listReject(resp) });
		})
	}

	public load(params: URLSearchParams) {
		if (User.status?.lobby) {
			Router.nav(`/lobby?id=${User.status.lobby}`, false, false);
		}
		this.ref.join.disabled = true;
		document.querySelector("#home-container")?.appendChild(this.div);
	}

	public async unload() {
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

