import Router from "./Router";
import { PongBR } from "../pongbr/PongBR";
import { App3D } from "../3d/App";
import { User } from "./User";
import GameUI from "./GameUI";


export default class br {
	private div: HTMLDivElement;
	private pongbr: PongBR | null;

	private mod: string | null;
	private map: string | null;
	private id: string | null;
	private gameUI: GameUI;

	constructor(div: HTMLDivElement) {
		this.div = div;
		this.pongbr = null;
		this.mod = null;
		this.map = null;
		this.id = null;

		this.gameUI = new GameUI(this.div, {
			enabledModules: ['buttons', 'ending', 'images', 'playercounter'],
			theme: 'br',
			modulePositions: {
				buttons: { x: 'right', y: 'bottom' },
				ending: {x:'center', y:'center'},
				images: {x:'center', y:'center'},
				playercounter: {x:"left", y:'top'}
			}
		});
	}

	public unload() {
		// App3D.enableBr(false);
		App3D.enableHome();
		//document.querySelector("canvas")?.blur();
		this.pongbr?.stop();
		this.gameUI.unload();
		//this.pongbr?.dispose();
		//this.div.remove();
	}

	public load(params: URLSearchParams) {
		App3D.setVue('pongBR');
		App3D.disableHome();
		// App3D.enableBr(true);
		document.querySelector("canvas")?.focus();
		// this.pongbr?.dispose();

		this.gameUI.load();
		this.gameUI.showButton('quit', 'Quit', () => {
			Router.nav('/home', false, true);
			console.log('Game quit');
		});

		if (!this.pongbr)
			this.pongbr = new PongBR(document.querySelector("#canvas"), App3D.scene, this.gameUI);
		let gameId = params.get("id");
		let uuid = User.uuid;
		if (!gameId)
			gameId = "";
		if (!uuid)
			uuid = "";
		this.pongbr.start(gameId, uuid);
	}
}

