import { AbstractMesh, ArcRotateCamera, Camera, Mesh, MeshBuilder, RenderTargetTexture, Scene, ShaderMaterial, UniversalCamera, Vector3 } from "@babylonImport";

export class Water {
	private scene: Scene;
	private camera: Camera;
	private causticCamera: UniversalCamera;

	private lightMesh: Mesh;
	private lightMaterial: ShaderMaterial;
	private defaultMaterial: ShaderMaterial;



	private size = 20;
	private height = 40;

	public rt: RenderTargetTexture;
	private rtSize = 256;

	private worldScale = 40;

	constructor(scene: Scene, camera: Camera) {
		this.scene = scene;
		this.camera = camera;

		this.causticCamera = new UniversalCamera("causticCamera", new Vector3(0, this.height + 10, 0), this.scene);
		this.causticCamera.setTarget(new Vector3(0, 0, 0));
		this.causticCamera.layerMask = 0x0000ffff;
		this.causticCamera.mode = Camera.ORTHOGRAPHIC_CAMERA;
		this.causticCamera.orthoTop = this.worldScale * 0.5;
		this.causticCamera.orthoBottom = -this.worldScale * 0.5;
		this.causticCamera.orthoRight = this.worldScale * 0.5;
		this.causticCamera.orthoLeft = -this.worldScale * 0.5;

		this.rt = new RenderTargetTexture("caustic", { width: this.rtSize, height: this.rtSize }, this.scene);
		//console.log("GRASS RT SIZE", this.rt.getSize());
		this.rt.activeCamera = this.causticCamera;
		this.rt.skipInitialClear = true;
		this.rt.refreshRate = 1;
		this.rt.hasAlpha = true;
		this.scene.customRenderTargets.push(this.rt);

		this.defaultMaterial = new ShaderMaterial("geometry", this.scene, "geometry", {
			uniforms: ["world", "view", "projection", "worldScale"],
			attributes: ["position"],
			needAlphaTesting: false,
			needAlphaBlending: false

		});

		this.lightMesh = MeshBuilder.CreateGround("lightMesh", { width: this.size, height: this.size, subdivisions: 50 }, this.scene);
		this.lightMesh.position.set(0, this.height, 0);
		this.lightMesh.layerMask = 0x00000001;


	}

	public setMaterial() {
		this.rt.setMaterialForRendering(this.rt.renderList as AbstractMesh[], this.defaultMaterial);
	}

	public update() {
		this.defaultMaterial.setFloat("worldScale", this.worldScale);
	}
}
