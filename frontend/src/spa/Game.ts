import Router from "./Router";
import { Pong } from "../pong/Pong";
import { App3D } from "../3d/App";
import { User } from "./User";
import GameUI from "./GameUI";


export default class Game {
	private div: HTMLDivElement;
	private pong: Pong | null;
	private gameUI: GameUI;

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

		this.gameUI = new GameUI(this.div, {
			enabledModules: ['score', 'buttons', 'countdown', 'ending', 'images'],
			theme: 'pong',
			modulePositions: {
				score: { x: 'center', y: 'top'},
				buttons: { x: 'center', y: 'bottom' },
				countdown: {x: 'center', y: 'center'},
				ending: {x:'center', y:'center'},
				images: {x:'center', y:'center'}
			}
		});
	}

	public unload() {
		App3D.enableHome();
		//App3D.unloadVue('game');
		//document.querySelector("canvas")?.blur();
		this.pong?.stop();
		this.gameUI.unload();
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

		// const gameUIDiv = this.div.querySelector("#game-ui-container") as HTMLDivElement;
		this.gameUI.load();
		this.gameUI.showButton('quit', 'Quit', () => {
			Router.nav('/home', false, true);
			console.log('Game quit');
		});
		// this.gameUI.showButton('coucou', 'coucou', () => {
		// 	console.log('Game restarted');
		// });

		if (!this.pong)
			this.pong = new Pong(document.querySelector("#canvas") as HTMLCanvasElement, params.get("id"), App3D.scene, this.gameUI);
		let gameId = params.get("id");
		let uuid = User.uuid;
		let gameMode = params.get("mod");
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
