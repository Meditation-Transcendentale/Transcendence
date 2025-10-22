import { gameManager } from "../game/GameManager";
import { htmlManager } from "../html/HtmlManager";
import { sceneManager } from "../scene/SceneManager";
import { stateManager } from "../state/StateManager";
import { IRoute } from "./IRoute";
import { routeManager } from "./RouteManager";

export class PongRoute implements IRoute {
	public created: boolean;


	private _loaded = false;
	constructor() {
		this.created = true;
	}

	public async load(): Promise<boolean> {
		if (stateManager.gameId == "") {
			routeManager.nav("/play", false, false, true);
			return false;
		}
		this._loaded = true;
		htmlManager.friendlist.remove();
		sceneManager.cameraManager.vue = stateManager.gameMap;
		sceneManager.load(stateManager.gameMap);
		gameManager.launchPong();
		htmlManager.cube.enable = false;
		return true;
	}

	public async unload(): Promise<void> {
		if (!this._loaded)
			return;
		this._loaded = false;
		gameManager.stopPong();
	}
}
