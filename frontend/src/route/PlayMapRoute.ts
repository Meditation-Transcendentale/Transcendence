import { htmlManager } from "../html/HtmlManager";
import { fetchHTML } from "../networking/utils";
import { sceneManager } from "../scene/SceneManager";
import { IRoute } from "./IRoute";

export class PlayMapRoute implements IRoute {
	public created: boolean;

	constructor() {
		this.created = false;
	}

	public async init(): Promise<void> {
		const div = await fetchHTML("playMap")
			.catch((err) => { alert("fecth html play error") });
		htmlManager.playMap.init(div);
		this.created = true;
	}

	public async load(): Promise<void> {
		if (!this.created)
			await this.init();
		htmlManager.playMap.load();
		sceneManager.load("home");
		sceneManager.cameraManager.vue = "create";
	}

	public async unload(): Promise<void> {
		htmlManager.playMap.unload();
	}
}
