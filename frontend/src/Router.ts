


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
				this.loadInMain("/home");
				break;
			}

			case "/home/info": {
				console.log("hear");
				this.loadInHome("/home/info");
				break;
			}

			default: {
				page = null;
				break;
			}
		}


		window.history.pushState("", "", path)

	}

	private async loadInMain(route: string) {
		const detail = this.routes[route];

		this.mainContainer.innerHTML = "";
		if (detail.html.data == null) {
			const url = "http://localhost:8080/html" + detail.html.path + ".html";
			console.log("Getting ", url);
			fetch(url, { redirect: "error" })
				.then((response) => {
					response.text().then((text) => {
						const div = document.createElement("div");
						div.innerHTML = text;
						detail.html.data = div;
						import(detail.script.path)
							.then((script) => {
								detail.script.data = new script.default();
								this.mainContainer.appendChild(detail.html.data);
								detail.script.data.init();
							})
					})
				})
		} else {
			console.log("eee");
			console.log(detail);
			this.mainContainer.appendChild(detail.html.data);
			detail.script.data.init();
		}
	}

	private async loadInHome(route: string) {
		console.log("aaaaa");
		if (!document.getElementById("home")) {
			console.log("eee");
			this.loadInMain("/home").then(() => {
				this.loadInHome(route);
			});
			return;
		}

		console.log("ee");
		const detail = this.routes[route];

		document.getElementById("home-container").innerHTML = "";
		if (detail.html.data == null) {
			const url = "http://localhost:8080/html" + detail.html.path + ".html";
			console.log("Getting ", url);
			fetch(url, { redirect: "error" })
				.then((response) => {
					response.text().then((text) => {
						const div = document.createElement("div");
						div.innerHTML = text;
						detail.html.data = div;
						import(detail.script.path)
							.then((script) => {
								detail.script.data = new script.default();
								document.getElementById("home-container").appendChild(detail.html.data);
								detail.script.data.init();
							})
					})
				})
		} else {
			console.log("eee");
			console.log(detail);
			document.getElementById("home-container").appendChild(detail.html.data);
			detail.script.data.init();
		}
	}

	private async getHtml(route: string) {
		const detail = this.routes[route].html;

		if (detail.data != null) {
			return detail.data;
		}

		const url = "http://localhost:8080/html" + detail.path + ".html";
		console.log("Getting ", url);
		const response = await fetch(url, { redirect: "error" });
		const page = await response.text();

		return page;
	}

	private async getScript(route: string) {
		console.log("getting route: ", route);
		const detail = this.routes[route].script;

		if (detail.data != null) {
			return detail.data;
		}
		console.log("Importing ", detail.path);
		const script = await import(detail.path);

		detail.data = new script.default();
		return detail.data;
	}
}

export default Router;

