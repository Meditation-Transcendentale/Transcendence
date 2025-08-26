import {
	Camera,
	Mesh,
	MeshBuilder,
	Scene,
	StandardMaterial,
	Texture,
	SolidParticleSystem,
	SolidParticle,
	Vector3,
	RenderTargetTexture
} from "@babylonImport";
import { UIaddNumber } from "./UtilsUI";

export class Water {
	private scene: Scene;
	private camera: Camera;
	//private causticCamera: UniversalCamera;

	//private lightMesh: Mesh;
	//private lightMaterial: ShaderMaterial;
	//private defaultMaterial: ShaderMaterial;



	private size = 20;
	private height = 40;

	//public rt: RenderTargetTexture;
	private rtSize = 256;

	private worldScale = 40;

	private sps: SolidParticleSystem;
	private particleNumber = 1000;
	private particleMesh: Mesh;
	private particleSize = 0.02;
	private particleMaterial: StandardMaterial;
	private particleRadius = 20;
	private particleDirection = new Vector3(0.5, -1, 0.1).normalize();
	private particleSpeed = 0.01;

	constructor(scene: Scene, camera: Camera) {
		this.scene = scene;
		this.camera = camera;

		this.sps = new SolidParticleSystem("SPS", this.scene);
		this.sps.billboard = true;
		this.particleMesh = MeshBuilder.CreatePlane("particle", { size: this.particleSize });
		this.particleMaterial = new StandardMaterial("particle", this.scene);
		//this.particleMaterial.diffuseTexture = new Texture("/assets/smoke.png");
		//this.particleMaterial.useAlphaFromDiffuseTexture = true;

		this.sps.addShape(this.particleMesh, this.particleNumber);
		this.particleMesh.dispose();
		this.particleMesh = this.sps.buildMesh();
		this.particleMesh.material = this.particleMaterial;
		//this.particleMaterial.diffuseTexture.hasAlpha = true;

		this.sps.initParticles = () => {
			for (let i = 0; i < this.particleNumber; i++) {
				this.emitParticle(this.sps.particles[i], 1);
			}
		}

		this.sps.initParticles();
		this.sps.setParticles();
		this.sps.isAlwaysVisible = true;

		this.sps.updateParticle = (particle: SolidParticle) => {
			if (particle.position.y < 0) {
				this.emitParticle(particle, 0);
			}
			particle.position.addInPlace(particle.velocity);
			return particle;
		}

		UIaddNumber("particle speed", this.particleSpeed, (speed: number) => {
			this.particleSpeed = speed;
		})

		//this.causticCamera = new UniversalCamera("causticCamera", new Vector3(0, this.height + 10, 0), this.scene);
		//this.causticCamera.setTarget(new Vector3(0, 0, 0));
		//this.causticCamera.layerMask = 0x0000ffff;
		//this.causticCamera.mode = Camera.ORTHOGRAPHIC_CAMERA;
		//this.causticCamera.orthoTop = this.worldScale * 0.5;
		//this.causticCamera.orthoBottom = -this.worldScale * 0.5;
		//this.causticCamera.orthoRight = this.worldScale * 0.5;
		//this.causticCamera.orthoLeft = -this.worldScale * 0.5;
		//
		//this.rt = new RenderTargetTexture("caustic", { width: this.rtSize, height: this.rtSize }, this.scene);
		////console.log("GRASS RT SIZE", this.rt.getSize());
		//this.rt.activeCamera = this.causticCamera;
		//this.rt.skipInitialClear = true;
		//this.rt.refreshRate = 1;
		//this.rt.hasAlpha = true;
		//this.scene.customRenderTargets.push(this.rt);
		//
		//this.defaultMaterial = new ShaderMaterial("geometry", this.scene, "geometry", {
		//	uniforms: ["world", "view", "projection", "worldScale"],
		//	attributes: ["position"],
		//	needAlphaTesting: false,
		//	needAlphaBlending: false
		//
		//});
		//
		//this.lightMesh = MeshBuilder.CreateGround("water", { width: this.size, height: this.size, subdivisions: 50 }, this.scene);
		//this.lightMesh.position.set(0, 0, 0);
		//this.lightMesh.material = new StandardMaterial("water", this.scene);
		//this.lightMesh.material.backFaceCulling = false;
		//(this.lightMesh.material as StandardMaterial).diffuseColor = Color3.Blue();
		//this.lightMesh.layerMask = 0x01000000;
		//

	}

	private emitParticle(particle: SolidParticle, start: number) {
		particle.position.set(
			Math.random() * this.particleRadius * 2 - this.particleRadius,
			10 - Math.random() * 10 * start,
			Math.random() * this.particleRadius * 2 - this.particleRadius
		)
		const speedX = Math.random() * 0.8 + 0.2;
		const speedY = Math.random() * 0.8 + 0.2;
		const speedZ = Math.random() * 0.8 + 0.2;
		particle.velocity.copyFrom(this.particleDirection)
		particle.velocity.x *= (Math.random() * 1.25 - .25) * this.particleSpeed;
		particle.velocity.y *= (Math.random() * 0.8 + 0.2) * this.particleSpeed;
		particle.velocity.z *= (Math.random() * 1.25 - 0.25) * this.particleSpeed;
	}

	public setMaterial() {
		//this.rt.setMaterialForRendering(this.rt.renderList as AbstractMesh[], this.defaultMaterial);
	}

	public update() {
		this.sps.setParticles();
		//this.defaultMaterial.setFloat("worldScale", this.worldScale);
	}
}
