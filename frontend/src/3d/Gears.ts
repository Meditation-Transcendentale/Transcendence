import { AbstractMesh, BoundingBox, Camera, CascadedShadowGenerator, Color3, DirectionalLight, GlowLayer, LoadAssetContainerAsync, Matrix, Mesh, PBRMaterial, Quaternion, Scene, ShadowGenerator, Vector3 } from "@babylonjs/core";
import { homeVue, playVue } from "../Vue";


interface cssElem {
	div: HTMLDivElement;
	bounding: Vector3[];
	header: HTMLDivElement;
	pos: Float32Array;
	hover: boolean;
}

export class Gears {
	private meshes: AbstractMesh[];
	private sun: DirectionalLight;
	private mat: PBRMaterial;
	private scene: Scene;
	private shadow: CascadedShadowGenerator;

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


		//this.play = this.initCssElem('play');
		//this.playCreate = this.initCssElem('play-create', 'menu');
		//this.playJoin = this.initCssElem('play-join', 'menu');
		//this.playLobby = this.initCssElem('play-lobby', 'menu');
		//
		//this.playJoin.div.remove();
		//this.playCreate.div.remove();
		//this.playLobby.div.remove();
		//
		//this.play.div.addEventListener('click', () => {
		//})
		//
		//window.addEventListener('keydown', (e) => {
		//	if (e.key == 'Escape') {
		//		this.playJoin.div.remove();
		//		this.playCreate.div.remove();
		//		this.playLobby.div.remove();
		//
		//		this.playJoin.hover = false;
		//		this.playCreate.hover = false;
		//		this.playLobby.hover = false;
		//
		//		this.scene.setActiveCameraByName('home');
		//		document.body.appendChild(this.play.div);
		//	}
		//})
	}

	private initCssElem(name: string, headerClass: string = ''): cssElem {
		const final: cssElem = {
			div: document.querySelector(`#${name}-window`) as HTMLDivElement,
			header: document.querySelector(`#${name}-window`)?.querySelector('.header')?.cloneNode(true) as HTMLDivElement,
			bounding: [],
			pos: new Float32Array(4),
			hover: false
		}
		final.header.className = `header ${headerClass} glitch`;
		final.div.addEventListener('mouseover', () => {
			final.hover = true;
			this.onHover(final);
		})

		return final;

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
		this.shadow.filteringQuality = ShadowGenerator.QUALITY_LOW;

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


		//this.initBounding();

		this.outerBounding = [];
		const b = this.outer.getBoundingInfo().boundingBox.vectors;
		for (let i = 0; i < b.length; i++) {
			this.outerBounding.push(b[i].clone());
		}
		console.log(this.outerBounding);
		this.initInstance()
		loaded.addAllToScene();
		this.scene.setActiveCameraByName('home');
	}

	private initBounding() {
		//this.outer.getBoundingInfo().boundingBox.vectors.forEach((v: any) => {
		//	this.play.bounding.push(new Vector3(v._x, v._y, v._z));
		//	this.playCreate.bounding.push(new Vector3(v._x, v._y, v._z));
		//	this.playJoin.bounding.push(new Vector3(v._x, v._y, v._z));
		//	this.playLobby.bounding.push(new Vector3(v._x, v._y, v._z));
		//});

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
			//this.inner1Matrix.push(Matrix.RotationY((Math.random() * 2 - 1) * 2 * Math.PI).multiply(matT));
			this.inner1Matrix.push(Matrix.RotationY(Math.random() * 2 * Math.PI).multiply(matS.multiply(matT)));
			this.inner3Matrix.push(Matrix.RotationY(Math.random() * 2 * Math.PI).multiply(matS.multiply(matT)));
			this.inner2Matrix.push(Matrix.RotationY(Math.random() * 2 * Math.PI).multiply(matS.multiply(matT)));

			//this.outerRotation.push(Matrix.RotationY(Math.max(0.01, Math.random() * 0.02 * Math.PI)));
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
		//this.outer.rotateAround(this.p.add(new Vector3(1.1, 0, 1.1)), Vector3.Up(), 0.01)
		this.outer.thinInstanceSetBuffer('matrix', this.outerBuffer);
		this.inner1.thinInstanceSetBuffer('matrix', this.inner1Buffer);
		//this.inner1.rotateAround(this.p.add(new Vector3(1.1, 0, 1.1)), Vector3.Up(), 0.01)
		this.inner2.thinInstanceSetBuffer('matrix', this.inner2Buffer);
		//this.inner2.rotateAround(this.p.add(new Vector3(1.1, 0, 1.1)), Vector3.Up(), 0.01)
		this.inner3.thinInstanceSetBuffer('matrix', this.inner3Buffer);
		//this.inner3.rotateAround(this.p.add(new Vector3(1.1, 0, 1.1)), Vector3.Up(), 0.01)
		//console.log(this.outerMatrix[8]);


	}

	public updateCSS(u: boolean) {
		//this.updateCssElem(this.play, 8);
		//this.updateCssElem(this.playCreate, 17);
		//this.updateCssElem(this.playJoin, 14);
		//this.updateCssElem(this.playLobby, 10);
	}

	private updateCssElem(e: cssElem, i: number) {
		const model = this.outerMatrix[i].multiply(this.outer.worldMatrixFromCache);
		const scene = this.scene.getTransformMatrix();
		const viewport = this.scene.activeCamera!.viewport;


		e.pos[0] = 2;
		e.pos[1] = 2;
		e.pos[2] = -1;
		e.pos[3] = -1;
		for (let i = 0; i < e.bounding.length; i++) {
			const p = Vector3.Project(
				e.bounding[i],
				model,
				scene,
				viewport
			);
			e.pos[0] = Math.min(e.pos[0], p.x);
			e.pos[1] = Math.min(e.pos[1], p.y);
			e.pos[2] = Math.max(e.pos[2], p.x);
			e.pos[3] = Math.max(e.pos[3], p.y);
		}
		e.div.style.top = `${e.pos[1] * 100 + (true ? Math.random() * 2 : 0)}%`;
		e.div.style.left = `${e.pos[0] * 100 + (true ? Math.random() * 0.5 : 0)}%`;
		e.div.style.width = `${(e.pos[2] - e.pos[0]) * 100 + (true ? Math.random() * 0.5 : 0)}%`;
		e.div.style.height = `${(e.pos[3] - e.pos[1]) * 100 + (true ? Math.random() * 0.5 : 0)}%`;

	}

	private onHover(el: cssElem) {
		const fn = () => {
			if (!hover || inn > 40 || !el.hover) { return; }
			const style = window.getComputedStyle(el.div);
			const e = el.header.cloneNode(true) as HTMLDivElement;

			const winH = parseInt(style.height);
			const winW = parseInt(style.width);
			const winT = parseInt(style.top);
			const winL = parseInt(style.left);

			const height = Math.max(30, (Math.random() * 0.5 + 0.5) * 0.15 * winH);
			const offsetX = (Math.random() - 0.3) * winW;
			const offsetY = (Math.random() * 1.1 - 0.1) * winH;
			const padding = (Math.random() * 0.3 + 0.2) * height * 2;

			let top = Math.max(winT + offsetY, 0);
			top = top > window.innerHeight ? window.innerHeight - height : top;
			let left = Math.max(winL + offsetX - padding * 0.5, 0);
			left = left > window.innerWidth ? winL : left;
			e.classList.add(`gl${g % 4}`);

			e.style.position = 'absolute';
			e.style.top = `${top}px`;
			e.style.left = `${left}px`;
			e.style.paddingLeft = `${padding * 0.2}px`;
			e.style.paddingRight = `${padding * 0.8}px`;

			e.style.height = `${height}px`;
			e.style.fontSize = `${height}px`;

			document.body.appendChild(e);
			inn++;
			g++;
			setTimeout(() => { inn--; e.remove(); }, 400);
			setTimeout(() => { fn() }, 10);
		}

		let inn = 1;
		let g = 0;
		let hover = true;
		el.div.addEventListener('mouseleave', () => { hover = false; el.hover = false; }, { once: true });
		fn();

	}

	public loadVue(vue: string) {
		switch (vue) {
			case 'play': {
				playVue.enable();
				break;
			}
			case 'home': {
				homeVue.enable();
				break;
			}
		}
	}

	public unloadVue(vue: string) {
		switch (vue) {
			case 'play': {
				playVue.disable();
				break;
			}
			case 'home': {
				homeVue.disable();
				break;
			}
		}

	}

	public setVue(vue: string) {
		switch (vue) {
			case 'play': {
				playVue.init(this.scene.getCameraByName('menu') as Camera);
				playVue.addWindow('create', this.outer, this.outerBounding, this.outerMatrix[17]);
				playVue.addWindow('join', this.outer, this.outerBounding, this.outerMatrix[14]);
				//playVue.addWindow('lobby', this.outer, this.outerBounding, this.outerMatrix[10]);
				break;
			}
			case 'home': {
				homeVue.init(this.scene.getCameraByName('home') as Camera);
				homeVue.addWindow('play', this.outer, this.outerBounding, this.outerMatrix[8]);
				break;
			}
		}
	}

	public dispose() {
		for (let i = 0; i < this.meshes.length; i++) {
			this.meshes[i].dispose();
		}
		this.sun.dispose();
		this.sunBack.dispose();
		this.shadow.dispose();
		this.mat.dispose();
	}

}



function degToRad(angle: number): number {
	return (angle / 180) * Math.PI;
}
