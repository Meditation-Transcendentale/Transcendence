import { Engine, Scene, Vector3, Vector2, ArcRotateCamera, HemisphericLight, MeshBuilder, StandardMaterial, Effect, Mesh, PolygonMeshBuilder } from "@babylonjs/core";
import { Ball } from "./Ball";
import { Player } from "./Player";
import earcut from "earcut";

class Game {
	private engine: Engine;
	private scene: Scene;
	private camera: ArcRotateCamera;
	private canvas: HTMLCanvasElement;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.engine = new Engine(canvas, true);
		this.scene = new Scene(this.engine);

		this.setupCamera();
		this.setupLight();
		this.createArena();
		const bricks = this.generateBricks(10, 3, 3);

		const ballMaterial = new StandardMaterial("ballMaterial", this.scene);
		ballMaterial.diffuseColor.set(1, 0, 0);
		let ball = new Ball(this.scene, ballMaterial);
		const player = new Player(this.scene, new Vector3(0, 0, 0)); // assure-toi que Player est instanciable comme ça

		ball.updatePosition(1, 1, 1, 0);

		let lastTime = performance.now();

		this.engine.runRenderLoop(() => {
			const currentTime = performance.now();
			const delta = (currentTime - lastTime) / 1000;
			lastTime = currentTime;

			player.update();
			ball.update(delta, player, 3, 3, bricks);

			this.scene.render();
		});
	}

	private setupCamera() {
		this.camera = new ArcRotateCamera("camera", Math.PI / 2, 0, 10, Vector3.Zero(), this.scene);
		this.camera.attachControl(this.canvas, true);
		this.camera.mode = ArcRotateCamera.ORTHOGRAPHIC_CAMERA;
		this.camera.orthoLeft = -16;
		this.camera.orthoRight = 16;
		this.camera.orthoTop = 9;
		this.camera.orthoBottom = -9;
	}

	private setupLight() {
		new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);
	}

	private createArena() {
		const arena = MeshBuilder.CreateDisc("arena", { radius: 10, tessellation: 128 }, this.scene);
		const mat = new StandardMaterial("arenaMat", this.scene);
		mat.diffuseColor.set(0.75, 0.75, 0.75);
		mat.emissiveColor.set(0.75, 0.75, 0.75);
		mat.disableLighting = true;
		arena.material = mat;
		arena.rotation.x = Math.PI / 2;
	}

	private generateBricks(radius: number, layers: number, cols: number): Mesh[][] {
		let bricks = [];
		const arenaSubdv = cols * Math.ceil(128 / cols);
		const width = 0.4;
		const radian = 2 * Math.PI;

		for (let i = 0; i < cols; ++i) {
			let bricksCols = [];
			for (let j = 0; j < layers; ++j) {
				const radOut = radius - (width * j * 2) - width;
				const radIn = radius - (width * (j + 1) * 2);
				let points: Vector2[] = [];
				let vert;

				for (let k = (arenaSubdv / cols) - 1; k >= 0; --k) {
					vert = k + (arenaSubdv / cols) * i;
					let point = new Vector2(Math.cos(radian * vert / arenaSubdv) * radIn, Math.sin(radian * vert / arenaSubdv) * radIn);
					points.push(point);
				}
				for (let k = 0; k < arenaSubdv / cols; ++k) {
					vert = k + (arenaSubdv / cols) * i;
					let point = new Vector2(Math.cos(radian * vert / arenaSubdv) * radOut, Math.sin(radian * vert / arenaSubdv) * radOut);
					points.push(point);
				}

				const builder = new PolygonMeshBuilder("brick", points, this.scene, earcut);
				const mesh = builder.build(true, width);
				mesh.position.y += 0.4;
				bricksCols.push(mesh);
			}
			bricks.push(bricksCols);
		}
		return bricks;
	}
}

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
new Game(canvas);
