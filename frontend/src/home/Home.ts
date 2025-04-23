import { ABlock } from "../ABlock";
import { createContainer } from "../utils";
import { HomeMenu } from "./HomeMenu";
import { Info } from "./Info/Info";

export default class Home extends ABlock {

	private menu!: HomeMenu;

	private info!: Info;

	constructor(parent: HTMLElement) {
		super();
		this.init();
		this.disable();

		parent.appendChild(this.container);
	}

	private init() {
		this.container = createContainer("home-container", "home");

		this.menu = new HomeMenu(this.container);
		this.info = new Info(this.container);
	}

	public reset() {
		this.menu.enable();
		this.enable();
	}
}

