import { meReject, meRequest } from "./requests";

type routePage = {
	html: string,
	ts: string,
	callback: (url: URL) => void
	instance?: IPage,
};

interface IPage {
	load(params?: URLSearchParams): void;
	unload(): Promise<any>;
}

class RouterC {
	private location: string | null;
	private oldURL: string;
	private initRoute: string | null;
	private first = true;
	private currentPage: IPage | null;

	private routes: Map<string, routePage>;
	private ath: routePage;

	private parser: DOMParser;

	public AUTHENTIFICATION: boolean = true;

	constructor() {
		this.initRoute = null;
		this.location = `http://${window.location.hostname}:7000`;
		this.oldURL = "";
		this.currentPage = null;
		this.parser = new DOMParser();

		this.routes = new Map<string, routePage>;

		this.routes.set("/login", {
			html: "/login",
			ts: "./Login",
			callback: (url: URL) => { this.loadInMain(url) }
		} as routePage);
		this.routes.set("/register", {
			html: "/register",
			ts: "./Register",
			callback: (url: URL) => { this.loadInMain(url) }
		} as routePage);
		this.routes.set("/home", {
			html: "/home",
			ts: "./Home",
			callback: (url: URL) => { this.loadInMain(url) }
		} as routePage);
		this.routes.set("/info", {
			html: "/info",
			ts: "./Info",
			callback: (url: URL) => { this.loadInMain(url) }
		} as routePage);
		this.routes.set("/stats", {
			html: "/stats",
			ts: "./Stats",
			callback: (url: URL) => { this.loadInMain(url) }
		} as routePage);
		this.routes.set("/lobby", {
			html: "/lobby",
			ts: "./Lobby",
			callback: (url: URL) => { this.loadInMain(url) }
		} as routePage);
		this.routes.set("/play", {
			html: "/play",
			ts: "./Play",
			callback: (url: URL) => { this.loadInMain(url) }
		} as routePage);
		this.routes.set("/friendlist", {
			html: "/friendlist",
			ts: "./Friendlist",
			callback: (url: URL) => { this.loadInMain(url) }
		} as routePage);
		this.routes.set("/game", {
			html: "/game-ui",
			ts: "./Game",
			callback: (url: URL) => { this.loadInMain(url) }
		} as routePage);
		this.routes.set("/brick", {
			html: "/game-ui",
			ts: "./brick",
			callback: (url: URL) => { this.loadInMain(url) }
		} as routePage);
		this.routes.set("/test", { //TO USE FOR TEMPORARY ROUTE EX: BR / IO
			html: "/game",
			ts: "./br",
			callback: (url: URL) => { this.loadInMain(url) }
		} as routePage);
		this.routes.set("/exemple", { //TO USE FOR TEMPORARY ROUTE EX: BR / IO
			html: "/exemple",
			ts: "./Exemple",
			callback: (url: URL) => { this.loadInMain(url) }
		} as routePage);



		this.ath = {
			html: "/ath",
			ts: "./Ath",
			callback: () => { this.loadAth() }
		}

		window.addEventListener("popstate", () => {
			this.currentPage?.unload()
				.then(() => { this.nav(window.location.href.substring(window.location.origin.length), false, false) })
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
		if (this.initRoute == null) { this.initRoute = path }

		const url = new URL(
			restore ? this.oldURL : this.location + path);

		this.nav
		if (!this.routes.has(url.pathname)) {
			alert("404" + url.pathname);
			url.pathname = "/home";
			url.search = "";
		}

		if (this.AUTHENTIFICATION) {
			//this.oldURL = url.href;
			await meRequest("no-cache")
				.then(() => {
					if (url.pathname == "/login" || url.pathname == "/register") {
						url.pathname = "/home";
						url.search = "";
					}
					this.oldURL = url.href;
					this.first = false;
				})
				.catch(() => {
					this.oldURL = url.href;
					if (url.pathname != "/login" && url.pathname != "/register") {
						url.pathname = "/login";
						url.search = "";
						if (!this.first) {
							meReject();
							throw ("aaa");
						};
						console.log("%c Not logged in redirected to /login", "color: white; background-color: red")
					}
				})
		} else {
			if (url.pathname == "/login" || url.pathname == "/register") {
				url.pathname = "/home";
				url.search = "";
			}
			this.oldURL = url.href;
		}


		console.log("%c Navigating to %s", "color: white; background-color: blue", url.href);

		//url.pathname = "/home";
		if (url.pathname !== "/login" && url.pathname !== "/register") {
			this.loadAth();
		}
		this.routes.get(url.pathname)?.callback(url);
		if (history) {
			window.history.pushState("", "", url.pathname + url.search)
		}

	}

	private async loadInMain(url: URL) {
		console.log("%c Loading: %s", "color: white; background-color: green", url.pathname)
		const route = this.routes.get(url.pathname);
		console.log(route);
		if (!route?.instance) {
			const html = await this.getHTML(route!.html);
			const ts = await this.getTS(route!.ts);
			route!.instance = new ts.default(html);
		}
		await this.currentPage?.unload();
		this.currentPage = (route?.instance as IPage);
		this.currentPage.load(url.searchParams);
	}

	private async loadAth() {
		if (!this.ath.instance) {
			const html = await this.getHTML(this.ath!.html);
			const ts = await this.getTS(this.ath!.ts);
			this.ath!.instance = new ts.default(html);
		}
		this.ath.instance?.load();
	}


	private async getHTML(path: string): Promise<HTMLDivElement> {
		console.log("%c Fetching %s", "color: black; background-color: plum", path);
		const url = `https://${window.location.hostname}:7000/html` + path + ".html";
		const response = await fetch(url, { redirect: "error" })

		if (!response.ok) {
			Promise.reject(response)
		};

		const text = await response.text();
		const div = document.createElement("div");
		div.innerHTML = text;
		return div.firstChild as HTMLDivElement;
	}

	private async getTS(path: string): Promise<{ default: any }> {
		console.log("%c Importing %s", "color: black; background-color: orange", path);
		const ts = await import(/* @vite-ignore */ `${path}`);
		return ts;
	}
}
const Router = new RouterC();

export default Router;
