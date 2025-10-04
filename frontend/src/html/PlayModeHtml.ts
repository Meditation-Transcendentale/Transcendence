import { Matrix } from "../babylon";
import { routeManager } from "../route/RouteManager";
import { sceneManager } from "../scene/SceneManager";
import { stateManager } from "../state/StateManager";
import { IHtml } from "./IHtml";

export class PlayModeHtml implements IHtml {
	private css!: HTMLLinkElement;

	private window!: HTMLDivElement;
	private title!: HTMLSpanElement;
	private pongForm!: HTMLFormElement;
	private brickForm!: HTMLFormElement;

	constructor() { }

	public init(div: HTMLElement) {
		this.css = div.querySelector("link") as HTMLLinkElement;

		this.window = div.querySelector(".window") as HTMLDivElement;
		this.title = div.querySelector(".window-title") as HTMLSpanElement;
		this.pongForm = div.querySelector("#pong-form") as HTMLFormElement;
		this.brickForm = div.querySelector("#brick-form") as HTMLFormElement;

		sceneManager.css3dRenderer.addObject("play-mode", {
			html: this.window,
			width: 1.,
			height: 1.,
			world: Matrix.RotationY(-Math.PI * 0.5 + Math.PI * 0.05).multiply(Matrix.Translation(-3, 3, -14)),
			enable: false
		})

		this.pongForm.addEventListener("submit", (e) => {
			e.preventDefault();
			if (!e.submitter || !e.submitter.hasAttribute("name") || stateManager.gameMode != "pong") {
				return;
			}
			const submitter = e.submitter.getAttribute("name") as string;
			switch (submitter) {
				case "local": {
					stateManager.gameMode = "local";
					routeManager.nav("/play/map");
					break;
				}
				case "ai": {
					stateManager.gameMode = "ai";
					routeManager.nav("/play/map");
					break;
				}
				case "online": {
					stateManager.gameMode = "online";
					routeManager.nav("/play/map");
					break;
				}
			}
		})

		this.brickForm.addEventListener("submit", (e) => {
			e.preventDefault();
			if (!e.submitter || !e.submitter.hasAttribute("name") || stateManager.gameMode != "brick") {
				return;
			}
			const submitter = e.submitter.getAttribute("name") as string;
			switch (submitter) {
				case "easy": {
					stateManager.gameMode = "easy";
					routeManager.nav("/brick");
					break;
				}
				case "medium": {
					stateManager.gameMode = "normal";
					routeManager.nav("/brick");
					break;
				}
				case "high": {
					stateManager.gameMode = "hard";
					routeManager.nav("/brick");
					break;
				}
			}
		})

	}

	public load(): void {
		if (stateManager.gameMode == "pong") {
			this.title.textContent = "CHOOSE MODE";
			this.brickForm.classList.add("hidden");
			this.pongForm.classList.remove("hidden");
		} else if (stateManager.gameMode == "brick") {
			this.title.textContent = "CHOOSE DIFFICULTY";
			this.brickForm.classList.remove("hidden");
			this.pongForm.classList.add("hidden");
		} else {
			routeManager.nav("/play");
			return;
		}
		document.head.appendChild(this.css);
		sceneManager.css3dRenderer.setObjectEnable("play-mode", true);
	}

	public unload(): void {
		sceneManager.css3dRenderer.setObjectEnable("play-mode", false);
		this.css.remove();
	}
}
