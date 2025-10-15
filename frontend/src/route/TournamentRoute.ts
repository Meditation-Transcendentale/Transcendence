import { htmlManager } from "../html/HtmlManager";
import { sceneManager } from "../scene/SceneManager";
import { stateManager } from "../state/StateManager";
import { streamManager } from "../stream/StreamManager";
import { IRoute } from "./IRoute";
import { routeManager } from "./RouteManager";

export class TournamentRoute implements IRoute {
	public created: boolean = true;

	private _loaded = false;

	constructor() { }

	public async load(): Promise<void> {
		if (stateManager.tournamentId == "") {
			routeManager.nav("/home");
			return;
		}
		this._loaded = true;
		htmlManager.ath.checkBeforeHome = true;
		sceneManager.load("home");
		sceneManager.cameraManager.vue = "tournament";
		htmlManager.tournament.load();
		streamManager.tournament.connect();
	}

	public async unload(): Promise<void> {
		if (!this._loaded)
			return;
		htmlManager.tournament.unload();
		streamManager.tournament.disconnect();
	}
}
