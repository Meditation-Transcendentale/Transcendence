import { stateManager } from "../state/StateManager";
import { IRoute } from "./IRoute";
import { routeManager } from "./RouteManager";

export class PlayRoute implements IRoute {
	public created: boolean;

	constructor() {
		this.created = true;
		stateManager.playPath = "/play/create";
	}

	public async load(): Promise<void> {
		routeManager.comebackRoute = "/home";
		routeManager.nav(stateManager.playPath);
	}

	public async unload(): Promise<void> {
	}
}
