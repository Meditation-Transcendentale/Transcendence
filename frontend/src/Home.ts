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
			this.logoutRequest()
				.then((json) => { this.logoutResponse(json, true) })
				.catch((json) => { this.logoutResponse(json, false) });
		});

		document.querySelectorAll("a").forEach((link) => {
			link.addEventListener("click", (e) => {
				e.preventDefault();
				document.getElementById("main-container")?.dispatchEvent(new CustomEvent("nav", { detail: { path: link.hash.substring(1) } }));
			})
		})

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
