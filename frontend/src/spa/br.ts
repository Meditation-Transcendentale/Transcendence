import Router from "./Router";
import { PongBR } from "../pongbr/PongBR";
import { App3D } from "../3d/App";
import { User } from "./User";


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
		App3D.enableHome();
		//document.querySelector("canvas")?.blur();
		this.pongbr?.stop();
		//this.pongbr?.dispose();
		//this.div.remove();
		(document.querySelector("#main-container") as HTMLDivElement).style.zIndex = "0";
	}

	public load(params: URLSearchParams) {
		App3D.loadVue('test');
		App3D.disableHome();
		//document.querySelector("canvas")?.focus();
		// this.pongbr?.dispose();
		(document.querySelector("#main-container") as HTMLDivElement).style.zIndex = "-1";
		if (!this.pongbr)
			this.pongbr = new PongBR(document.querySelector("#canvas"), App3D.scene);
		let gameId = params.get("id");
		let uuid = User.uuid;
		if (!gameId)
			gameId = "";
		if (!uuid)
			uuid = "";
		this.pongbr.start(gameId, uuid);
	}
}

