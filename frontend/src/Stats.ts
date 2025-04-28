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
			this.statsRequest(playerName, "classic")
				.then((response) => {
					this.parseResponse(response);
				})
				.catch((error) => { console.log(error) });
			//console.log("Stats Handler");
		});
		document.getElementById("br-menu")?.addEventListener("click", (e) => {
			document.getElementById("stats-container").innerHTML = "";
			// this.statsRequest(playerName, "br")
			// 	.then((response) => {
			// 		this.parseResponse(response);
			// 	})
			// 	.catch((error) => { console.log(error) });
			console.log("Stats Handler");
		});
		document.getElementById("io-menu")?.addEventListener("click", (e) => {
			document.getElementById("stats-container").innerHTML = "";
			// this.statsRequest(playerName, "io")
			// 	.then((response) => {
			// 		this.parseResponse(response);
			// 	})
			// 	.catch((error) => { console.log(error) });
			console.log("Stats Handler");
		});


		this.loaded = true;
	}

	public async reset(playerName?: string) {
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
		console.log(response);
		const obj = JSON.parse(response);
		console.log(obj);

		//let text = "<table id='stats-table'>"
		//for (let x in obj) {
		//	text += "<tr><td>" + x.name + "</td><td>" + x.value + "</td></tr>";
		//}
		//document.getElementById("stats-container").innerHTML = text;
	}
}

export default Stats;
