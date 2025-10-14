import { htmlManager } from "../html/HtmlManager";
import { fetchHTML } from "../networking/utils";
import { sceneManager } from "../scene/SceneManager";
import { streamManager } from "../stream/StreamManager";
import { IRoute } from "./IRoute";
import { routeManager } from "./RouteManager";

export class LobbyRoute implements IRoute {
	public created: boolean;

	constructor() {
		this.created = false;
	}

	public async init(): Promise<void> {
		const div = await fetchHTML("lobby")
			.catch((err) => { alert("fecth html home error") });
		htmlManager.lobby.init(div);
		this.created = true;
	}

	public async load(): Promise<void> {
		if (!this.created)
			await this.init();
		routeManager.comebackRoute = "/play";
		htmlManager.lobby.load();
		streamManager.lobby.connect();
		sceneManager.cameraManager.vue = "lobby";
		sceneManager.load("home");
		htmlManager.cube.enable = false;
		console.log("ayayaya");
	}

	public async unload(): Promise<void> {
		htmlManager.lobby.unload();
		streamManager.lobby.quit();
		streamManager.lobby.disconnect();
		console.log("ayayay");

	}
}
