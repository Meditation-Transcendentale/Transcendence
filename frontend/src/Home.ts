import { meReject, meRequest } from "./checkMe";
import Router from "./Router";

class Home {
	private loaded: boolean;

	constructor() {
		this.loaded = false;
	}

	public init() {
		if (this.loaded) {
			return;
		}

		document.getElementById("quit")?.addEventListener("click", (e) => {
			e.preventDefault();
			this.logoutRequest()
				.then((json) => { this.logoutResponse(json, true) })
				.catch((json) => { this.logoutResponse(json, false) });
		});

		document.getElementById("info-home")?.addEventListener("click", (e) => {
			e.preventDefault();
			// document.getElementById("main-container")?.dispatchEvent(new CustomEvent("nav", { detail: { path: "/home/info" } }));
			Router.nav("/home/info");
		});

		document.getElementById("play-home")?.addEventListener("click", (e) => {
			e.preventDefault();
			// document.getElementById("main-container")?.dispatchEvent(new CustomEvent("nav", { detail: { path: "/home/info" } }));
			Router.nav("/home/play");
		});


		document.getElementById("stats-home")?.addEventListener("click", (e) => {
			e.preventDefault();
			meRequest()
				.then((json) => {
					Router.nav("/home/stats?u=" + json.userInfo.username);
					// document.getElementById("main-container")?.dispatchEvent(new CustomEvent("nav", { detail: { path: "/home/stats?u=" + json.userInfo.username } }))
				})
				.catch((error) => { if (error.status == 401) { meReject() } })
		});

		document.getElementById("friendlist-home")?.addEventListener("click", (e) => {
			e.preventDefault();
			// document.getElementById("main-container")?.dispatchEvent(new CustomEvent("nav", { detail: { path: "/home/info" } }));
			Router.nav("/home/friendlist");
		});

		this.loaded = true;
	}

	public reset() {
		document.getElementById("home-container").innerHTML = "";
	}

	private logoutResponse(json: JSON, ok: boolean) {
		document.getElementById("status")?.dispatchEvent(
			new CustomEvent("status", { detail: { ok: ok, json: json.message } })
		)


		setTimeout(() => { window.location.reload() }, 300);
		// document.getElementById("main-container")?.dispatchEvent(new CustomEvent("nav", { detail: { path: "/auth" } }))


	}

	private async logoutRequest() {
		const response = await fetch("https://localhost:3000/auth/logout", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
			},
			credentials: 'include',
		})
		if (!response.ok) {
			return Promise.reject(response.json());
		}

		return response.json();
	}

}

export default Home;
