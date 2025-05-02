import { meReject, meRequest } from "./checkMe";
import { Utils } from "./Utils";



class RouterC {
	private mainContainer: HTMLElement;
	private routes: {};
	private location: string;

	private oldUrl!: string;
	private first = true;

	constructor() {
		this.initRoute = null;
		this.location = "http://localhost:8080";
		this.oldUrl = null;

		this.routes = {
			"/auth": {
				html: { path: "/auth", data: null },
				script: { path: "./Auth", data: null },
				callback: (url: URL) => { this.loadInMain(url) }
			},
			"/register": {
				html: { path: "/register", data: null },
				script: { path: "./Register", data: null },
				callback: (url: URL) => { this.loadInMain(url) }
			},
			"/home": {
				html: { path: "/home", data: null },
				script: { path: "./Home", data: null },
				callback: (url: URL) => { this.loadInMain(url) }
			},
			"/home/info": {
				html: { path: "/info", data: null },
				script: { path: "./Info", data: null },
				callback: (url: URL) => { this.loadInHome(url) }
			},
			"/home/stats": {
				html: { path: "/stats", data: null },
				script: { path: "./Stats", data: null },
				callback: (url: URL) => { this.loadInHome(url) }
			}
		};

		this.mainContainer = document.getElementById("main-container") as HTMLElement;
		this.mainContainer.addEventListener("nav", (ev) => {
			if (ev.detail.return) {
				this.nav(this.initRoute);
				return;
			}
			this.nav(ev.detail.path);
		})

		window.addEventListener("popstate", (ev) => {
			//console.log(ev);
			// this.nav(ev.state.path, false);
			this.nav(window.location.href.substring(window.location.origin.length), false, false)
		});

	}

	public async nav(path: string, restore = false, history = true) {
		if (this.initRoute == null) { this.initRoute = path }

		const url = new URL(
			restore ? this.oldUrl : this.location + path);

		if (this.routes[url.pathname] == undefined) {
			alert("404" + url.pathname);
			url.pathname = "/home";
			url.search = "";
		}

		await meRequest("no-cache")
			.then(() => {
				if (url.pathname == "/auth" || url.pathname == "/register") {
					url.pathname = "/home";
					url.search = "";
				}
				this.oldUrl = url.href;
			})
			.catch(() => {
				this.oldUrl = url.href;
				if (url.pathname != "/auth" && url.pathname != "/register") {
					url.pathname = "/auth";
					url.search = "";
					if (!this.first) {
						meReject();
						throw ("aaa");
					};
					console.log("%c Not logged in redirected to /auth", "color: white; background-color: red")
				}
			})


		console.log("%c Navigating to %s", "color: white; background-color: blue", url.href);

		this.first = false;
		this.routes[url.pathname].callback(url);
		if (history) {
			window.history.pushState("", "", url.pathname + url.search)
		}
		// window.history.pushState(g

	}

	private async loadInMain(url: URL, history = true, child = false) {
		console.log("%c Loading: %s", "color: white; background-color: green", url.pathname)
		this.routes[url.pathname].script.data = await this.getScript(this.routes[url.pathname].script);
		this.routes[url.pathname].html.data = await this.getHtml(this.routes[url.pathname].html);

		try {
			document.getElementById("main-container").removeChild(document.getElementById("main-container")?.firstChild);
		} catch (err) { }

		document.getElementById("main-container").appendChild(this.routes[url.pathname].html.data);
		this.routes[url.pathname].script.data.init();
		this.routes[url.pathname].script.data.reset();
	}

	private async loadInHome(url: URL, history = true) {
		if (!document.getElementById("home")) {
			this.loadInMain(new URL(this.location + "/home"), false, true)
				.then(() => { this.loadInHome(url) })
				.catch(() => console.log("%c Not logged in redirected to /auth", "color: white; background-color: red"));
			return;
		}
		console.log("%c Loading: %s", "color: white; background-color: green", url.pathname)

		this.routes[url.pathname].script.data = await this.getScript(this.routes[url.pathname].script);
		this.routes[url.pathname].html.data = await this.getHtml(this.routes[url.pathname].html);

		try {
			document.getElementById("home-container").removeChild(document.getElementById("home-container")?.firstChild);
		} catch (err) { }
		document.getElementById("home-container").appendChild(this.routes[url.pathname].html.data);
		this.routes[url.pathname].script.data.init();
		this.routes[url.pathname].script.data.reset(url.searchParams);
	}


	private async getHtml(html: { path: string, data: HTMLElement }) {
		return new Promise((resolve, reject) => {
			if (html.data != null) {
				console.log("%c %s already fetched", "color: black; background-color: pink", html.path);
				this.addDelay(html.data);
				return resolve(html.data);
			}

			console.log("%c Fetching %s", "color: black; background-color: plum", html.path);
			const url = "http://localhost:8080/html" + html.path + ".html";
			fetch(url, { redirect: "error" })
				.then((response) => {
					if (!response.ok) { return reject(response); }
					return response.text();
				})
				.then((text) => {
					const div = document.createElement("div");
					div.innerHTML = text;
					this.addDelay(div);
					return resolve(div);
				})
		})
	}

	private async getScript(script: { path: string, data: {} }) {
		if (script.data !== null && script.data !== undefined) {
			console.log("%c %s already imported", "color: black; background-color: palegoldenrod", script.path);
			return script.data;
		}
		console.log("%c Importing %s", "color: black; background-color: orange", script.path);
		const im = await import(/* @vite-ignore */ script.path);
		const obj = new im.default();
		return obj;
	}

	private addDelay(e: HTMLElement) {
		e.childNodes.forEach((c) => {
			if (c instanceof HTMLElement) {
				this.addDelay(c);
				c.style.setProperty("--delay", Utils.getRandom() + "s");
				c.setAttribute("delay", "")
			}
		})
	}
}
const Router = new RouterC();

export default Router;
