import Router from "./Router";
import { Pong } from "./pong/Pong";


export default class Game {
	private loaded: boolean;
	private pong: Pong | null;

	constructor() {
		this.loaded = false;
	}

	public init() {
		if (this.loaded) { return };
		Pong.INIT();
		this.pong = null;
		this.loaded = true;
	}

	public reset(params: URLSearchParams) {
		if (!params.has("id") || !params.has("mod") || !params.has("map") || !params.has("submod")) {
			this.errorOnLoad();
			return;
		}
		console.log(params);
		if (!this.pong != null) {
			this.pong = new Pong(document.getElementById("canvas") as HTMLElement, params.get("id"));
			this.pong.start();
		}
	}

	private errorOnLoad() {
		document.getElementById("status")?.dispatchEvent(new CustomEvent("status", { detail: { ok: false, json: "Error on load redirect to Home" } }));
		setTimeout(() => { Router.nav("/home/play") }, 1000);
	}
}
