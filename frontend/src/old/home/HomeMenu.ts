import { ABlock } from "../ABlock";
import { CustomEvents } from "../CustomEvents";
import { logoutRequest } from "../requests";
import { createContainer } from "../utils";

export class HomeMenu extends ABlock {
	private info!: HTMLElement;
	private play!: HTMLElement;
	private stats!: HTMLElement;
	private friendlist!: HTMLElement
	private quit!: HTMLElement;

	constructor(parent: HTMLElement) {
		super(parent);
		this.init();

		this.enable();

	}

	private init() {
		this.container = createContainer("home-menu-container", "home-menu");

		this.info = document.createElement("input");
		this.info.id = "home-menu-info";
		this.info.setAttribute("class", "home-menu info");
		this.info.setAttribute("type", "button");
		this.info.setAttribute("value", "Info");
		this.info.addEventListener("click", () => {
			document.getElementById("home-container")?.dispatchEvent(CustomEvents.info);

		});

		this.play = document.createElement("input");
		this.play.id = "home-menu-play";
		this.play.setAttribute("class", "home-menu play");
		this.play.setAttribute("type", "button");
		this.play.setAttribute("value", "Play");
		this.play.addEventListener("click", () => {
			alert('play');
		});

		this.stats = document.createElement("input");
		this.stats.id = "home-menu-stats";
		this.stats.setAttribute("class", "home-menu stats");
		this.stats.setAttribute("type", "button");
		this.stats.setAttribute("value", "Stats");
		this.stats.addEventListener("click", () => {
			document.getElementById("home-container")?.dispatchEvent(CustomEvents.stats);
		});
		
		this.friendlist = document.createElement("input");
		this.friendlist.id = "home-menu-friendlist";
		this.friendlist.setAttribute("class", "home-menu friendlist");
		this.friendlist.setAttribute("type", "button");
		this.friendlist.setAttribute("value", "Friendlist");
		this.friendlist.addEventListener("click", () => {
			document.getElementById("home-container")?.dispatchEvent(CustomEvents.friendlist);
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
		this.container.appendChild(this.friendlist);
		this.container.appendChild(this.quit);
	}

	private async quitHandler() {
		await logoutRequest()
			.then((response) => {
				document.getElementById("status")?.dispatchEvent(new CustomEvent("status", { detail: response }));
				console.log(response);
				if (response.ok) {
					sessionStorage.clear();
					document.getElementById("ui")?.dispatchEvent(CustomEvents.quit);
					return;
				}

			})
			.catch((err) => console.log(err));

	}
}
