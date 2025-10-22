import { htmlManager } from "../html/HtmlManager";
import { fetchHTML } from "../networking/utils";
import { sceneManager } from "../scene/SceneManager";
import { IRoute } from "./IRoute";

export class AuthRoute implements IRoute {
	public created: boolean;

	constructor() {
		this.created = false;
	}

	public async init() {
		const div = await fetchHTML("auth")
			.catch((err) => { alert("fecth html home error") });
		htmlManager.auth.init(div);
		this.created = true;
	}

	public async load() {
		if (!this.created)
			await this.init();
		sceneManager.cameraManager.vue = "auth";
		sceneManager.load("auth");
		htmlManager.auth.load();
		return true
	}

	public async unload() {
		htmlManager.auth.unload();

	}
}
