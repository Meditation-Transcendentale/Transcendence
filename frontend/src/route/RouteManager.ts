import { htmlManager } from "../html/HtmlManager";
import { gUser } from "../User";

class RouteManager {
	private routes: Map<string, string>;
	private location: string;
	private first: boolean;

	constructor() {
		console.log("%c ROUTE Manager", "color: white; background-color: red");
		this.routes = new Map<string, string>;
		this.routes.set("/auth", "auth");
		this.routes.set("/home", "home");
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

		await gUser.check()
			.catch(() => {
				if (url.pathname != "/auth") {
					url.pathname = "/auth";
					url.search = "";
					if (!this.first) {
						alert("not connected");
					};
					console.log("%c Not logged in redirected to /login", "color: white; background-color: red")
					window.history.pushState("", "", url.pathname + url.search)
					htmlManager.loadPage(url.pathname, this.routes.get(url.pathname) as string);
				}
			});

		if (url.pathname == "/auth" || (this.first && url.pathname == "/cajoue")) {
			url.pathname = "/home";
			url.search = "";
		}
		this.first = false;

		if (history)
			window.history.pushState("", "", url.pathname + url.search)
		htmlManager.loadPage(url.pathname, this.routes.get(url.pathname) as string);


		// if (url.pathname !== "/auth" ) {
		// 	this.loadAth();
		// }
	}
}

export const routeManager = new RouteManager();


