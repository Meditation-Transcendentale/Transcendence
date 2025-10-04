import { htmlManager } from "../html/HtmlManager";
import { fetchHTML } from "../networking/utils";
import { sceneManager } from "../scene/SceneManager";
import { IRoute } from "./IRoute";

export class PlayModeRoute implements IRoute {
	public created: boolean;

	constructor() {
		this.created = false;
	}

	public async init(): Promise<void> {
		const div = await fetchHTML("playMode")
			.catch((err) => { alert("fecth html play error") });
		htmlManager.playMode.init(div);
		this.created = true;
	}

	public async load(): Promise<void> {
		if (!this.created)
			await this.init();
		htmlManager.playMode.load();
		sceneManager.load("home");
		sceneManager.cameraManager.vue = "create";
	}

	public async unload(): Promise<void> {
		htmlManager.playMode.unload();
	}
}
