import { htmlManager } from "../html/HtmlManager";
import { sceneManager } from "../scene/SceneManager";
import { IRoute } from "./IRoute";
import { routeManager } from "./RouteManager";

export class HomeRoute implements IRoute {
	public created: boolean;

	constructor() {
		this.created = false;
	}

	public async init() {
		// const div = fetchHTML("home")
		// 	.catch((err) => { alert("fecth html home error") });
		// htmlManager.home.init(div);
		this.created = true;
	}

	public async load() {
		if (!this.created)
			await this.init();
		sceneManager.cameraManager.vue = "home";
		sceneManager.load("home");
		htmlManager.cube.name = "PLAY";
		htmlManager.cube.enable = true;
		htmlManager.cube.clickEvent = () => routeManager.nav("/play", false, false);

	}

	public async unload() {
		// htmlManager.home.unload();
	}

}
