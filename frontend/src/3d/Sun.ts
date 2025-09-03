import { DirectionalLight, HemisphericLight, Light, Scene, Vector3 } from "@babylonImport";
import { UIaddColor, UIaddNumber } from "./UtilsUI";


export class Sun {
	private scene: Scene;

	private light: Light;
	private hemish: HemisphericLight;

	constructor(scene: Scene) {
		this.scene = scene;


		this.light = new DirectionalLight("light", new Vector3(0, -1, 0), this.scene);
		this.light.intensity = 0.5;

		this.hemish = new HemisphericLight("hemish", new Vector3(0, 1, 0), this.scene);
		this.hemish.intensity = 2.5;
		UIaddNumber("hemis intensity", this.hemish.intensity, (value: number) => {
			this.hemish.intensity = value;
		})
		UIaddColor("hemish diffuse", this.hemish.diffuse, () => { });
		UIaddColor("hemish ground", this.hemish.groundColor, () => { });
	}
}
