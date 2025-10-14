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
	private usernameElem!: HTMLHeadingElement;
	private statusElem!: HTMLParagraphElement;

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
			div: this.div
		});
	}

	private createProfileDiv() {
		this.div = document.createElement("div");
		this.div.style.display = "flex";
		this.div.style.alignItems = "center";
		this.div.style.gap = "10px";
		this.div.style.backgroundColor = "transparent";

		const profileDiv = document.createElement("div");
		profileDiv.style.display = "flex";
		profileDiv.style.flexDirection = "column";
		profileDiv.style.alignItems = "center";
		profileDiv.style.gap = "5px";
		profileDiv.style.marginBottom = "10px";
		profileDiv.style.border = "1px solid black";


		this.profileImg = document.createElement("img");
		this.profileImg.alt = "Profile Image";
		this.profileImg.style.width = "100px";
		this.profileImg.style.height = "100px";
		this.profileImg.style.objectFit = "cover";
		this.profileImg.style.borderRadius = "50%";

		this.usernameElem = document.createElement("h2");

		this.statusElem = document.createElement("p");
		this.statusElem.style.fontSize = "12px";

		this.createStatDiv();
		this.createMatchHistoryDiv();

		profileDiv.appendChild(this.usernameElem);
		profileDiv.appendChild(this.profileImg);
		profileDiv.appendChild(this.statusElem);
		this.div.appendChild(profileDiv);
		this.div.appendChild(this.statsDiv);
		this.div.appendChild(this.matchHistoryDiv);
	}

	private async getPlayerStats(uuid: string) {


		await User.classicStats.check()
			.then(() => { this.updateClassicStatsTable(User.classicStats) })
			.catch((err) => { });

		await User.brStats.check()
			.then(() => { this.updateBrStatsTable(User.brStats) })
			.catch((err) => { });
	}

	private updateBrStatsTable(stats: any) {
		if (!stats) return;

		this.brTdElements["Game Played"].textContent = stats.gamesPlayed;
		this.brTdElements["Wined"].textContent = stats.gamesWined;
		this.brTdElements["Win Rate"].textContent = Math.round(stats.winRate * 100) + "%";
		this.brTdElements["Best Placement"].textContent = stats.bestPlacement;
		this.brTdElements["Average Placement"].textContent = stats.averagePlacement;
	}

	private async getMatchHistory() {


		await User.matchHistory.getHistory()
			.then(() => {
				this.updateMatchHistoryTable(User.matchHistory.history);
			})
			.catch((err) => { });
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
			this.matchHistoryRow[i].style.border = "1px solid black";
			this.matchHistoryTdElements[i][1].style.border = "1px solid black";
			this.matchHistoryTdElements[i][0].textContent = history[i].game_mode;
			this.handleMatchResult(history[i], i);
			this.matchHistoryTdElements[i][2].textContent = this.handleDate(history[i].created_at);
		}
	}

	private updateClassicStatsTable(stats: any) {

		if (!stats) return;

		this.classicTdElements["Game Played"].textContent = stats.gamesPlayed;
		this.classicTdElements["Wined"].textContent = stats.gamesWined;
		this.classicTdElements["Loosed"].textContent = stats.gamesLoosed;
		this.classicTdElements["Win Rate"].textContent = Math.round(stats.winRate * 100) + "%";
		this.classicTdElements["Best Win Streak"].textContent = stats.bestWinStreak;
		this.classicTdElements["Goals Scored"].textContent = stats.goalsScored;
		this.classicTdElements["Goals Conceded"].textContent = stats.goalsConceded;
	}

	private createMatchHistoryDiv() {

		this.matchHistoryDiv = document.createElement("div");
		this.matchHistoryDiv.id = "profile-match-history";
		this.matchHistoryDiv.style.display = "flex";
		this.matchHistoryDiv.style.flexDirection = "column";
		this.matchHistoryDiv.style.gap = "5px";
		this.matchHistoryDiv.style.marginTop = "10px";
		this.matchHistoryDiv.style.border = "1px solid black";

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

		const classicPlayerStatsName = ["Game Played", "Wined", "Loosed", "Win Rate", "Best Win Streak", "Goals Scored", "Goals Conceded"];
		const brPlayerStatsName = ["Game Played", 'Wined', "Win Rate", "Best Placement", "Average Placement"];

		this.statsDiv = document.createElement("div");
		this.statsDiv.id = "profile-stats";
		this.statsDiv.style.display = "flex";
		this.statsDiv.style.flexDirection = "row";
		this.statsDiv.style.gap = "5px";
		this.statsDiv.style.marginTop = "10px";

		this.classicStatsDiv = document.createElement("div");
		this.classicStatsDiv.id = "classic-stats-div";
		this.classicStatsDiv.style.flex = "1";
		this.classicStatsDiv.style.border = "1px solid black";

		const classicTitle = document.createElement("h4");
		classicTitle.textContent = "Classic Stats";
		classicTitle.style.textAlign = "center";
		this.classicStatsDiv.appendChild(classicTitle);

		this.brStatsDiv = document.createElement("div");
		this.brStatsDiv.id = "br-stats-div";
		this.brStatsDiv.style.flex = "1";
		this.brStatsDiv.style.border = "1px solid black";

		const brTitle = document.createElement("h4");
		brTitle.textContent = "Battle Royale Stats";
		brTitle.style.textAlign = "center";
		this.brStatsDiv.appendChild(brTitle);

		this.classicTable = document.createElement("table");
		this.classicTable.id = "classic-stats";
		this.classicTable.style.width = "100%";
		this.classicTable.style.borderCollapse = "collapse";
		this.classicTable.style.marginTop = "10px";

		this.brTable = document.createElement("table");
		this.brTable.id = "br-stats";
		this.brTable.style.width = "100%";
		this.brTable.style.borderCollapse = "collapse";
		this.brTable.style.marginTop = "10px";

		const classicHeader = document.createElement("thead");

		classicPlayerStatsName.forEach(statName => {
			const classicRow = document.createElement("tr");
			const classicTitlesCell = document.createElement("th");
			this.classicTdElements[statName] = document.createElement("td");

			classicRow.style.border = "1px solid black";
			classicTitlesCell.style.border = "1px solid black";

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

			brRow.style.border = "1px solid black";
			brTitlesCell.style.border = "1px solid black";

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

	private async updateProfileInfo() {
		await User.check();
		this.profileImg.src = User.avatar || "/cdn/default_avatar.jpg";
		this.usernameElem.textContent = User.username || "User";
		this.statusElem.textContent = `Status: ${User.status || "offline"}`;
		this.statusElem.style.color = User.status === "online" ? "green" : User.status === "offline" ? "orange" : "red";
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
			this.statusElem.textContent = `Status: ${User.status}`;
			this.statusElem.style.color = User.status === "online" ? "green" : User.status === "offline" ? "orange" : "red";

		} else {
			const json: any = await postRequest("info/search", { identifier: uuid, type: "uuid" })
				.catch((err) => htmlManager.notification.error(err));
			this.profileImg.src = json.data.avatar_path;
			this.usernameElem.textContent = json.data.username;
			this.statusElem.textContent = `Status: ${json.data.status}`;
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

