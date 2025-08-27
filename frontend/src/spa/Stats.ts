import { Matrix } from "../babyImport";
import { App3D } from "../3d/App";
import { getRequest } from "./requests";
import { createDivception, raiseStatus } from "./utils";

type statsHtmlReference = {
	switch: { html: HTMLDivElement, id: number },
	swBR: HTMLInputElement,
	swPong: HTMLInputElement,
	container: { html: HTMLDivElement, id: number }
	username: HTMLDivElement,
	stats: HTMLDivElement,
	history: HTMLDivElement,
	classicHistory: HTMLTableElement,
	brHistory: HTMLTableElement
}

/*
 *	scored, conceded, creationTime -> children of match
 *	match attribute winner[true | false] set color: [green | red]
 * */
type classicplayerMatch = {
	div: HTMLDivElement,
	scored: HTMLDivElement,
	conceded: HTMLDivElement,
	creationTime: HTMLDivElement
}

/*
 *	All children of playerStats
 *	All null if played == 0
 * */

const classicPlayerStatsName = ["Game Played", "Wined", "Loosed", "Win Rate", "Best Win Streak", "Goals Scored", "Goals Conceded", "Averaged Goals Scored", "Average Goals Conceded"];

type classicPlayerStats = {
	div: HTMLDivElement,
	played: HTMLDivElement,
	wins: HTMLDivElement,
	losses: HTMLDivElement,
	winRate: HTMLDivElement,
	bestStreak: HTMLDivElement,
	scored: HTMLDivElement,
	conceded: HTMLDivElement,
	avgScored: HTMLDivElement,
	avgConceded: HTMLDivElement,
}

const brPlayerStatsName = ["Game Played", 'Wined', "Kills", "Win Rate", "Best Win Streak", "Beast Placement", "Best Kills", "Average Placement", "Average Kills"];

type brPlayerStats = {
	div: HTMLDivElement,
	played: HTMLDivElement,
	wins: HTMLDivElement,
	kills: HTMLDivElement,
	winRate: HTMLDivElement,
	bestStreak: HTMLDivElement,
	bestPlacement: HTMLDivElement,
	bestKills: HTMLDivElement,
	avgPlacement: HTMLDivElement,
	avgKills: HTMLDivElement
}

class Stats {
	private div: HTMLDivElement;
	private ref: statsHtmlReference;
	private css: HTMLLinkElement;

	private classicPlayerStats: classicPlayerStats | null;
	private brPlayerStats: brPlayerStats | null;
	private currentHistory: HTMLDivElement | null;

	private mode: number /* 0 == NONE | 1 == PONG | 2 == BR*/


	constructor(div: HTMLDivElement) {
		this.div = div;
		this.css = div.querySelector("link") as HTMLLinkElement;
		this.classicPlayerStats = null;
		this.brPlayerStats = null;
		this.currentHistory = null;
		this.mode = 0;





		this.ref = {
			switch: { html: div.querySelector("#stats-switch") as HTMLDivElement, id: -1 },
			swBR: div.querySelector("#br-switch") as HTMLInputElement,
			swPong: div.querySelector("#pong-switch") as HTMLInputElement,
			container: { html: div.querySelector("#stats-container") as HTMLDivElement, id: -1 },
			username: this.div.querySelector("#stats-username") as HTMLDivElement,
			stats: this.div.querySelector("#stats-table-window") as HTMLDivElement,
			history: this.div.querySelector("#stats-history-window") as HTMLDivElement,
			classicHistory: this.div.querySelector("#classic-history") as HTMLTableElement,
			brHistory: this.div.querySelector("#br-history") as HTMLTableElement

		}

		this.ref.classicHistory.remove();
		this.ref.brHistory.remove();

		this.initPlayerStats();

		this.ref.switch.id = App3D.addCSS3dObject({
			html: this.ref.switch.html,
			width: 1,
			height: 1,
			world: Matrix.RotationY(Math.PI * 1.2).multiply(Matrix.Translation(-17, 3, 25)),
			enable: false
		})

		this.ref.container.id = App3D.addCSS3dObject({
			html: this.ref.container.html,
			width: 2.,
			height: 2.,
			world: Matrix.RotationY(Math.PI * 0.95).multiply(Matrix.Translation(-21, 2, 23)),
			enable: false

		})

		this.ref.swPong.addEventListener("click", () => {
			if (this.mode != 1) {
				this.ref.brHistory.remove();
				this.brPlayerStats!.div.remove();
				this.ref.history.appendChild(this.ref.classicHistory);
				this.ref.stats.appendChild(this.classicPlayerStats!.div);
				this.mode = 1;
			}
			this.ref.swPong.toggleAttribute("down", false);
			this.ref.swBR.toggleAttribute("down", true);

			getRequest(`stats/player/${this.ref.username.innerText}/classic`)
				.then((json: any) => {
					//console.log(json.playerStats);
					this.classicResolve(json.playerStats);
				})
		})

		this.ref.swBR.addEventListener("click", () => {
			if (this.mode != 2) {
				this.ref.classicHistory.remove();
				this.classicPlayerStats!.div.remove();
				this.ref.history.appendChild(this.ref.brHistory);
				this.ref.stats.appendChild(this.brPlayerStats!.div);
				this.mode = 2;
			}
			this.ref.swPong.toggleAttribute("down", true);
			this.ref.swBR.toggleAttribute("down", false);

			getRequest(`stats/player/${this.ref.username.innerText}/br`)
				.then((json: any) => {
					//console.log(json.playerStats);
					this.brResolve(json.playerStats);
				})
				.catch((resp) => { this.statsReject(resp) });
		})
	}

	private initPlayerStats() {
		this.initClassicPlayerStats();
		this.initBRPlayerStats();
	}

	private initBRPlayerStats() {
		const div = document.createElement("div");
		div.className = "window-content";
		for (let i = 0; i < brPlayerStatsName.length; i++) {
			div.appendChild(
				createDivception({
					class: "player-stat",
					children: [brPlayerStatsName[i], "null"]
				})
			)
		}
		this.brPlayerStats = {
			div: div,
			played: div.children[0] as HTMLDivElement,
			wins: div.children[1] as HTMLDivElement,
			kills: div.children[2] as HTMLDivElement,
			winRate: div.children[3] as HTMLDivElement,
			bestStreak: div.children[4] as HTMLDivElement,
			bestPlacement: div.children[5] as HTMLDivElement,
			bestKills: div.children[6] as HTMLDivElement,
			avgPlacement: div.children[7] as HTMLDivElement,
			avgKills: div.children[8] as HTMLDivElement,
		}

		//this.ref.stats.appendChild(this.brPlayerStats.div);

	}

	private initClassicPlayerStats() {
		const div = document.createElement("div");
		div.className = "window-content";
		for (let i = 0; i < classicPlayerStatsName.length; i++) {
			div.appendChild(
				createDivception({
					class: "player-stat",
					children: [classicPlayerStatsName[i], "null"]
				})
			)
		}
		this.classicPlayerStats = {
			div: div,
			played: div.children[0] as HTMLDivElement,
			wins: div.children[1] as HTMLDivElement,
			losses: div.children[2] as HTMLDivElement,
			winRate: div.children[3] as HTMLDivElement,
			bestStreak: div.children[4] as HTMLDivElement,
			scored: div.children[5] as HTMLDivElement,
			conceded: div.children[6] as HTMLDivElement,
			avgScored: div.children[7] as HTMLDivElement,
			avgConceded: div.children[8] as HTMLDivElement,
		}

		//this.ref.stats.appendChild(this.classicPlayerStats.div);
	}

	public load(params: URLSearchParams) {
		if (!this.checkParams(params)) { return; }
		document.head.appendChild(this.css);
		App3D.setVue('play');
		App3D.setCSS3dObjectEnable(this.ref.switch.id, true);
		App3D.setCSS3dObjectEnable(this.ref.container.id, true);

		this.ref.username.innerText = params.get("u") as string;

		this.ref.brHistory.remove();
		this.brPlayerStats!.div.remove();
		this.ref.swPong.removeAttribute("down");

		this.ref.history.appendChild(this.ref.classicHistory);
		this.ref.stats.appendChild(this.classicPlayerStats!.div);
		this.mode = 1;
		this.ref.swBR.toggleAttribute("down", true);
		getRequest(`stats/player/${this.ref.username.innerText}/classic`)
			.then((json: any) => {
				//console.log(json)
				this.classicResolve(json.playerStats);
				//		document.querySelector("#home-container")?.appendChild(this.div);
			})
			.catch((resp) => { this.statsReject(resp) });
	}

	public async unload() {
		this.css.remove();
		App3D.setCSS3dObjectEnable(this.ref.switch.id, false);
		App3D.setCSS3dObjectEnable(this.ref.container.id, false);
	}

	private checkParams(params: URLSearchParams) {
		const u = params.get("u");
		if (!u) {
			//raiseStatus(false, "error in stats url");
			return false;
		}
		return true;
	}

	private classicResolve(json: any) {
		if (json.stats.game_played == 0) {
			for (let i = 0; i < this.classicPlayerStats!.div.children.length; i++) {
				(this.classicPlayerStats!.div.children[i].children[1] as HTMLDivElement).innerText = "null";
			}
			const body = this.ref.classicHistory.querySelector("tbody") as HTMLElement;
			body.innerHTML = "";
			return;
		}

		(this.classicPlayerStats?.played.children[1] as HTMLDivElement).innerText = json.stats.game_played;
		(this.classicPlayerStats?.wins.children[1] as HTMLDivElement).innerText = json.stats.wins;
		(this.classicPlayerStats?.losses.children[1] as HTMLDivElement).innerText = json.stats.losses;
		(this.classicPlayerStats?.winRate.children[1] as HTMLDivElement).innerText = json.stats.win_rate;
		(this.classicPlayerStats?.bestStreak.children[1] as HTMLDivElement).innerText = json.stats.best_win_streak;
		(this.classicPlayerStats?.scored.children[1] as HTMLDivElement).innerText = json.stats.goals_scored;
		(this.classicPlayerStats?.conceded.children[1] as HTMLDivElement).innerText = json.stats.goals_conceded;
		(this.classicPlayerStats?.avgScored.children[1] as HTMLDivElement).innerText = json.stats.avg_goals_scored;
		(this.classicPlayerStats?.avgConceded.children[1] as HTMLDivElement).innerText = json.stats.avg_goals_conceded;

		this.currentHistory?.remove();
		this.currentHistory = document.createElement("div");
		this.currentHistory.className = "window-content";

		const body = this.ref.classicHistory.querySelector("tbody") as HTMLElement;
		body.innerHTML = "";

		for (let m in json.history) {
			let match = json.history[m] as any;
			const tr = document.createElement("tr");
			const scored = document.createElement("td");
			const conceded = document.createElement("td");
			const time = document.createElement("td");

			scored.innerText = `${match.goals_scored}`;
			conceded.innerText = `${match.goals_conceded}`;
			time.innerText = `${match.created_at}`;
			tr.appendChild(scored);
			tr.appendChild(conceded);
			tr.appendChild(time);
			tr.setAttribute(match.is_winner == 1 ? "win" : "lose", "");
			body.appendChild(tr);
		}
	}

	private brResolve(json: any) {
		if (json.stats.game_played == 0) {
			for (let i = 0; i < this.brPlayerStats!.div.children.length; i++) {
				(this.brPlayerStats!.div.children[i].children[1] as HTMLDivElement).innerText = "null";
			}
			const body = this.ref.brHistory.querySelector("tbody") as HTMLElement;
			body.innerHTML = "";
			return;
		}

		(this.brPlayerStats?.played.children[1] as HTMLDivElement).innerText = json.stats.game_played;
		(this.brPlayerStats?.wins.children[1] as HTMLDivElement).innerText = json.stats.wins;
		(this.brPlayerStats?.winRate.children[1] as HTMLDivElement).innerText = json.stats.win_rate;
		(this.brPlayerStats?.bestStreak.children[1] as HTMLDivElement).innerText = json.stats.best_win_streak;
		(this.brPlayerStats?.bestPlacement.children[1] as HTMLDivElement).innerText = json.stats.best_placement;
		(this.brPlayerStats?.bestKills.children[1] as HTMLDivElement).innerText = json.stats.best_kills;
		(this.brPlayerStats?.kills.children[1] as HTMLDivElement).innerText = json.stats.kills;
		(this.brPlayerStats?.avgPlacement.children[1] as HTMLDivElement).innerText = json.stats.avg_placement;
		(this.brPlayerStats?.avgKills.children[1] as HTMLDivElement).innerText = json.stats.avg_kills;
		console.log(json.stats.best_win_streak)



		const body = this.ref.brHistory.querySelector("tbody") as HTMLElement;
		body.innerHTML = "";

		for (let m in json.history) {
			let match = json.history[m] as any;
			const tr = document.createElement("tr");
			const placement = document.createElement("td");
			const kills = document.createElement("td");
			const time = document.createElement("td");

			placement.innerText = `${match.placement}`;
			kills.innerText = `${match.kills}`;
			time.innerText = `${match.created_at}`;
			tr.appendChild(placement);
			tr.appendChild(kills);
			tr.appendChild(time);
			tr.setAttribute(match.is_winner == 1 ? "win" : "lose", "");
			body.appendChild(tr);
		}

	}

	private statsReject(resp: Response) {
		resp.json()
			.then((json) => { console.log(json.message) });
	}
}

export default Stats;
