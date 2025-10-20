import { htmlManager } from "../html/HtmlManager";
import { sceneManager } from "../scene/SceneManager";
import { IRoute } from "./IRoute";
import { routeManager } from "./RouteManager";

export class HomeRoute implements IRoute {
	public created: boolean;

	constructor() {
		this.created = true;
	}

	public async init() {
	}

	public async load() {
		htmlManager.ath.checkBeforeHome = false;
		sceneManager.cameraManager.vue = "home";
		sceneManager.load("home");
		htmlManager.cube.name = "PLAY";
		htmlManager.cube.enable = true;
		htmlManager.cube.clickEvent = () => routeManager.nav("/play", false, false);
		sceneManager.ballGrass.ballOrigin.set(0, 0, -7);
	}

	public async unload() {
	}

}
