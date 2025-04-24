


class Router {
	private mainContainer: HTMLElement;

	constructor() {
		this.mainContainer = document.getElementById("main-container") as HTMLElement;
		this.mainContainer.addEventListener("nav", (ev) => {
			this.nav(ev.detail.path);
		})

		document.querySelectorAll("a").forEach((link) => {
			link.addEventListener("click", (ev) => {
				ev.preventDefault();
				const url = ev.target.getAttribute("href");
				console.log(url);
				this.nav(url);
			})
		})

		window.addEventListener("popstate", (ev) => {
			console.log(ev.state.route);
		});

	}

	public async nav(path: string) {
		const url = "http://localhost:8080/html" + path + ".html";
		console.log(url);
		const response = await fetch(url, { redirect: "error" });
		const page = await response.text();

		this.mainContainer.innerHTML = page;

		const oldscript = document.getElementById("script") as HTMLElement;
		if (oldscript) {
			const script = document.createElement("script");
			script.src = oldscript.src;
			console.log(script.src);
			script.onload = () => { console.log("loaded") };

			script.setAttribute("defer", "defer");
			this.mainContainer.removeChild(oldscript);
			this.mainContainer.appendChild(script);
		}

		window.history.pushState("", "", path)

	}

}

export default Router;

