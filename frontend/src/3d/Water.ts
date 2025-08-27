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
	RenderTargetTexture,
	ProceduralTexture,
	Engine,
	Vector2,
	UniversalCamera,
	ShaderMaterial
} from "@babylonImport";
import { UIaddNumber } from "./UtilsUI";

export class Water {
	private scene: Scene;
	private camera: Camera;
	// private causticCamera: UniversalCamera;

	// private lightMesh: Mesh;
	// private lightMaterial: ShaderMaterial;
	// private defaultMaterial: ShaderMaterial;
	//
	private waterMesh: Mesh;
	private waterMaterial: ShaderMaterial;



	private size = 40;
	private height = 40;

	//public rt: RenderTargetTexture;
	private rtSize = 256;

	private worldScale = 40;

	private sps: SolidParticleSystem;
	private particleNumber = 2000;
	private particleMesh: Mesh;
	private particleSize = 0.02;
	private particleMaterial: StandardMaterial;
	private particleRadius = 10;
	private particleDirection = new Vector3(0.5, -1, 0.1).normalize();
	private particleSpeed = 0.01;

	private waterRt1: ProceduralTexture;
	private waterRt2: ProceduralTexture;
	private waterRtDelta = 0.0039;
	private waterRt: boolean;
	private waterIntensity: number;

	private cursor: Vector3;

	private once = 1.;

	constructor(scene: Scene, camera: Camera, cursor: Vector3) {
		this.scene = scene;
		this.camera = camera;
		this.cursor = cursor;

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

		// this.waterRt1 = new ProceduralTexture("waterSurface1", 256, "waterSurface", this.scene, null, false, false, Engine.TEXTURETYPE_FLOAT);
		this.waterRt1 = new ProceduralTexture("waterSurface1", 256, "waterSurface", this.scene, null);
		this.waterRt2 = new ProceduralTexture("waterSurface2", 256, "waterSurface", this.scene, null);

		this.waterRt1.wrapR = 0;
		this.waterRt1.wrapU = 0;
		this.waterRt1.wrapV = 0;
		this.waterRt2.wrapR = 0;
		this.waterRt2.wrapU = 0;
		this.waterRt2.wrapV = 0;

		this.waterRt1.autoClear = false;
		this.waterRt2.autoClear = false;
		this.waterRt1.refreshRate = 1;
		this.waterRt2.refreshRate = 1;
		this.waterRt = false;
		UIaddNumber("water delta", this.waterRtDelta, (n: number) => { this.waterRtDelta = n })


		//this.causticCamera = new UniversalCamera("causticCamera", new Vector3(0, this.height + 20, 0), this.scene);
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
		// this.lightMesh = MeshBuilder.CreateGround("water", { width: this.size, height: this.size, subdivisions: 50 }, this.scene);
		// this.lightMesh.position.set(0, 0, 0);
		// this.lightMesh.material = new StandardMaterial("water", this.scene);
		// this.lightMesh.material.backFaceCulling = false;
		// (this.lightMesh.material as StandardMaterial).diffuseColor = Color3.Blue();
		// this.lightMesh.layerMask = 0x01000000;
		//

		this.waterMesh = MeshBuilder.CreateGround("water", { width: this.size, height: this.size, subdivisions: 100 }, this.scene);
		this.waterMesh.position.set(0, 20, 0);

		this.waterIntensity = 1.;
		UIaddNumber("water intensity", this.waterIntensity, (n: number) => {
			this.waterIntensity = n;
		})

		this.waterMaterial = new ShaderMaterial("water", this.scene, "waterCustom", {
			attributes: ["position", "normal"],
			uniforms: ["world", "viewProjection", "intensity"],
			samplers: ["heightMap"],
		})
		this.waterMaterial.backFaceCulling = false;
		this.waterMesh.material = this.waterMaterial;
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

	public update(time: number, deltaTime: number) {
		this.sps.setParticles();


		this.waterRt1.setFloat("time", time);
		this.waterRt1.setFloat("deltaTime", deltaTime);
		this.waterRt1.setFloat("delta", this.waterRtDelta);
		this.waterRt1.setVector3("cursor", this.cursor);
		this.waterRt1.setTexture("surface", this.waterRt2);
		this.waterRt1.setInt("start", this.once)

		this.waterRt2.setFloat("time", time);
		this.waterRt2.setFloat("deltaTime", deltaTime);
		this.waterRt2.setFloat("delta", this.waterRtDelta);
		this.waterRt2.setVector3("cursor", this.cursor);
		this.waterRt2.setTexture("surface", this.waterRt1);
		this.waterRt1.setInt("start", this.once)

		this.waterMaterial.setFloat("intensity", this.waterIntensity);
		this.waterMaterial.setTexture("heightMap", this.waterRt ? this.waterRt1 : this.waterRt2);

		// this.waterRt ? this.waterRt1.resetRefreshCounter() : this.waterRt2.resetRefreshCounter();
		this.waterRt = !this.waterRt;
		this.once = 0.;



		// this.defaultMaterial.setFloat("worldScale", this.worldScale);
	}
}
