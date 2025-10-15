import { htmlManager } from "../html/HtmlManager";
import { fetchHTML } from "../networking/utils";
import { sceneManager } from "../scene/SceneManager";
import { streamManager } from "../stream/StreamManager";
import { IRoute } from "./IRoute";
import { routeManager } from "./RouteManager";

export class LobbyRoute implements IRoute {
	public created: boolean;

	public _loaded = false;

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
		this._loaded = true;
		htmlManager.ath.checkBeforeHome = true;
		routeManager.comebackRoute = "/play";
		htmlManager.lobby.load();
		streamManager.lobby.connect();
		sceneManager.cameraManager.vue = "lobby";
		sceneManager.load("home");
		htmlManager.cube.enable = false;
		sceneManager.ballGrass.ballOrigin.set(9, 0, -1);
		htmlManager.notification.clearGameInvite();
	}

	public async unload(): Promise<void> {
		this._loaded = false;
		htmlManager.lobby.unload();
		streamManager.lobby.quit();
		streamManager.lobby.disconnect();
	}
}
