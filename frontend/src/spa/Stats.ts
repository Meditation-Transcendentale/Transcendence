import { getRequest } from "./requests";
import { raiseStatus } from "./utils";

type statsHtmlReference = {
	classic: HTMLInputElement,
	br: HTMLInputElement,
	io: HTMLInputElement,
	username: HTMLDivElement,
	container: HTMLDivElement;
	stats: HTMLDivElement,
	history: HTMLDivElement
}

class Stats {
	private div: HTMLDivElement;
	private ref: statsHtmlReference;

	constructor(div: HTMLDivElement) {
		this.div = div;

		this.ref = {
			classic: this.div.querySelector("#classic-menu") as HTMLInputElement,
			br: this.div.querySelector("#br-menu") as HTMLInputElement,
			io: this.div.querySelector("#io-menu") as HTMLInputElement,
			username: this.div.querySelector("#stats-username") as HTMLDivElement,
			container: this.div.querySelector("#stats-container") as HTMLDivElement,
			stats: this.div.querySelector("#stats-table") as HTMLDivElement,
			history: this.div.querySelector("#stats-history") as HTMLDivElement
		}

		this.ref.classic.addEventListener("click", () => {
			window.history.pushState("", "", `/home/stats?u=${this.ref.username.innerText}&m=classic`)
			getRequest(`/stats/player/${this.ref.username.innerText}/classic`)
				.then((json) => { this.statsResolve(json) })
				.catch((resp) => { this.statsReject(resp) });
		});

		this.ref.br.addEventListener("click", () => {
			window.history.pushState("", "", `/home/stats?u=${this.ref.username.innerText}&m=br`)
			getRequest(`/stats/player/${this.ref.username.innerText}/br`)
				.then((json) => { this.statsResolve(json) })
				.catch((resp) => { this.statsReject(resp) });
		});

		this.ref.br.addEventListener("click", () => {
			window.history.pushState("", "", `/home/stats?u=${this.ref.username.innerText}&m=br`)
			getRequest(`/stats/player/${this.ref.username.innerText}/br`)
				.then((json) => { this.statsResolve(json) })
				.catch((resp) => { this.statsReject(resp) });
		});
	}

	public load(params: URLSearchParams) {
		if (!this.checkParams(params)) { return; }

		this.ref.username.innerText = params.get("u") as string;
		getRequest(`/stats/player/${this.ref.username.innerText}/${params.get("m")}`)
			.then((json) => {
				this.statsResolve(json);
				document.querySelector("#home-container")?.appendChild(this.div);
			})
			.catch((resp) => { this.statsReject(resp) });
	}

	public async unload() {
		this.div.remove();
	}

	private checkParams(params: URLSearchParams) {
		const u = params.get("u");
		const m = params.get("m");
		if (!u || (m !== "classic" && m !== "br" && m !== "io")) {
			raiseStatus(false, "error in stats url");
			return false;
		}
		return true;
	}

	private statsResolve(json: any) {
		const obj = json.playerStats;
		this.ref.stats.remove();
		this.ref.history.remove();

		let text = `<table>`;
		for (let x in obj.stats) {
			text += `<tr><td>${x.replace(/_/g, " ")}`;
			text += `</td><td>${obj.stats[x]}</td></tr>`;
		}
		text += "</table>";
		this.ref.stats.innerHTML = text;
		text = `<ul id='stats-history-list'>`
		for (let x in obj.history) {
			text += `<li class="history" is_winner="${obj.history[x].is_winner}">`;
			for (let y in obj.history[x]) {
				if (y == "is_winner") { continue };
				text += " " + y.replace(/_/g, " ") + " " + obj.history[x][y];
			}
			text += "</li>";

		}
		this.ref.history.innerHTML = text;
		this.ref.container.appendChild(this.ref.stats);
		this.ref.container.appendChild(this.ref.history);
	}

	private statsReject(resp: Response) {
		resp.json()
			.then((json) => { raiseStatus(false, json.message) });
	}
}

export default Stats;
