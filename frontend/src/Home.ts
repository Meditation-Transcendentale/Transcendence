class Home {
	private loaded: boolean;

	constructor() {
		console.log("Home successfully loaded");
		this.loaded = false;
	}

	public init() {
		if (this.loaded) {
			return;
		}

		document.getElementById("quit")?.addEventListener("click", (e) => {
			this.logoutRequest()
				.then((response) => { this.logoutResponse(response) })
				.catch((error) => console.log(error));
		});

		document.querySelectorAll("a").forEach((link) => {
			link.addEventListener("click", (e) => {
				e.preventDefault();
				console.log(link.hash);
				document.getElementById("main-container")?.dispatchEvent(new CustomEvent("nav", { detail: { path: link.hash.substring(1) } }));
			})
		})

		this.loaded = true;
	}

	public reset() {
		document.getElementById("home-container").innerHTML = "";
	}

	private logoutResponse(response: string) {
		document.getElementById("status")?.setAttribute("ok", response.ok);
		document.getElementById('status').value = response.message;

		if (response.ok == false) {
			throw response;
		}

		document.getElementById("main-container")?.dispatchEvent(new CustomEvent("nav", { detail: { path: "/auth" } }))


	}

	private async logoutRequest() {
		const response = await fetch("https://localhost:3000/auth/logout", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
			},
			credentials: 'include',
		});

		const data = await response.json();

		const final = {
			message: data.message,
			status: response.status,
			ok: response.ok
		};
		return final;
	}
}

export default Home;
