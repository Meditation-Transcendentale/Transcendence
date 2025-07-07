import Router from "./Router";
import { PongBR } from "../pongbr/PongBR";
import { App3D } from "../3d/App";


export default class br {
	private div: HTMLDivElement;
	private pongbr: PongBR | null;

	private mod: string | null;
	private map: string | null;
	private id: string | null;

	constructor(div: HTMLDivElement) {
		this.div = div;
		App3D.setVue('test');
		this.pongbr = null;
		this.mod = null;
		this.map = null;
		this.id = null;
	}

	public unload() {
		App3D.unloadVue('test');
		//document.querySelector("canvas")?.blur();
		this.pongbr?.stop();
		//this.pongbr?.dispose();
		//this.div.remove();
		(document.querySelector("#main-container") as HTMLDivElement).style.zIndex = "0";
	}

	public load(params: URLSearchParams) {
		App3D.loadVue('test');
		//document.querySelector("canvas")?.focus();
		// this.pongbr?.dispose();
		(document.querySelector("#main-container") as HTMLDivElement).style.zIndex = "-1";
		if (!this.pongbr)
			this.pongbr = new PongBR(document.querySelector("#canvas"), params.get("id"), App3D.scene);
		let gameId = params.get("id");
		if (!gameId)
			gameId = "";
		this.pongbr.start(gameId);
	}
}

