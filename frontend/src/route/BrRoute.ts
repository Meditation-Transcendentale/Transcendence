import { gameManager } from "../game/GameManager";
import { htmlManager } from "../html/HtmlManager";
import { sceneManager } from "../scene/SceneManager";
import { stateManager } from "../state/StateManager";
import { IRoute } from "./IRoute";
import { routeManager } from "./RouteManager";

export class BrRoute implements IRoute {
	public created: boolean;

	constructor() {
		this.created = true;
	}

	public async load(): Promise<void> {
		if (stateManager.gameId == "") {
			routeManager.nav("/home");
			return;
		}
		sceneManager.cameraManager.vue = "br";
		sceneManager.load("br");
		gameManager.launchBr();
		htmlManager.cube.enable = false;
	}

	public async unload(): Promise<void> {
		gameManager.stopBr();
	}
}
