import Router from "./Router";

interface dom {
	mod: HTMLInputElement;
	pong: HTMLInputElement;
	br: HTMLInputElement;
	io: HTMLInputElement;
	map: HTMLInputElement;
	submod: HTMLInputElement;
	joinId: HTMLInputElement;
	create: HTMLInputElement;
	join: HTMLInputElement;
};

export default class Play {
	private loaded = false;
	private dom: dom;

	constructor() {
	}

	public init() {
		if (this.loaded) { return };

		this.dom = {};
		this.dom.mod = document.getElementById("lobby-mod") as HTMLInputElement;
		this.dom.pong = document.getElementById("pong-mod") as HTMLInputElement;
		this.dom.br = document.getElementById("br-mod") as HTMLInputElement;
		this.dom.io = document.getElementById("io-mod") as HTMLInputElement;
		this.dom.map = document.getElementById("lobby-map") as HTMLInputElement;
		this.dom.submod = document.getElementById("lobby-submod") as HTMLInputElement;
		this.dom.joinId = document.getElementById("join-input") as HTMLInputElement;
		this.dom.create = document.getElementById("create-button") as HTMLInputElement;
		this.dom.join = document.getElementById("join-button") as HTMLInputElement;

		this.dom.pong.addEventListener("click", () => { this.dom.submod.removeAttribute("disabled") });
		this.dom.br.addEventListener("click", () => { this.dom.submod.setAttribute("disabled", "") });
		this.dom.io.addEventListener("click", () => { this.dom.submod.setAttribute("disabled", "") });

		this.dom.create.addEventListener("click", () => { this.createCallback() })
		this.dom.join.addEventListener("click", () => { this.joinCallback() });

		this.loaded = true;
	}

	public reset() { }

	private createCallback() {
		this.createLobbyRequest()
			.then((json) => {
				Router.nav("/home/lobby?id=" + json.lobbyId);
			})
			.catch((error) => {
				document.getElementById("status")?.dispatchEvent(
					new CustomEvent("status", { detail: { ok: false, json: error } }));
			})
	}

	private joinCallback() {
		Router.nav("/home/lobby?id=" + this.dom.joinId.value);
	}

	private async createLobbyRequest() {
		const response = await fetch("http://localhost:5001" + "/lobby/create", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			mode: 'cors',
			body: JSON.stringify({
				"mode": this.dom.mod.value,
				"map": this.dom.map.value,
				"submode": this.dom.submod.value
			})
		});
		if (!response.ok) {
			const error = response.json()
				.then((json) => {
					return json.error || response.statusText;
				})
			return Promise.reject(error);
		}

		return response.json();
	}


}
