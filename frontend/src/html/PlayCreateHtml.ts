import { Matrix } from "../babylon";
import { createGame } from "../networking/utils";
import { routeManager } from "../route/RouteManager";
import { sceneManager } from "../scene/SceneManager";
import { stateManager } from "../state/StateManager";
import { IHtml } from "./IHtml";

export class PlayCreateHtml implements IHtml {
	private css!: HTMLLinkElement;

	private window!: HTMLDivElement;
	private info!: HTMLDivElement;
	private description!: HTMLDivElement;
	private form!: HTMLFormElement;

	constructor() { }

	public init(div: HTMLElement) {
		this.css = div.querySelector("link") as HTMLLinkElement;

		this.window = div.querySelector(".create-window") as HTMLDivElement;
		this.info = div.querySelector("#create-info") as HTMLDivElement;
		this.description = div.querySelector("#create-description") as HTMLDivElement;
		this.form = div.querySelector("#create-form") as HTMLFormElement;

		sceneManager.css3dRenderer.addObject("play-create", {
			html: this.window,
			width: 1.,
			height: 1.,
			world: Matrix.RotationY(-Math.PI * 0.5 + Math.PI * 0.15).multiply(Matrix.Translation(-2, 5, -13.25)),
			enable: false
		})

		sceneManager.css3dRenderer.addObject("play-info", {
			html: this.info,
			width: 1.,
			height: 1.,
			world: Matrix.RotationY(-Math.PI * 0.5 + Math.PI * 0.15).multiply(Matrix.Translation(-2, 7.5, -13.25)),
			enable: false
		})

		sceneManager.css3dRenderer.addObject("play-create-description", {
			html: this.description,
			width: 1.,
			height: 1.,
			world: Matrix.RotationY(-Math.PI * 0.5 + Math.PI * -0.1).multiply(Matrix.Translation(-2, 5, -17.5)),
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
		sceneManager.css3dRenderer.setObjectEnable("play-info", true);
		sceneManager.css3dRenderer.setObjectEnable("play-create-description", true);
	}

	public unload(): void {
		sceneManager.css3dRenderer.setObjectEnable("play-create", false);
		sceneManager.css3dRenderer.setObjectEnable("play-info", false);
		sceneManager.css3dRenderer.setObjectEnable("play-create-description", false);
		this.css.remove();
	}
}
