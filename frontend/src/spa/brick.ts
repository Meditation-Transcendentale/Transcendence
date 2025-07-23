import Router from "./Router";
import { App3D } from "../3d/App";
import { User } from "./User";
import { BrickBreaker } from "../brickbreaker/brickbreaker";


export default class br {
	private div: HTMLDivElement;
	private game: BrickBreaker | null;


	constructor(div: HTMLDivElement) {
		this.div = div;
		App3D.setVue('test');
		this.game = null;
	}

	public unload() {
		App3D.unloadVue('test');
		App3D.enableHome();
		//document.querySelector("canvas")?.blur();
		this.game?.stop();
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
		if (!this.game)
			this.game = new BrickBreaker(document.querySelector("#canvas"), App3D.scene);
		let gameId = params.get("id");
		let uuid = User.uuid;
		if (!gameId)
			gameId = "";
		if (!uuid)
			uuid = "";
		this.game.start(gameId, uuid);
	}
}


