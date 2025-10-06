import { Matrix } from "../babylon";
import { createGame } from "../networking/utils";
import { routeManager } from "../route/RouteManager";
import { sceneManager } from "../scene/SceneManager";
import { stateManager } from "../state/StateManager";
import { IHtml } from "./IHtml";

export class PlayCreateHtml implements IHtml {
	private css!: HTMLLinkElement;

	private window!: HTMLDivElement;
	private form!: HTMLFormElement;

	constructor() { }

	public init(div: HTMLElement) {
		this.css = div.querySelector("link") as HTMLLinkElement;

		this.window = div.querySelector(".window") as HTMLDivElement;
		this.form = div.querySelector("form") as HTMLFormElement;

		sceneManager.css3dRenderer.addObject("play-create", {
			html: this.window,
			width: 1.,
			height: 1.,
			world: Matrix.RotationY(-Math.PI * 0.5 + Math.PI * 0.05).multiply(Matrix.Translation(-1, 6, -14)),
			enable: false
		})

		this.form.addEventListener("submit", (e) => {
			e.preventDefault();
			if (!e.submitter || !e.submitter.hasAttribute("name")) {
				return;
			}
			const submitter = e.submitter.getAttribute("name") as string;
			switch (submitter) {
				case "pong": {
					stateManager.gameMode = "pong";
					routeManager.nav("/play/mode");
					break;
				}
				case "tournament": {
					stateManager.gameMode = "tournament";
					createGame();
					break;
				}
				case "brick": {
					stateManager.gameMode = "brick";
					routeManager.nav("/play/mode");
					break;
				}
				case "br": {
					stateManager.gameMode = "br";
					createGame();
					break;
				}
			}
		})
	}

	public load(): void {
		stateManager.gameMap = "";
		stateManager.gameMode = "";
		stateManager.gameId = "";
		document.head.appendChild(this.css);
		sceneManager.css3dRenderer.setObjectEnable("play-create", true);
	}

	public unload(): void {
		sceneManager.css3dRenderer.setObjectEnable("play-create", false);
		this.css.remove();
	}
}
