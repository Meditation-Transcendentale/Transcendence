import { ABlock } from "../../ABlock";
import { createContainer } from "../../utils";
import { BRStats } from "./BRStats";
import { ClassicStats } from "./ClassicStats";
import { IOStats } from "./IOStats";

export class Stats extends ABlock {
	private menu!: HTMLElement;

	private pongBtn!: HTMLElement;
	private brBtn!: HTMLElement;
	private ioBtn!: HTMLElement;

	private lastUser!: string;

	private classic!: ClassicStats;
	private br!: BRStats;
	private io!: IOStats;

	constructor(parent: HTMLElement) {
		super(parent);

		this.lastUser = "";
		this.init();
		this.classic = new ClassicStats(this.container);
		this.br = new BRStats(this.container);
		this.io = new IOStats(this.container);

	}

	private init() {
		this.container = createContainer("stats-container", "stats");
		this.container.addEventListener("enable", () => {
			this.enable();
		})
		this.container.addEventListener("disable", () => {
			this.disable();
		})

		this.menu = createContainer("stats-menu", "stats menu");

		this.pongBtn = document.createElement("input");
		this.pongBtn.setAttribute("type", "button");
		this.pongBtn.setAttribute("value", "Classic");
		this.pongBtn.addEventListener("click", () => {
			this.br.disable();
			this.io.disable();
			this.classic.enable();
		})

		this.brBtn = document.createElement("input");
		this.brBtn.setAttribute("type", "button");
		this.brBtn.setAttribute("value", "BR");
		this.brBtn.addEventListener("click", () => {
			this.classic.disable();
			this.io.disable();
			this.br.enable();
		})

		this.ioBtn = document.createElement("input");
		this.ioBtn.setAttribute("type", "button");
		this.ioBtn.setAttribute("value", "IO");
		this.ioBtn.addEventListener("click", () => {
			this.classic.disable();
			this.br.disable();
			this.io.enable();
		})

		this.menu.appendChild(this.pongBtn);
		this.menu.appendChild(this.brBtn);
		this.menu.appendChild(this.ioBtn);

		this.container.appendChild(this.menu);

	}
}
