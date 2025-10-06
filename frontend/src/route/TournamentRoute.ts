import { htmlManager } from "../html/HtmlManager";
import { sceneManager } from "../scene/SceneManager";
import { streamManager } from "../stream/StreamManager";
import { IRoute } from "./IRoute";

export class TournamentRoute implements IRoute {
	public created: boolean = true;

	constructor() { }

	public async load(): Promise<void> {
		console.log("totbabna");
		sceneManager.load("home");
		sceneManager.cameraManager.vue = "tournament";
		htmlManager.tournament.load();
		streamManager.tournament.connect();
	}

	public async unload(): Promise<void> {
		htmlManager.tournament.unload();
		streamManager.tournament.disconnect();
	}
}
