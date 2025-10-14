import { htmlManager } from "../html/HtmlManager";
import { sceneManager } from "../scene/SceneManager";
import { IRoute } from "./IRoute";
import { routeManager } from "./RouteManager";

export class HomeRoute implements IRoute {
	public created: boolean;

	private test: HTMLElement;
	constructor() {
		this.created = false;

		this.test = document.createElement("dialog");
		this.test.className = "popup window";
		this.test.innerText = "HELLO";
		const p = document.createElement("input");
		p.type = "text";
		p.placeholder = "jaeyfajhf";
		this.test.appendChild(p);
		this.test.style.pointerEvents = "all";
		this.test.addEventListener("focusout", () => {
			console.log("poepo");
			this.test.remove();
		})
		this.test.addEventListener("focusin", () => {
			console.log("fqfeef");
		})
	}

	public async init() {
		// const div = fetchHTML("home")
		// 	.catch((err) => { alert("fecth html home error") });
		// htmlManager.home.init(div);
		this.created = true;
	}

	public async load() {
		if (!this.created)
			await this.init();
		sceneManager.cameraManager.vue = "home";
		sceneManager.load("home");
		htmlManager.cube.name = "PLAY";
		htmlManager.cube.enable = true;
		htmlManager.cube.clickEvent = () => routeManager.nav("/play", false, false);
		sceneManager.ballGrass.ballOrigin.set(0, 0, -10);
		// htmlManager.cube.clickEvent = () => {
		// 	document.body.appendChild(this.test);
		// 	this.test.focus();
		// };

	}

	public async unload() {
		// htmlManager.home.unload();
	}

}
