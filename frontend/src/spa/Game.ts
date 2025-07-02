import Router from "./Router.js";
import { Pong } from "../pong/Pong.js";


export default class Game {
	private div: HTMLDivElement;
	private pong: Pong | null;

	private mod: string | null;
	private map: string | null;
	private id: string | null;

	constructor(div: HTMLDivElement) {
		this.div = div;
		this.pong = null;
		Pong.INIT();
		this.mod = null;
		this.map = null;
		this.id = null;
	}

	public load(params: URLSearchParams) {
		if (!params.has("id") || !params.has("mod") || !params.has("map")) {
			alert("Game url error");
			return;
		}
		this.pong?.dispose();
		this.pong = new Pong(document.querySelector("#canvas"), params.get("id"), params.get("mod"));
		this.pong.start();
	}

	public async unload() {
		// this.pong?.dispose();
		// this.div.remove();
	}
}
