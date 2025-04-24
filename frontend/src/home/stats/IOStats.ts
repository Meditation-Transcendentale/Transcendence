import { ABlock } from "../../ABlock";
import { createContainer } from "../../utils";

export class IOStats extends ABlock {
	private table!: HTMLElement;
	private matchHistory!: HTMLElement;

	constructor(parent: HTMLElement) {
		super(parent);

		this.init();
	}

	private init() {
		this.container = createContainer("io-stats-container", "io-stats");

		this.initTable();
		this.container.appendChild(this.table);

	}

	private initTable() {
		this.table = document.createElement("table");
		this.table.appendChild(
			this.createRow2("game-played", "Game Played", 0)
		)
		this.table.appendChild(
			this.createRow2("wins", "Wins", 0)
		)
		this.table.appendChild(
			this.createRow2("win-rate", "Win Rate", 0)
		)
		this.table.appendChild(
			this.createRow2("best-win-streak", "Best Win Streak", 0)
		)
		this.table.appendChild(
			this.createRow2("avg-placement", "Average Placement", 0)
		)
		this.table.appendChild(
			this.createRow2("best-placement", "Best Placement", 0)
		)
		this.table.appendChild(
			this.createRow2("kills", "Kills", 0)
		)
		this.table.appendChild(
			this.createRow2("avg-kills", "Average Kills", 0)
		)
		this.table.appendChild(
			this.createRow2("best-kills", "best-kills", 0)
		)

	}

	private createRow2(id: string, key: string, value: string | number) {
		const tr = document.createElement("tr");

		const th1 = document.createElement("th");
		th1.id = "io-" + id;
		th1.innerHTML = key;

		const th2 = document.createElement("th");
		th2.id = "io-" + id + '-value';
		th2.innerHTML = value as string;

		tr.appendChild(th1);
		tr.appendChild(th2);

		return tr;
	}
}
