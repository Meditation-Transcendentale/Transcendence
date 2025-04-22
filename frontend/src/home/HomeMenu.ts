import { ABlock } from "../ABlock";
import { CustomEvents } from "../CustomEvents";
import { logoutRequest } from "../requests";
import { createContainer } from "../utils";

export class HomeMenu extends ABlock {
	private info!: HTMLElement;
	private play!: HTMLElement;
	private stats!: HTMLElement;
	private quit!: HTMLElement;

	constructor(parent: HTMLElement) {
		super();
		this.init();
		this.disable();

		parent.appendChild(this.container);
	}

	private init() {
		this.container = createContainer("home-menu-container", "home-menu");

		this.info = document.createElement("input");
		this.info.id = "home-menu-info";
		this.info.setAttribute("class", "home-menu info");
		this.info.setAttribute("type", "button");
		this.info.setAttribute("value", "Info");
		this.info.addEventListener("click", () => {
			alert("info");
		});

		this.play = document.createElement("input");
		this.play.id = "home-menu-play";
		this.play.setAttribute("class", "home-menu play");
		this.play.setAttribute("type", "button");
		this.play.setAttribute("value", "Play");
		this.play.addEventListener("click", () => {
			alert("play");
		});

		this.stats = document.createElement("input");
		this.stats.id = "home-menu-stats";
		this.stats.setAttribute("class", "home-menu stats");
		this.stats.setAttribute("type", "button");
		this.stats.setAttribute("value", "Stats");
		this.stats.addEventListener("click", () => {
			alert("stats");
		});

		this.quit = document.createElement("input");
		this.quit.id = "home-menu-quit";
		this.quit.setAttribute("class", "home-menu quit");
		this.quit.setAttribute("type", "button");
		this.quit.setAttribute("value", "quit");
		this.quit.addEventListener("click", () => {
			this.quitHandler();
		});



		this.container.appendChild(this.info);
		this.container.appendChild(this.play);
		this.container.appendChild(this.stats);
		this.container.appendChild(this.quit);
	}

	private async quitHandler() {
		await logoutRequest()
			.then((resp) => {
				document.getElementById("ui")?.dispatchEvent(CustomEvents.quit);

			})
			.catch((err) => console.log(err));

	}
}
