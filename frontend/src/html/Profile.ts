import { postRequest } from "../networking/request";
import { User } from "../User";
import { htmlManager } from "./HtmlManager";
import { Popup, PopupType } from "./Popup";
import { Stats } from "./Stats";

export class Profile {


	private div!: HTMLDivElement;
	private statsDiv!: HTMLDivElement;
	private classicStatsDiv!: HTMLDivElement;
	private brStatsDiv!: HTMLDivElement;
	private matchHistoryDiv!: HTMLDivElement;
	private profileImg!: HTMLImageElement;
	private usernameElem!: HTMLSpanElement;
	private statusElem!: HTMLSpanElement;

	private profilePopup: Popup;

	private classicTable!: HTMLTableElement;
	private brTable!: HTMLTableElement;

	private classicTdElements!: { [key: string]: HTMLTableCellElement };
	private brTdElements: { [key: string]: HTMLTableCellElement };

	private matchHistoryRow!: { [key: number]: HTMLTableRowElement };
	private matchHistoryTdElements!: { [key: number]: { [id: number]: HTMLTableCellElement } };
	private matchHistoryBtns!: { [key: number]: HTMLButtonElement };
	private toggleMatchHistory!: { [key: number]: boolean };

	private stats: Stats;


	constructor() {

		this.classicTdElements = {};
		this.brTdElements = {};
		this.matchHistoryTdElements = {};
		this.matchHistoryRow = {};

		this.matchHistoryBtns = {};
		this.toggleMatchHistory = {};

		this.createProfileDiv();

		this.stats = new Stats();

		this.profilePopup = new Popup({
			type: PopupType.custom,
			title: "",
			div: this.div,
			id: "profile-popup"
		});
		this.div.id = "profile-popup-content";
	}

	private createProfileDiv() {
		this.div = document.createElement("div");

		const profileDiv = document.createElement("div");
		profileDiv.id = "profile-info";


		this.profileImg = document.createElement("img");

		this.usernameElem = document.createElement("span");

		this.statusElem = document.createElement("span");

		this.usernameElem.id = "profile-username";
		this.statusElem.id = "profile-status";

		this.createStatDiv();
		this.createMatchHistoryDiv();

		this.matchHistoryDiv.id = "match-history-div";

		profileDiv.appendChild(this.profileImg);
		profileDiv.appendChild(this.usernameElem);
		profileDiv.appendChild(this.statusElem);
		this.div.appendChild(profileDiv);
		this.statsDiv.appendChild(this.matchHistoryDiv);
		this.div.appendChild(this.statsDiv);
	}

	private updateBrStatsTable(stats: any) {
		if (!stats) return;

		this.brTdElements["Game Played"].textContent = stats.gamesPlayed;
		this.brTdElements["Wins"].textContent = stats.gamesWined;
		this.brTdElements["Win Rate"].textContent = Math.round(stats.winRate * 100) + "%";
		this.brTdElements["Best Placement"].textContent = stats.bestPlacement;
		this.brTdElements["Average Placement"].textContent = stats.averagePlacement;
	}

	private handleMatchResult(data: any, index: number) {

		let result!: string
		console.log(data.opponent_username);

		switch (data.game_mode) {
			case "classic":
				this.matchHistoryBtns[index].disabled = false;
				result = `${data.goals_scored} - ${data.goals_conceded}`;
				this.matchHistoryBtns[index].textContent = result;
				this.matchHistoryBtns[index].onclick = () => {
					if (this.toggleMatchHistory[index] === false) {
						this.matchHistoryBtns[index].textContent = result;
						this.toggleMatchHistory[index] = true;
					} else {
						this.matchHistoryBtns[index].textContent = data.opponent_username;
						this.toggleMatchHistory[index] = false;
					}
				};
				break;
			case "br":
				this.matchHistoryBtns[index].disabled = true;
				switch (data.placement) {
					case 1:
						result = `${data.placement}st`;
						break
					case 2:
						result = `${data.placement}nd`;
						break
					case 3:
						result = `${data.placement}rd`;
						break
					default:
						result = `${data.placement}th`;
						break
				}
				this.matchHistoryBtns[index].textContent = result;
				break;
			default:
				result = "Unknown";
		}

	}

	private handleDate(dateString: string): string {

		let finalDate = dateString.substring(5, 16);

		finalDate = finalDate.replace("-", "/").replace(":", "h");

		const [date, time] = finalDate.split(" ");
		const [month, day] = date.split("/");

		finalDate = `${day}/${month} ${time}`;

		return finalDate;
	}


	private updateMatchHistoryTable(data: any) {

		if (!data) return;

		const history = data;

		console.log("history length: ", history.length);
		console.log("history: ", history);
		for (let i = 0; i < history.length; i++) {
			console.log("history length i: ", i);
			if (history[i].is_winner)
				this.matchHistoryRow[i].style.backgroundColor = "rgba(144, 238, 144, 0.5)";
			else
				this.matchHistoryRow[i].style.backgroundColor = "rgba(226, 50, 77, 0.5)";
			this.matchHistoryTdElements[i][0].textContent = history[i].game_mode;
			this.handleMatchResult(history[i], i);
			this.matchHistoryTdElements[i][2].textContent = this.handleDate(history[i].created_at);
		}
	}

	private updateClassicStatsTable(stats: any) {

		if (!stats) return;

		this.classicTdElements["Game Played"].textContent = stats.gamesPlayed;
		this.classicTdElements["Wins"].textContent = stats.gamesWined;
		this.classicTdElements["Losses"].textContent = stats.gamesLoosed;
		this.classicTdElements["Win Rate"].textContent = Math.round(stats.winRate * 100) + "%";
		this.classicTdElements["Best Win Streak"].textContent = stats.bestWinStreak;
		this.classicTdElements["Goals Scored"].textContent = stats.goalsScored;
		this.classicTdElements["Goals Conceded"].textContent = stats.goalsConceded;
	}

	private createMatchHistoryDiv() {

		this.matchHistoryDiv = document.createElement("div");

		const title = document.createElement("h4");
		title.textContent = "Match History";
		title.style.textAlign = "center";
		this.matchHistoryDiv.appendChild(title);


		const table = document.createElement("table");
		table.id = "match-history-table";
		table.style.width = "100%";
		table.style.borderCollapse = "collapse";

		const tbody = document.createElement("tbody");

		for (let i = 0; i < 10; i++) {

			this.matchHistoryRow[i] = document.createElement("tr");

			for (let j = 0; j < 3; j++) {

				this.matchHistoryTdElements[i] = this.matchHistoryTdElements[i] || {};
				this.matchHistoryTdElements[i][j] = document.createElement("td");


				this.matchHistoryRow[i].appendChild(this.matchHistoryTdElements[i][j]);
			}

			this.matchHistoryBtns[i] = document.createElement("button");
			this.matchHistoryBtns[i].style.backgroundColor = "transparent";
			this.matchHistoryBtns[i].style.border = "none";
			this.matchHistoryTdElements[i][1].appendChild(this.matchHistoryBtns[i]);
			this.matchHistoryBtns[i].disabled = true;
			tbody.appendChild(this.matchHistoryRow[i]);
		}

		table.appendChild(tbody);
		this.matchHistoryDiv.appendChild(table);
	}

	private createStatDiv() {

		const classicPlayerStatsName = ["Game Played", "Wins", "Losses", "Win Rate", "Best Win Streak", "Goals Scored", "Goals Conceded"];
		const brPlayerStatsName = ["Game Played", 'Wins', "Win Rate", "Best Placement", "Average Placement"];

		this.statsDiv = document.createElement("div");
		this.statsDiv.id = "profile-stats";

		this.classicStatsDiv = document.createElement("div");
		this.classicStatsDiv.id = "classic-stats-div";

		const classicTitle = document.createElement("h4");
		classicTitle.textContent = "Classic Stats";
		classicTitle.style.textAlign = "center";
		this.classicStatsDiv.appendChild(classicTitle);

		this.brStatsDiv = document.createElement("div");
		this.brStatsDiv.id = "br-stats-div";

		const brTitle = document.createElement("h4");
		brTitle.textContent = "Battle Royale Stats";
		brTitle.style.textAlign = "center";
		this.brStatsDiv.appendChild(brTitle);

		this.classicTable = document.createElement("table");
		this.classicTable.id = "classic-stats";

		this.brTable = document.createElement("table");
		this.brTable.id = "br-stats";

		const classicHeader = document.createElement("thead");

		classicPlayerStatsName.forEach(statName => {
			const classicRow = document.createElement("tr");
			const classicTitlesCell = document.createElement("th");
			this.classicTdElements[statName] = document.createElement("td");


			classicTitlesCell.textContent = statName;

			classicRow.appendChild(classicTitlesCell);
			classicRow.appendChild(this.classicTdElements[statName]);
			classicHeader.appendChild(classicRow);
		});

		const brHeader = document.createElement("thead");

		brPlayerStatsName.forEach(statName => {
			const brRow = document.createElement("tr");
			const brTitlesCell = document.createElement("th");
			this.brTdElements[statName] = document.createElement("td");


			brTitlesCell.textContent = statName;

			brRow.appendChild(brTitlesCell);
			brRow.appendChild(this.brTdElements[statName]);
			brHeader.appendChild(brRow);
		});

		this.brTable.appendChild(brHeader);
		this.classicTable.appendChild(classicHeader);
		this.brStatsDiv.appendChild(this.brTable);
		this.classicStatsDiv.appendChild(this.classicTable);
		this.statsDiv.appendChild(this.classicStatsDiv);
		this.statsDiv.appendChild(this.brStatsDiv);
	}

	// public async load() {
	// 	this.updateProfileInfo();
	// 	await this.getPlayerStats();
	// 	await this.getMatchHistory();
	// 	this.profilePopup.show();
	// }

	public async load(uuid: string) {
		if (uuid == User.uuid) {
			this.profileImg.src = User.avatar;
			this.usernameElem.textContent = User.username;
			this.statusElem.textContent = `${User.status}`;
			this.statusElem.style.color = User.status === "online" ? "green" : User.status === "offline" ? "orange" : "red";

		} else {
			const json: any = await postRequest("info/search", { identifier: uuid, type: "uuid" })
				.catch((err) => htmlManager.notification.error(err));
			this.profileImg.src = json.data.avatar_path;
			this.usernameElem.textContent = json.data.username;
			this.statusElem.textContent = `${json.data.status}`;
			this.statusElem.style.color = json.data.status === "online" ? "green" : json.data.status === "offline" ? "orange" : "red";
		}
		await this.stats.update(uuid)
			.catch((err) => htmlManager.notification.error(err));
		this.updateClassicStatsTable(this.stats.classic);
		this.updateBrStatsTable(this.stats.br);
		this.updateMatchHistoryTable(this.stats.history.history);
		this.profilePopup.show();
	}

	public unload() {
		this.profilePopup.close();
	}
}

