import { htmlManager } from "../html/HtmlManager";
import { stateManager } from "../state/StateManager";
import { IRoute } from "./IRoute";
import { routeManager } from "./RouteManager";

export class PlayRoute implements IRoute {
	public created: boolean;

	constructor() {
		this.created = true;
		stateManager.playPath = "/play/create";
	}

	public async load(): Promise<boolean> {
		htmlManager.ath.checkBeforeHome = false;
		routeManager.comebackRoute = "/home";
		routeManager.nav(stateManager.playPath, false, false, true);
		return true;
	}

	public async unload(): Promise<void> {
		routeManager.ha = true;
	}
}
