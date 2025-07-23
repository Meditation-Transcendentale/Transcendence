import { Engine, Scene, Vector3, Vector2, ArcRotateCamera, HemisphericLight, MeshBuilder, StandardMaterial, Mesh, PolygonMeshBuilder, Color4 } from "@babylonImport";
import { Ball } from "./Ball";
import { Player } from "./Player";
import earcut from "earcut";

let resizeTimeout: number;
let engine: any;

export class BrickBreaker {
	private engine: Engine;
	private scene: Scene;
	private camera: ArcRotateCamera;
	private canvas: HTMLCanvasElement;
	private bricks: Mesh[][];
	private player: Player;
	private ball: Ball;
	private arena: Mesh;
	private light: HemisphericLight;

	constructor(canvas: HTMLCanvasElement, scene: Scene) {
		this.canvas = canvas;
		this.scene = scene;
		this.engine = scene.getEngine() as Engine;


		this.setupCamera();
		this.setupLight();
		this.createArena();

		// const layers = Math.ceil((Math.random() * 5) + 1);
		const layers = 2;
		const cols = Math.ceil((Math.random() * 5) + 1);
		const bricks = this.generateBricks(10, layers, cols);

		const ballMaterial = new StandardMaterial("ballMaterial", this.scene);
		ballMaterial.diffuseColor.set(1, 0, 0);
		this.ball = new Ball(this.scene, ballMaterial);
		this.player = new Player(this.scene, new Vector3(0, 0, 0), this);

		this.ball.updatePosition(0, 1);
		this.ball.setVelocity(new Vector3(0, 0, 0));
		let lastTime = performance.now();

		this.engine.runRenderLoop(() => {
			this.resizeGame();
			const currentTime = performance.now();
			const delta = (currentTime - lastTime) / 1000;
			lastTime = currentTime;

			this.player.update();
			this.ball.update(delta, this.player, cols, layers, bricks);

			this.scene.render();
		});
	}

	private setupCamera() {
		// this.camera = new ArcRotateCamera("camera", Math.PI / 2, 0, 10, Vector3.Zero(), this.scene);
		// this.camera.attachControl(this.canvas, true);
		// this.camera.mode = ArcRotateCamera.ORTHOGRAPHIC_CAMERA;
		// this.camera.orthoLeft = -16;
		// this.camera.orthoRight = 16;
		// this.camera.orthoTop = 9;
		// this.camera.orthoBottom = -9;
		this.camera = new ArcRotateCamera("camera", Math.PI / 2, 0, 30, Vector3.Zero(), this.scene);
		this.camera.attachControl(this.canvas, true);
	}

	private setupLight() {
		this.light = new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);
	}

	private createArena() {
		this.arena = MeshBuilder.CreateDisc("arena", { radius: 5, tessellation: 128 }, this.scene);
		const mat = new StandardMaterial("arenaMat", this.scene);
		mat.diffuseColor.set(0.75, 0.75, 0.75);
		mat.emissiveColor.set(0.75, 0.75, 0.75);
		mat.disableLighting = true;
		this.arena.material = mat;
		this.arena.rotation.x = Math.PI / 2;
		const radian = 2 * Math.PI;

		let points: Vector2[] = [];
		for (let k = 128; k >= 0; --k) {
			let point = new Vector2(Math.cos(radian * k / 128) * 10, Math.sin(radian * k / 128) * 10);
			points.push(point);
		}
		for (let k = 0; k <= 128; ++k) {
			let point = new Vector2(Math.cos(radian * k / 128) * 10.5, Math.sin(radian * k / 128) * 10.5);
			points.push(point);
		}
		const builder = new PolygonMeshBuilder("brick", points, this.scene, earcut);
		const mesh = builder.build(true, 0.5);
		mesh.position.y += 0.45;
	}

	private generateBricks(radius: number, layers: number, cols: number): Mesh[][] {
		this.bricks = [];
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
			this.bricks.push(bricksCols);
		}
		return this.bricks;
	}

	public dispose() {
		this.ball.ball.dispose();
		this.player.goal.dispose();
		this.player.shield.dispose();
		this.player.pointerSurface.dispose();
		this.arena.dispose();

		this.bricks.forEach(brickCol => {
			brickCol.forEach(brick => {
				brick.dispose();
			});
		});

		this.camera.dispose();
		this.light.dispose();
		this.engine.clear(new Color4(1, 1, 1, 1), true, true);
		this.engine.stopRenderLoop();

		this.scene?.dispose();
		this.engine?.dispose();

		clearTimeout(resizeTimeout);
		this.engine.dispose();
		// Router.nav(`/play`, false, false);
	}

	private resizeGame() {
		window.addEventListener("resize", () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				if (engine)
					engine.resize();
			}, 100);
		});
	}
}

//const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
//new Game(canvas);
