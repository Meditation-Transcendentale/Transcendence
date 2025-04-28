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


		if (!playerName) {
			meRequest()
				.then((json) => {
					playerName = json.userInfo.username;
				})
				.catch(() => {
					meReject();
					return;
				})
		}
		document.getElementById("stats-username").innerHTML = playerName;
		document.getElementById("classic-menu")?.addEventListener("click", (e) => {
			document.getElementById("stats-container").innerHTML = "";
			this.statsRequest(
				document.getElementById("stats-username")?.innerHTML,
				"classic")
				.then((response) => {
					this.parseResponse(response);
				})
				.catch((error) => { console.log(error) });
			//console.log("Stats Handler");
		});
		document.getElementById("br-menu")?.addEventListener("click", (e) => {
			document.getElementById("stats-container").innerHTML = "";
			this.statsRequest(
				document.getElementById("stats-username")?.innerHTML,
				"br")
				.then((response) => {
					this.parseResponse(response);
				})
				.catch((error) => { console.log(error) });
		});
		document.getElementById("io-menu")?.addEventListener("click", (e) => {
			document.getElementById("stats-container").innerHTML = "";
			this.statsRequest(
				document.getElementById("stats-username")?.innerHTML,
				"io")
				.then((response) => {
					this.parseResponse(response);
				})
				.catch((error) => { console.log(error) });

		});


		this.loaded = true;
	}

	public async reset(playerName?: string) {
		if (playerName == null || playerName == undefined) {
			meRequest()
				.then((json) => {
					console.log("ee");
					playerName = json.userInfo.username;
					document.getElementById("stats-username").innerHTML = playerName;
				})
				.catch(() => {
					meReject();
					return;
				})
		} else {
			document.getElementById("stats-username").innerHTML = playerName;
		}
	}

	private async statsRequest(username: string, mode: string) {
		const response = await fetch("https://localhost:3000/stats/player/" + username + "/" + mode, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include',
		});

		const data = await response.json();

		const final = {
			message: data,
			status: response.status,
			ok: response.ok
		};
		return final;
	}

	private parseResponse(response: any) {
		const obj = response.message.playerStats;

		let text = "<table id='stats-table'>";
		for (let x in obj.stats) {
			text += "<tr><td>" + this.cleanString(x) + "</td><td>" + obj.stats[x] + "</td></tr>";
		}
		text += "</table>";
		text += "<ul id='stats-history'>"
		for (let x in obj.history) {
			text += "<li>";
			for (let y in obj.history[x]) {
				text += " " + this.cleanString(y) + " " + x[y];
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
