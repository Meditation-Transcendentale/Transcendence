import { meReject, meRequest } from "./checkMe";

class Stats {
	private loaded: boolean;
	constructor() {
		this.loaded = false;
	}

	public async init(playerName?: string) {
		if (this.loaded) {
			return;
		}


		document.getElementById("classic-menu")?.addEventListener("click", (e) => {
			document.getElementById("stats-container").innerHTML = "";
			this.statsRequest(
				document.getElementById("stats-username")?.innerHTML,
				"classic")
				.then((response) => {
					this.parseResponse(response);
				})
				.catch((error) => { if (error.status == 401) { meReject() } });
		});

		document.getElementById("br-menu")?.addEventListener("click", (e) => {
			document.getElementById("stats-container").innerHTML = "";
			this.statsRequest(
				document.getElementById("stats-username")?.innerHTML,
				"br")
				.then((response) => {
					this.parseResponse(response);
				})
				.catch((error) => { if (error.status == 401) { meReject() } });
		});

		document.getElementById("io-menu")?.addEventListener("click", (e) => {
			document.getElementById("stats-container").innerHTML = "";
			this.statsRequest(
				document.getElementById("stats-username")?.innerHTML,
				"io")
				.then((response) => {
					this.parseResponse(response);
				})
				.catch((error) => { if (error.status == 401) { meReject() } });

		});


		this.loaded = true;
	}

	public async reset(params: URLSearchParams) {
		document.getElementById("stats-username").innerHTML = params.get("u");
		document.getElementById("stats-container").innerHTML = "";
		if (params.get("m")) {
			this.statsRequest(
				params.get("u"),
				params.get("m"),
				false)
				.then((response) => {
					this.parseResponse(response);
				})
				.catch((error) => { });
		}
	}

	private async statsRequest(username: string, mode: string, history = true) {
		if (history) {
			window.history.pushState("", "", "/home/stats?u=" + username + "&m=" + mode)
		};
		const response = await fetch("https://localhost:3000/stats/player/" + username + "/" + mode, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include',
		});
		if (!response.ok) {
			return Promise.reject(response);
		}

		return response.json();
	}

	private parseResponse(response: any) {
		const obj = response.playerStats;

		let text = "<table id='stats-table'>";
		for (let x in obj.stats) {
			text += "<tr><td>" + this.cleanString(x) + "</td><td>" + obj.stats[x] + "</td></tr>";
		}
		text += "</table>";
		text += "<ul id='stats-history'>"
		for (let x in obj.history) {
			text += `<li class="history" is_winner="${obj.history[x].is_winner}">`;
			for (let y in obj.history[x]) {
				if (y == "is_winner") { continue };
				text += " " + this.cleanString(y) + " " + obj.history[x][y];
			}
			text += "</li>";

		}
		document.getElementById("stats-container").innerHTML = text;
	}

	private cleanString(str: string) {
		return str.replace(/_/g, " ");
	}
}

export default Stats;
