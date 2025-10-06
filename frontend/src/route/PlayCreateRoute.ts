import { htmlManager } from "../html/HtmlManager";
import { fetchHTML } from "../networking/utils";
import { sceneManager } from "../scene/SceneManager";
import { stateManager } from "../state/StateManager";
import { IRoute } from "./IRoute";
import { routeManager } from "./RouteManager";

export class PlayCreateRoute implements IRoute {
	public created: boolean;

	constructor() {
		this.created = false;
	}

	public async init(): Promise<void> {
		const div = await fetchHTML("playCreate")
			.catch((err) => { alert("fecth html play error") });
		htmlManager.playCreate.init(div);
		this.created = true;
	}

	public async load(): Promise<void> {
		if (!this.created)
			await this.init();
		stateManager.playPath = "/play/create";
		htmlManager.playCreate.load();
		sceneManager.load("home");
		sceneManager.cameraManager.vue = "create";
		htmlManager.cube.name = "JOIN";
		htmlManager.cube.clickEvent = () => routeManager.nav("/play/join");
		htmlManager.cube.enable = true;
	}

	public async unload(): Promise<void> {
		htmlManager.playCreate.unload();
	}
}
