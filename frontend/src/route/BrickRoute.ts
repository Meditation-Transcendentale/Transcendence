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

	public async load(): Promise<void> {
		if (stateManager.gameMode == "") {
			routeManager.nav("/home");
			return;
		}
		htmlManager.friendlist.remove();
		sceneManager.cameraManager.vue = "brick";
		sceneManager.load("brick");
		gameManager.launchBrick();
		htmlManager.cube.enable = false;
	}

	public async unload(): Promise<void> {
		gameManager.stopBrick();
	}
}




