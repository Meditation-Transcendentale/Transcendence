import Router from "./Router";
import { App3D } from "../3d/App";
import { User } from "./User";
import { BrickBreaker } from "../brickbreaker/brickbreaker";


export default class brick {
	private div: HTMLDivElement;
	private game: BrickBreaker | null;


	constructor(div: HTMLDivElement) {
		this.div = div;
		this.game = null;
	}

	public unload() {
		App3D.enableHome();
		//document.querySelector("canvas")?.blur();
		this.game?.stop();
		//this.pongbr?.dispose();
		//this.div.remove();
	}

	public load(params: URLSearchParams) {
		App3D.setVue('brick');
		App3D.disableHome();
		//document.querySelector("canvas")?.focus();
		// this.pongbr?.dispose();
		if (!this.game)
			this.game = new BrickBreaker(document.querySelector("#canvas") as HTMLCanvasElement, App3D.scene);
		this.game.start();
	}
}


