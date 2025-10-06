import { Matrix } from "../babylon";
import { createGame } from "../networking/utils";
import { routeManager } from "../route/RouteManager";
import { sceneManager } from "../scene/SceneManager";
import { stateManager } from "../state/StateManager";
import { IHtml } from "./IHtml";

export class PlayMapHtml implements IHtml {
	private css!: HTMLLinkElement;

	private window!: HTMLDivElement;
	private form!: HTMLFormElement;

	constructor() { }

	public init(div: HTMLElement) {
		this.css = div.querySelector("link") as HTMLLinkElement;

		this.window = div.querySelector(".window") as HTMLDivElement;
		this.form = div.querySelector("form") as HTMLFormElement;

		sceneManager.css3dRenderer.addObject("play-map", {
			html: this.window,
			width: 1.,
			height: 1.,
			world: Matrix.RotationY(-Math.PI * 0.5 + Math.PI * 0.05).multiply(Matrix.Translation(-3, 3, -14)),
			enable: false
		})

		this.form.addEventListener("submit", (e) => {
			e.preventDefault();
			if (!e.submitter || !e.submitter.hasAttribute("name") || (stateManager.gameMode != "ai" && stateManager.gameMode != "local" && stateManager.gameMode != "online")) {
				return;
			}
			const submitter = e.submitter.getAttribute("name") as string;
			switch (submitter) {
				case "void": {
					stateManager.gameMap = "void";
					createGame();
					break;
				}
				case "grass": {
					stateManager.gameMap = "grass";
					createGame();
					break;
				}
				case "monolith": {
					stateManager.gameMap = "monolith";
					createGame();
					break;
				}
			}
		})
	}

	public load(): void {
		console.log("load map")
		if (stateManager.gameMode != "ai" && stateManager.gameMode != "local" && stateManager.gameMode != "online") {
			routeManager.nav("/play");
			console.log("REturn to play");
			return;
		}
		document.head.appendChild(this.css);
		sceneManager.css3dRenderer.setObjectEnable("play-map", true);
	}

	public unload(): void {
		sceneManager.css3dRenderer.setObjectEnable("play-map", false);
		this.css.remove();
	}
}
