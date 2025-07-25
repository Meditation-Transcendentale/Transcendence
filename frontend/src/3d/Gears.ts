
//import { GLTFFileLoader} from "@babylonjs/loaders/glTF/glTFFileLoader";
import { Vue } from "../Vue";
import {
	AbstractMesh,
	Camera, CascadedShadowGenerator,
	Color3, DirectionalLight, LoadAssetContainerAsync, Matrix, Mesh, PBRMaterial, Quaternion, Scene, Vector3
} from "@babylonImport";

interface cssElem {
	div: HTMLDivElement;
	bounding: Vector3[];
	header: HTMLDivElement;
	pos: Float32Array;
	hover: boolean;
}

//const Loader = new GLTFFileLoader();

export class Gears {
	private meshes: AbstractMesh[];
	private sun!: DirectionalLight;
	private mat: PBRMaterial;
	private scene: Scene;
	private shadow!: CascadedShadowGenerator;

	private outer!: Mesh;
	private inner1!: Mesh;
	private inner2!: Mesh;
	private inner3!: Mesh;
	private outerBuffer!: Float32Array;
	private outerRotation!: Matrix[]; //float
	private outerMatrix!: Matrix[];
	private inner1Buffer!: Float32Array;
	private inner1Rotation!: Matrix[]; // vec3
	private inner1Matrix!: Matrix[];
	private inner2Buffer!: Float32Array;
	private inner2Rotation!: Matrix[];
	private inner2Matrix!: Matrix[];
	private inner3Buffer!: Float32Array;
	private inner3Rotation!: Matrix[];
	private inner3Matrix!: Matrix[];

	private sunBack!: DirectionalLight;

	private outerMatrixNoRoTY: Matrix[];
	private outerRotationNoY!: Matrix[]; //float


	private p!: Vector3;
	private numInstance: number;



	private ontop: boolean = false;

	private outerBounding!: Vector3[];

	constructor(scene: Scene) {
		this.meshes = [];
		this.scene = scene;

		this.mat = new PBRMaterial('mat', this.scene);
		this.mat.albedoColor = Color3.White();
		this.mat.metallic = 0;
		this.mat.roughness = 1;
		//this.mat.backFaceCulling = false;


		this.numInstance = 50;
		const num = 10;

		this.outerBuffer = new Float32Array(this.numInstance * 16);
		this.inner1Buffer = new Float32Array(this.numInstance * 16);
		this.inner2Buffer = new Float32Array(this.numInstance * 16);
		this.inner3Buffer = new Float32Array(this.numInstance * 16);
		this.outerRotation = [];
		this.inner1Rotation = [];
		this.inner2Rotation = [];
		this.inner3Rotation = [];
		this.outerMatrix = [];
		this.inner1Matrix = [];
		this.inner2Matrix = [];
		this.inner3Matrix = [];

		this.outerMatrixNoRoTY = [];
		this.outerRotationNoY = [];


	}

	public async load() {
		const loaded = await LoadAssetContainerAsync("/assets/gears.glb", this.scene);

		let rotation = Quaternion.FromEulerAngles(degToRad(21.44), degToRad(41.3), degToRad(-34));
		this.sun = new DirectionalLight('sun', new Vector3(0, -1, 0).applyRotationQuaternionInPlace(rotation), this.scene);
		this.sun.intensity = 5;

		rotation = Quaternion.FromEulerAngles(degToRad(21.44), degToRad(-34), degToRad(41.4));
		this.sunBack = new DirectionalLight('sunB', new Vector3(0, -1, 0).applyRotationQuaternionInPlace(rotation), this.scene);
		this.sunBack.intensity = 2;


		this.shadow = new CascadedShadowGenerator(2048, this.sun);

		this.shadow.numCascades = 4;
		this.shadow.shadowMaxZ = 200;
		this.shadow.lambda = 0;
		this.shadow.cascadeBlendPercentage = 0;


		this.shadow.setDarkness(0);
		//this.shadow.usePoissonSampling = true;
		this.shadow.bias = 0.003;
		//this.shadow.normalBias = 0.1;
		this.shadow.usePercentageCloserFiltering = true;
		this.shadow.filteringQuality = CascadedShadowGenerator.QUALITY_LOW;

		this.meshes = loaded.meshes;
		for (let i = 0; i < this.meshes.length; i++) {
			this.meshes[i].material = this.mat;
			if (this.meshes[i].name === 'outer') {
				this.outer = this.meshes[i] as Mesh;
			} else if (this.meshes[i].name === 'inner1') {
				this.inner1 = this.meshes[i] as Mesh;
			} else if (this.meshes[i].name === 'inner2') {
				this.inner2 = this.meshes[i] as Mesh;
			} else if (this.meshes[i].name === 'inner3') {
				this.inner3 = this.meshes[i] as Mesh;
			}
			if (this.meshes[i].name != "bigt" && this.meshes[i].name != "bigb") {
				this.meshes[i].receiveShadows = true;
				this.meshes[i].lightSources;
				this.shadow.getShadowMap()!.renderList?.push(this.meshes[i]);

			} else {
				this.sun.excludedMeshes.push(this.meshes[i]);
				this.sunBack.includedOnlyMeshes.push(this.meshes[i]);
				this.meshes[i].receiveShadows = true;
			}
		}


		this.outerBounding = [];
		const b = this.outer.getBoundingInfo().boundingBox.vectors;
		for (let i = 0; i < b.length; i++) {
			this.outerBounding.push(b[i].clone());
		}
		console.log(this.outerBounding);
		this.initInstance()
		loaded.addAllToScene();
		this.scene.setActiveCameraByName('home');
		//(this.scene.getCameraByName('menu') as Camera).maxZ = 200;
	}


	private initInstance() {
		let pos = 0;
		for (let i = 0; i < this.numInstance; i++) {
			const off = new Vector3(
				(Math.random() * 2 - 1) * 2,
				pos + 21, //(Math.random() * 0.3 + 0.7) * 30,
				(Math.random() * 2 - 1) * 2
			)

			pos = off.y;

			const matT = Matrix.Translation(off.x, off.y, off.z);
			const matS = Matrix.Identity(); //Matrix.Scaling(x, y, x);

			this.outerMatrix.push(Matrix.RotationY(Math.random() * 2 * Math.PI).multiply(matS.multiply(matT)));
			this.outerMatrixNoRoTY.push(Matrix.RotationY(Math.random() * 2 * Math.PI).multiply(matS.multiply(matT)));
			this.inner1Matrix.push(Matrix.RotationY(Math.random() * 2 * Math.PI).multiply(matS.multiply(matT)));
			this.inner3Matrix.push(Matrix.RotationY(Math.random() * 2 * Math.PI).multiply(matS.multiply(matT)));
			this.inner2Matrix.push(Matrix.RotationY(Math.random() * 2 * Math.PI).multiply(matS.multiply(matT)));

			const x = Math.max(0.0001, Math.random() * 0.002);
			const z = Math.max(0.0001, Math.random() * 0.002);
			this.outerRotation.push(
				Quaternion.FromEulerAngles(
					x,
					Math.max(-0.005, Math.random() * 0.01 - 0.005),
					z
				).toRotationMatrix(Matrix.Identity())
			)
			this.outerRotationNoY.push(
				Quaternion.FromEulerAngles(
					x,
					0,
					z
				).toRotationMatrix(Matrix.Identity())

			)

			this.inner1Rotation.push(
				Quaternion.FromEulerAngles(
					Math.max(0.01, Math.random() * 0.05),
					Math.max(0.01, Math.random() * 0.05),
					Math.max(0.01, Math.random() * 0.05)
				).toRotationMatrix(Matrix.Identity())
			)
			this.inner2Rotation.push(
				Quaternion.FromEulerAngles(
					Math.max(0.01, Math.random() * 0.05),
					Math.max(0.01, Math.random() * 0.05),
					Math.max(0.01, Math.random() * 0.05)
				).toRotationMatrix(Matrix.Identity())
			)
			this.inner3Rotation.push(
				Quaternion.FromEulerAngles(
					Math.max(0.01, Math.random() * 0.05),
					Math.max(0.01, Math.random() * 0.05),
					Math.max(0.01, Math.random() * 0.05)
				).toRotationMatrix(Matrix.Identity())
			)
			this.outerMatrix[i].toArray(this.outerBuffer, i * 16);
			this.inner1Matrix[i].toArray(this.inner1Buffer, i * 16);
			this.inner2Matrix[i].toArray(this.inner2Buffer, i * 16);
			this.inner3Matrix[i].toArray(this.inner3Buffer, i * 16);
		}
		this.outer.thinInstanceSetBuffer('matrix', this.outerBuffer);
		this.inner1.thinInstanceSetBuffer('matrix', this.inner1Buffer);
		this.inner2.thinInstanceSetBuffer('matrix', this.inner2Buffer);
		this.inner3.thinInstanceSetBuffer('matrix', this.inner3Buffer);
		this.p = this.outer.position.clone();

	}

	public update(deltaTime: number): void {
		for (let i = 0; i < this.outerMatrix.length; i++) {
			this.outerRotation[i].multiplyToRef(this.outerMatrix[i], this.outerMatrix[i]);
			this.outerRotationNoY[i].multiplyToRef(this.outerMatrixNoRoTY[i], this.outerMatrixNoRoTY[i]);
			this.outerMatrix[i].toArray(this.outerBuffer, i * 16);
			this.inner1Rotation[i].multiplyToRef(this.inner1Matrix[i], this.inner1Matrix[i]);
			this.inner1Matrix[i].toArray(this.inner1Buffer, i * 16);
			this.inner2Rotation[i].multiplyToRef(this.inner2Matrix[i], this.inner2Matrix[i]);
			this.inner2Matrix[i].toArray(this.inner2Buffer, i * 16);
			this.inner3Rotation[i].multiplyToRef(this.inner3Matrix[i], this.inner3Matrix[i]);
			this.inner3Matrix[i].toArray(this.inner3Buffer, i * 16);
		}
		this.outer.thinInstanceSetBuffer('matrix', this.outerBuffer);
		this.inner1.thinInstanceSetBuffer('matrix', this.inner1Buffer);
		this.inner2.thinInstanceSetBuffer('matrix', this.inner2Buffer);
		this.inner3.thinInstanceSetBuffer('matrix', this.inner3Buffer);


	}

	public setVue(vue: string): Vue {
		const final = new Vue();
		switch (vue) {
			case 'play': {
				final.init(this.scene.getCameraByName('menu') as Camera);
				final.addWindow('create', this.outer, this.outerBounding, this.outerMatrix[17]);
				final.addWindow('join', this.outer, this.outerBounding, this.outerMatrix[14]);
				break;
			}
			case 'home': {
				final.init(this.scene.getCameraByName('home') as Camera);
				final.addWindow('play', this.outer, this.outerBounding, this.outerMatrix[8]);
				final.addWindow('stats', this.outer, this.outerBounding, this.outerMatrix[9]);
				final.addWindow('info', this.outer, this.outerBounding, this.outerMatrix[7]);
				final.addWindow('/!\\TEST/!\\', this.outer, this.outerBounding, this.outerMatrix[6]);
				break;
			}
			case 'stats': {
				final.init(this.scene.getCameraByName('menu') as Camera);
				final.addWindow('pong', this.outer, this.outerBounding, this.outerMatrix[17]);
				final.addWindow('br', this.outer, this.outerBounding, this.outerMatrix[14]);
				break;
			}
			case 'login': {
				final.init(this.scene.getCameraByName('home') as Camera);
				final.addWindow('register', this.outer, this.outerBounding, this.outerMatrix[8]);
				break;
			}
			case 'register': {
				final.init(this.scene.getCameraByName('menu') as Camera);
				final.addWindow('login', this.outer, this.outerBounding, this.outerMatrix[16]);
				break;
			}
			case 'test': {
				final.init(this.scene.getCameraByName('br') as Camera);
				break;
			}

			case 'lobby': {
				final.init(this.scene.getCameraByName('home') as Camera);
				final.addWindow('BACK', this.outer, this.outerBounding, this.outerMatrix[8]);
				break;
			}
			case 'info': {
				final.init(this.scene.getCameraByName("menu") as Camera);
				final.addWindow('user', this.outer, this.outerBounding, this.outerMatrix[16]);
				final.addWindow('security', this.outer, this.outerBounding, this.outerMatrix[14]);
				break;
			}
		}
		return final;
	}

	public dispose() {
		for (let i = 0; i < this.meshes.length; i++) {
			this.meshes[i]?.dispose();
		}
		this.sun?.dispose();
		this.sunBack?.dispose();
		this.shadow?.dispose();
		this.mat?.dispose();
	}

}



function degToRad(angle: number): number {
	return (angle / 180) * Math.PI;
}
