import { meRequest } from "./checkMe";



class Router {
	private mainContainer: HTMLElement;
	private routes: {};

	constructor() {
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
			}
		};

		this.mainContainer = document.getElementById("main-container") as HTMLElement;
		this.mainContainer.addEventListener("nav", (ev) => {
			this.nav(ev.detail.path);
		})

		window.addEventListener("popstate", (ev) => {
			console.log(ev.state.route);
		});
		console.log(this.routes);

	}


	public async nav(path: string) {
		let page = null;
		let script = null;

		console.log("nav request: ", path);

		switch (path) {
			case "/": {
				this.loadInMain("/auth");
				break;
			}
			case "/auth": {

				this.loadInMain("/auth");
				break;
			}
			case "/register": {

				this.loadInMain("/register");
				break;
			}

			case "/home": {
				console.log("there");
				this.loadInMain("/home")
				break;
			}

			case "/home/info": {
				console.log("hear");
				this.loadInHome("/home/info");
				break;
			}


			default: {
				alert("404")
				path = "/home";
				this.loadInMain("/home");
				break;
			}
		}


		window.history.pushState("", "", path)

	}


	private async loadInMain(route: string) {
		console.log("load in main :", route);
		console.log(this.routes[route]);
		route = await this.isLogedIn()
			.then(() => { return (route == "/auth" || route == "/register") ? "/home" : route; })
			.catch(() => { return (route != '/register') ? "/auth" : route })

		this.routes[route].script.data = await this.getScript(this.routes[route].script);
		this.routes[route].html.data = await this.getHtml(this.routes[route].html);

		document.getElementById("main-container").innerHTML = "";
		document.getElementById("main-container").appendChild(this.routes[route].html.data);
		this.routes[route].script.data.init();
		this.routes[route].script.data.reset();
		if (route == "/auth") { throw ("aaaaaaaaa") };
	}

	private async loadInHome(route: string) {
		console.log("load in home :", route);
		if (!document.getElementById("home")) {
			this.loadInMain("/home")
				.catch(() => console.log("Not logged In"))
				.then(() => this.loadInHome(route))
				.catch(() => console.log("Not logged In"));

			return;
		}

		this.routes[route].script.data = await this.getScript(this.routes[route].script);
		this.routes[route].html.data = await this.getHtml(this.routes[route].html);

		document.getElementById("home-container").appendChild(this.routes[route].html.data);
		this.routes[route].script.data.init();
		this.routes[route].script.data.reset();

	}


	private async isLogedIn() {
		return new Promise((resolve, reject) => {
			console.log("in is logIn");
			meRequest("no-cache")
				.then((response) => {
					if (response.ok) { resolve(true) }
					reject(false);
				})
				.catch(() => reject(false));
		})
	}

	private async getHtml(html: { path: string, data: string }) {
		return new Promise((resolve, reject) => {
			if (html.data != null) {
				return resolve(html.data);
			}

			const url = "http://localhost:8080/html" + html.path + ".html";
			console.log("Getting ", url);
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
			console.log("data Empty");
			return script.data;
		}
		const im = await import(script.path);
		const obj = new im.default();
		return obj;
	}
}

export default Router;

