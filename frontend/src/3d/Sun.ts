import { DirectionalLight, HemisphericLight, Light, Scene, Vector3 } from "@babylonImport";


export class Sun {
	private scene: Scene;

	private light: Light;
	private hemish: HemisphericLight;

	constructor(scene: Scene) {
		this.scene = scene;


		this.light = new DirectionalLight("light", new Vector3(0, -1, -0.5), this.scene);
		this.light.intensity = 1.;

		this.hemish = new HemisphericLight("hemish", new Vector3(1, 1, 1), this.scene);
		this.hemish.intensity = 0.2;
	}
}
