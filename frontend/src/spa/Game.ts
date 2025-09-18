import Router from "./Router";
import { Pong } from "../pong/Pong";
import { App3D } from "../3d/App";
import { User } from "./User";


export default class Game {
	private div: HTMLDivElement;
	private pong: Pong | null;

	private mod: string | null;
	private map: string | null;
	private id: string | null;


	constructor(div: HTMLDivElement) {
		this.div = div;
		this.pong = null;
		//App3D.setVue('game');
		this.mod = null;
		this.map = null;
		this.id = null;
	}

	public unload() {
		App3D.enableHome();
		//App3D.unloadVue('game');
		//document.querySelector("canvas")?.blur();
		this.pong?.stop();

		// if (this.mod === "tournament") {
		// 	this.mod = null;
		// 	Router.nav(encodeURI(`/tournament?id=${this.tournamentId}`), false, true);
		// }
		// this.mod = null;
		//this.pongbr?.dispose();
		//this.div.remove();
		//(document.querySelector("#main-container") as HTMLDivElement).style.zIndex = "0";
	}

	public load(params: URLSearchParams) {
		App3D.disableHome();
		App3D.setVue('game');
		//App3D.loadVue('game');
		//document.querySelector("canvas")?.focus();
		// this.pongbr?.dispose();
		//(document.querySelector("#main-container") as HTMLDivElement).style.zIndex = "-1";
		if (!this.pong)
			this.pong = new Pong(document.querySelector("#canvas"), params.get("id"), App3D.scene);
		let gameId = params.get("id");
		let uuid = User.uuid;
		let gameMode = params.get("mod");
		this.mod = gameMode;
		let map = params.get("map");
		if (!gameId)
			gameId = "";
		if (!uuid)
			uuid = "";
		if (!gameMode)
			gameMode = "";
		if (!map)
			map = "";
		this.pong.start(gameId, uuid, gameMode, map);
	}

}
