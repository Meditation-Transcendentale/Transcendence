import Router from "./Router";
import { App3D } from "../3d/App";
import { User } from "./User";
import { BrickBreaker } from "../brickbreaker/brickbreaker";
import GameUI from "./GameUI";


export default class brick {
	private div: HTMLDivElement;
	private game: BrickBreaker | null;
	private gameUI: GameUI;


	constructor(div: HTMLDivElement) {
		this.div = div;
		this.game = null;
		this.gameUI = new GameUI(this.div, {
			enabledModules: ['score', 'timer', 'buttons'],
			theme: 'pong',
			modulePositions: {
				score: { x: 'center', y: 'top', offset: { x: 100, y: 0 } },
				timer: { x: 'center', y: 'top', offset: { x: -100, y: 0 } },
				buttons: { x: 'center', y: 'bottom' }
			}
		});
	}

	public unload() {
		App3D.enableHome();
		//document.querySelector("canvas")?.blur();
		this.game?.stop();
		this.gameUI.unload();
		//this.pongbr?.dispose();
		//this.div.remove();
	}

	public load(params: URLSearchParams) {
		App3D.setVue('brick');
		App3D.disableHome();
		//document.querySelector("canvas")?.focus();
		// this.pongbr?.dispose();

		//const gameUIDiv = this.div.querySelector("#game-ui-container") as HTMLDivElement;


		this.gameUI.load();
		this.gameUI.showButton('restart', 'Restart', () => {
			console.log('Game restarted');
		});
		this.gameUI.showButton('coucou', 'coucou', () => {
			console.log('Game restarted');
		});


		if (!this.game)
			this.game = new BrickBreaker(document.querySelector("#canvas") as HTMLCanvasElement, App3D.scene);
		this.game.start();
	}
}


