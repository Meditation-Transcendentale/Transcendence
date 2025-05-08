import Router from "./Router";

export default class Game {
	private loaded: boolean;

	constructor() {
		this.loaded = false;
	}

	public init() {
		if (this.loaded) { return };


		this.loaded = true;
	}

	public reset(params: URLSearchParams) {
		if (!params.has("id") || !params.has("mod") || !params.has("map") || !params.has("submod")) {
			this.errorOnLoad();
			return;
		}
		console.log(params);
	}

	private errorOnLoad() {
		document.getElementById("status")?.dispatchEvent(new CustomEvent("status", { detail: { ok: false, json: "Error on load redirect to Home" } }));
		setTimeout(() => { Router.nav("/home/play") }, 1000);
	}
}
