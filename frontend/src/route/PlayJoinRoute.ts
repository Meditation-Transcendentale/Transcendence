import { htmlManager } from "../html/HtmlManager";
import { fetchHTML } from "../networking/utils";
import { sceneManager } from "../scene/SceneManager";
import { stateManager } from "../state/StateManager";
import { IRoute } from "./IRoute";
import { routeManager } from "./RouteManager";

export class PlayJoinRoute implements IRoute {
	public created: boolean;

	constructor() {
		this.created = false;
	}

	public async init(): Promise<void> {
		const div = await fetchHTML("playJoin")
			.catch((err) => { alert("fecth html play error") });
		htmlManager.playJoin.init(div);
		this.created = true;
	}

	public async load(): Promise<void> {
		if (!this.created)
			await this.init();
		routeManager.comebackRoute = "/home";
		stateManager.playPath = "/play/join";
		htmlManager.playJoin.load();
		sceneManager.load("home");
		sceneManager.cameraManager.vue = "join";
		htmlManager.cube.name = "CREATE";
		htmlManager.cube.clickEvent = () => routeManager.nav("/play/create");
		htmlManager.cube.enable = true;
	}

	public async unload(): Promise<void> {
		htmlManager.playJoin.unload();
	}
}
