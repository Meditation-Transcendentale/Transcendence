import { Matrix } from "../../babylon";
import { routeManager } from "../../route/RouteManager";
import { sceneManager } from "../../scene/SceneManager";

interface homeHtmlReference {
	play: HTMLElement,
};

class Home {
	private div: HTMLDivElement;
	private ref: homeHtmlReference;


	constructor(div: HTMLDivElement) {
		this.div = div;

		this.ref = {
			play: div.querySelector("#home-play") as HTMLElement,
		};

		sceneManager.css3dRenderer.addObject("play", {
			html: this.ref.play,
			width: 1,
			height: 1,
			world: Matrix.RotationY(Math.PI).multiply(Matrix.Translation(0, 7, 1.8)),
			enable: false
		})

		this.ref.play.addEventListener("click", () => {
			console.log("ayaya");
		})
	}

	public load(params: URLSearchParams) {
		sceneManager.css3dRenderer.setObjectEnable("play", true);
		sceneManager.cameraManager.vue = "home";
		sceneManager.load("home");
	}

	public async unload() {
		sceneManager.css3dRenderer.setObjectEnable("play", false);
	}
}

export default Home;
