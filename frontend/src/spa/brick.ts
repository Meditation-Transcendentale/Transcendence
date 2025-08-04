import Router from "./Router";
import { App3D } from "../3d/App";
import { User } from "./User";
import { BrickBreaker } from "../brickbreaker/brickbreaker";


export default class brick {
	private div: HTMLDivElement;
	private game: BrickBreaker | null;


	constructor(div: HTMLDivElement) {
		this.div = div;
		App3D.setVue('brick');
		this.game = null;
	}

	public unload() {
		App3D.unloadVue('brick');
		App3D.enableHome();
		//document.querySelector("canvas")?.blur();
		this.game?.stop();
		//this.pongbr?.dispose();
		//this.div.remove();
		(document.querySelector("#main-container") as HTMLDivElement).style.zIndex = "0";
	}

	public load(params: URLSearchParams) {
		App3D.loadVue('brick');
		App3D.disableHome();
		//document.querySelector("canvas")?.focus();
		// this.pongbr?.dispose();
		(document.querySelector("#main-container") as HTMLDivElement).style.zIndex = "-1";
		if (!this.game)
			this.game = new BrickBreaker(document.querySelector("#canvas") as HTMLCanvasElement, App3D.scene);
		this.game.start();
	}
}


