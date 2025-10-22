import { gameManager } from "../game/GameManager";
import { htmlManager } from "../html/HtmlManager";
import { sceneManager } from "../scene/SceneManager";
import { stateManager } from "../state/StateManager";
import { IRoute } from "./IRoute";
import { routeManager } from "./RouteManager";

export class BrickRoute implements IRoute {
	public created: boolean;

	constructor() {
		this.created = true;
	}

	public async load(): Promise<boolean> {
		if (stateManager.gameMode == "") {
			routeManager.nav("/play", false, false, true);
			return false;
		}
		htmlManager.friendlist.remove();
		sceneManager.cameraManager.vue = "brick";
		sceneManager.load("brick");
		gameManager.launchBrick();
		htmlManager.cube.enable = false;
		return true;
	}

	public async unload(): Promise<void> {
		gameManager.stopBrick();
	}
}




