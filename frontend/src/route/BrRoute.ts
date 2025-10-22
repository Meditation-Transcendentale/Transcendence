import { gameManager } from "../game/GameManager";
import { htmlManager } from "../html/HtmlManager";
import { sceneManager } from "../scene/SceneManager";
import { stateManager } from "../state/StateManager";
import { IRoute } from "./IRoute";
import { routeManager } from "./RouteManager";

export class BrRoute implements IRoute {
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
		sceneManager.cameraManager.vue = "br";
		sceneManager.assets.scene.activeCamera = sceneManager.assets.cameraBr;
		sceneManager.load("br");
		gameManager.launchBr();
		htmlManager.cube.enable = false;
		return true;
	}

	public async unload(): Promise<void> {
		if (!this._loaded)
			return;
		this._loaded = false;
		sceneManager.assets.scene.activeCamera = sceneManager.camera;
		gameManager.stopBr();
	}
}
