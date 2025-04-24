import { ABlock } from "../ABlock";
import { createContainer } from "../utils";
import { HomeMenu } from "./HomeMenu";
import { Info } from "./info/Info";
import { Stats } from "./stats/Stats";

export default class Home extends ABlock {

	private menu!: HomeMenu;

	private info!: Info;
	private stats!: Stats;

	constructor(parent: HTMLElement) {
		super(parent);
		this.init();

	}

	private init() {
		this.container = createContainer("home-container", "home");
		this.container.addEventListener("info", () => {
			this.stats.disable();
			this.info.enable();
		});
		this.container.addEventListener("stats", () => {
			this.info.disable();
			this.stats.enable();
		})

		this.menu = new HomeMenu(this.container);
		this.info = new Info(this.container);
		this.stats = new Stats(this.container);
	}

	public reset() {
		this.enable();
		this.info.disable();
		this.stats.disable();
	}
}

