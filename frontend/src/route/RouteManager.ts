import { streamManager } from "../stream/StreamManager";
import { User } from "../User";
import { AuthRoute } from "./AuthRoute";
import { BrickRoute } from "./BrickRoute";
import { HomeRoute } from "./HomeRoute";
import { IRoute } from "./IRoute";
import { LobbyRoute } from "./LobbyRoute";
import { PlayCreateRoute } from "./PlayCreateRoute";
import { PlayMapRoute } from "./PlayMapRoute";
import { PlayModeRoute } from "./PlayModeRoute";
import { PlayRoute } from "./PlayRoute";
import { PongRoute } from "./PongRoute";
import { TournamentRoute } from "./TournamentRoute";

class RouteManager {
	private routes: Map<string, IRoute>;
	private location: string;
	private first: boolean;

	public comebackRoute: string;

	private lastRoute: IRoute | null;

	constructor() {
		console.log("%c ROUTE Manager", "color: white; background-color: red");

		this.routes = new Map<string, IRoute>();
		this.routes.set("/auth", new AuthRoute());
		this.routes.set("/home", new HomeRoute());
		this.routes.set("/lobby", new LobbyRoute());
		this.routes.set("/play", new PlayRoute());
		this.routes.set("/play/create", new PlayCreateRoute());
		this.routes.set("/play/mode", new PlayModeRoute());
		this.routes.set("/play/map", new PlayMapRoute());
		this.routes.set("/tournament", new TournamentRoute());
		this.routes.set("/pong", new PongRoute());
		this.routes.set("/brick", new BrickRoute());

		this.comebackRoute = "/home";

		this.lastRoute = null;
		this.first = true;

		this.location = `https://${window.location.hostname}:7000`;

		window.addEventListener("popstate", () => {
			this.nav(window.location.href.substring(window.location.origin.length), false, false);
		});
	}

	/**
	 * Navigate to another page
	 *
	 * @param {string} path		- path to navigate to with or without search parameters
	 * @param {boolean} restore	- restore the last page ex: try to access /stats without being logged, after logged redirect to stats instead of /home
	 * @param {boolean} history	- push url to history
	 * @returns {void}
	 */
	public async nav(path: string, restore: boolean = false, history: boolean = true) {
		let url = new URL(this.location + path);

		if (!this.routes.has(url.pathname)) {
			url.pathname = "/home";
			url.search = "";
			console.error("URL NOT FOUND");
		}

		await User.check()
			.then(() => {
				if (url.pathname == "/auth" || (this.first && url.pathname == "/cajoue")) {
					url.pathname = "/home";
					url.search = "";
				}
				this.first = false;
			})
			.catch(() => {
				if (url.pathname != "/auth") {
					url.pathname = "/auth";
					url.search = "";
					if (!this.first) {
						alert("not connected");
					};
					console.log("%c Not logged in redirected to /login", "color: white; background-color: red")
				}
			});

		if (history)
			window.history.pushState("", "", url.pathname + url.search)
		this.lastRoute?.unload();
		this.routes.get(url.pathname)?.load();
		this.lastRoute = this.routes.get(url.pathname) as IRoute;

		if (url.pathname !== "/auth") {
			streamManager.notification.connect();
		}
	}

	public comeback() {
		this.nav(this.comebackRoute, false, false);
	}
}

export const routeManager = new RouteManager();


