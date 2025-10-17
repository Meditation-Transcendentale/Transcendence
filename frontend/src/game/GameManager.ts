import { fetchHTML } from "../networking/utils";
import { routeManager } from "../route/RouteManager";
import { sceneManager } from "../scene/SceneManager";
import { stateManager } from "../state/StateManager";
import { User } from "../User";
import { BrickBreaker } from "./brickbreaker/brickbreaker";
import GameUI from "./GameUI";
import { Pong } from "./pong/Pong";
import { PongBR } from "./pongbr/PongBR";

export class GameManager {
	private pongUI!: GameUI;
	private brUI!: GameUI;
	private brickUI!: GameUI;

	private pong!: Pong;
	private br!: PongBR;
	private brick!: BrickBreaker;
	//
	private pongRunning: boolean;

	constructor() {
		this.pongRunning = false;
	}

	public launchPong() {
		this.pongUI.load();
		this.pongUI.showButton('quit', 'Quit', () => {
			routeManager.comeback();
			console.log('Game quit');
		});
		this.pong.start(stateManager.gameId, User.uuid, stateManager.gameMode, stateManager.gameMap);
		this.pongRunning = true;
	}

	public launchBrick() {
		this.brickUI.load();
		this.brickUI.showButton('restart', 'Restart', () => {
			this.brick.restart();
			console.log('Restart');
		});
		this.brickUI.showButton('quit', 'Quit', () => {
			routeManager.comeback();
			console.log('Quit');
		});
		this.brick.start(stateManager.gameMode);
	}

	public launchBr() {
		this.brUI.load();
		this.brUI.showButton('quit', 'Quit', () => {
			routeManager.comeback();
			console.log('Game quit');
		});
		this.br.start(stateManager.gameId, User.uuid);
	}

	public stopPong() {
		if (!this.pongRunning)
			return;
		this.pongUI.unload();
		this.pong.stop();
		this.pongRunning = false;
	}

	public stopBrick() {
		this.brickUI.unload();
		this.brick.stop();
	}

	public stopBr() {
		this.brUI.unload();
		this.br.stop();
	}

	public async init() {
		const div = await fetchHTML("game-ui")
			.catch((err) => alert(err)) as HTMLDivElement;

		this.pongUI = new GameUI(div, {
			enabledModules: ['scorevs', 'buttons', 'countdown', 'ending', 'images', 'inputhints'],
			theme: 'pong',
			modulePositions: {
				scorevs: { x: 'center', y: 'top' },
				buttons: { x: 'center', y: 'bottom', offset: { x: 0, y: 50 } },
				countdown: { x: 'center', y: 'center' },
				ending: { x: 'center', y: 'center' },
				images: { x: 'center', y: 'center' },
				inputhints: { x: 'center', y: 'center' }
			}
		})
		this.brUI = new GameUI(div.cloneNode(true) as HTMLDivElement, {
			enabledModules: ['buttons', 'ending', 'images', 'playercounter', 'elimination', 'phasechange', 'countdown', 'brinputhints'],
			theme: 'berserk',
			modulePositions: {
				buttons: { x: 'center', y: 'bottom', offset: { x: 0, y: 50 } },
				ending: { x: 'center', y: 'center' },
				images: { x: 'center', y: 'center' },
				playercounter: { x: "left", y: 'top' },
				elimination: { x: 'center', y: 'bottom', offset: { x: 0, y: 0 } },
				phasechange: { x: 'center', y: 'top', offset: { x: 0, y: 260 } },
				countdown: { x: 'center', y: 'center' },
				brinputhints: { x: 'center', y: 'bottom' }
			}
		})
		this.brickUI = new GameUI(div.cloneNode(true) as HTMLDivElement, {
			enabledModules: ['score', 'buttons', 'ending'],
			theme: 'brick',
			modulePositions: {
				score: { x: 'left', y: 'top', offset: { x: 100, y: 0 } },
				buttons: { x: 'center', y: 'bottom', offset: { x: 0, y: 85 } },
				ending: { x: 'center', y: 'center' }
			}
		});

		this.pong = new Pong(sceneManager.canvas, stateManager.gameId, sceneManager.scene, this.pongUI);
		this.brick = new BrickBreaker(sceneManager.canvas, sceneManager.scene, this.brickUI);
		this.br = new PongBR(sceneManager.canvas, sceneManager.scene, this.brUI);
	}
}

export const gameManager = new GameManager();
