import { meRequest } from "./checkMe";



class Router {
	private mainContainer: HTMLElement;
	private routes: {};
	private initRoute: string;

	constructor() {
		this.initRoute = null;

		this.routes = {
			"/": {
				html: { path: "/auth", data: null },
				script: { path: "./auth", data: null }
			},
			"/auth": {
				html: { path: "/auth", data: null },
				script: { path: "./Auth", data: null }
			},
			"/register": {
				html: { path: "/register", data: null },
				script: { path: "./Register", data: null }
			},
			"/home": {
				html: { path: "/home", data: null },
				script: { path: "./Home", data: null }
			},
			"/home/info": {
				html: { path: "/info", data: null },
				script: { path: "./Info", data: null }
			},
			"/home/stats": {
				html: { path: "/stats", data: null },
				script: { path: "./Stats", data: null }
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
			this.nav(ev.state.path, false);
		});

	}


	public async nav(path: string, history = true) {
		if (this.initRoute == null) { this.initRoute = path }

		console.log("%c Navigating to %s", "color: white; background-color: blue", path);

		switch (path) {
			case "/": {
				this.loadInMain("/home", history);
				break;
			}
			case "/auth": {
				this.loadInMain("/auth", history);
				break;
			}
			case "/register": {
				this.loadInMain("/register", history);
				break;
			}

			case "/home": {
				this.loadInMain("/home", history)
				break;
			}

			case "/home/info": {
				this.loadInHome("/home/info", history);
				break;
			}
			case "/home/stats": {
				this.loadInHome("/home/stats", history);
				break
			}


			default: {
				alert("404")
				path = "/home";
				this.loadInMain("/home", history);
				break;
			}
		}
	}

	private async loadInMain(route: string, history = true, child = false) {
		route = await meRequest("no-cache")
			.then(() => {
				return (route == "/auth" || route == "/register") ? "/home" : route;
			})
			.catch(() => { return (route != '/register') ? "/auth" : route })
		console.log("%c Loading: %s", "color: white; background-color: green", route)
		this.routes[route].script.data = await this.getScript(this.routes[route].script);
		this.routes[route].html.data = await this.getHtml(this.routes[route].html);

		try {
			document.getElementById("main-container").removeChild(document.getElementById("main-container")?.firstChild);
		} catch (err) { }

		document.getElementById("main-container").appendChild(this.routes[route].html.data);
		this.routes[route].script.data.init();
		this.routes[route].script.data.reset();
		if (child && route == "/auth") { throw ("aaaaaaaaa") };
		if (!child && history) { window.history.pushState({ path: route }, "", route) };
	}

	private async loadInHome(route: string, history = true) {
		if (!document.getElementById("home")) {
			this.loadInMain("/home", false, true)
				.then(() => { this.loadInHome(route) })
				.catch(() => console.log("%c Not logged in redirected to /auth", "color: white; background-color: red"));
			return;
		}
		console.log("%c Loading: %s", "color: white; background-color: green", route)

		this.routes[route].script.data = await this.getScript(this.routes[route].script);
		this.routes[route].html.data = await this.getHtml(this.routes[route].html);

		try {
			document.getElementById("home-container").removeChild(document.getElementById("home-container")?.firstChild);
		} catch (err) { }
		document.getElementById("home-container").appendChild(this.routes[route].html.data);
		this.routes[route].script.data.init();
		this.routes[route].script.data.reset();
		if (history) { window.history.pushState({ path: route }, "", route) };

	}


	private async getHtml(html: { path: string, data: string }) {
		return new Promise((resolve, reject) => {
			if (html.data != null) {
				console.log("%c %s already fetched", "color: black; background-color: pink", html.path);
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
}

export default Router;

