import { Engine, Scene, Vector3, Vector2, Color3, MeshBuilder, StandardMaterial, Mesh, PolygonMeshBuilder, Observer, TransformNode, FreeCamera, PointLight, GlowLayer } from "../../babylon";
import { Ball } from "./Ball";
import { Player } from "./Player";
import { getRequest, patchRequest } from "../../networking/request";
import earcut from "earcut";
import GameUI from "../GameUI";
import { sceneManager } from "../../scene/SceneManager";

let resizeTimeout: number;
let engine: any;

export class BrickBreaker {
	private engine: Engine;
	private scene: Scene;
	private camera: FreeCamera;
	private canvas: HTMLCanvasElement;
	private bricks: Mesh[][];
	private player: Player;
	private ball: Ball;
	private arena: Mesh;
	private renderObserver: Observer<Scene> | null = null;
	private lastTime: number = 0;
	private cols: number;
	private layers: number;
	public root: TransformNode;
	private id: number = 0;
	private start1: boolean = true;
	public gameUI: GameUI;
	public score: number = 0;
	public pbEasy: number = 0;
	public pbNormal: number = 0;
	public pbHard: number = 0;
	public leaderEasy: any;
	public leaderNormal: any;
	public leaderHard: any;
	public mode: string = "normal";
	public newHighScore: boolean = false;
	public gl: GlowLayer;



	constructor(canvas: HTMLCanvasElement, scene: Scene, gameUI: GameUI) {
		this.canvas = canvas;
		this.scene = scene;
		this.gameUI = gameUI;
		this.engine = scene.getEngine() as Engine;
		this.root = sceneManager.assets.brickRoot;
		this.root.position.set(20, 50, 50);
		this.root.scaling.set(1, 1, 1);

		this.camera = sceneManager.camera;
		
		this.gl = new GlowLayer("glow", this.scene, { 
			mainTextureRatio: 0.5,
            blurKernelSize: 32
        });
		this.gl.intensity = 0.5;
		this.createArena();
		
		this.ball = new Ball(this.scene, this.root, this);
		this.player = new Player(this.scene, new Vector3(0, 0, 0), this);

		this.ball.updatePosition(0, 1);
		this.ball.setVelocity(new Vector3(0, 0, 0));
		this.lastTime = performance.now();

	}

	handlePb(json: any) {
		this.pbEasy = json.brickBreakerStats.easy_mode_hscore;
		this.pbNormal = json.brickBreakerStats.normal_mode_hscore;
		this.pbHard = json.brickBreakerStats.hard_mode_hscore;
	}

	public handleLeaderboard(json: any) {
		if (this.mode == 'easy')
			this.gameUI.setLeaderboard(json.leaderboards.easy, this.mode);
		else if (this.mode == 'normal')
			this.gameUI.setLeaderboard(json.leaderboards.normal, this.mode);
		else if (this.mode == 'hard')
			this.gameUI.setLeaderboard(json.leaderboards.hard, this.mode);
	}

	public async start(mode: string) {
		if (this.renderObserver) {
			console.warn("BrickBreaker is already running");
			return;
		}

		this.reset();
		this.mode = mode;
		const pb = await getRequest("stats/get/brickbreaker")
			.catch((err) => { console.log(err) });
		const leaderboard = await getRequest("stats/get/leaderboard/brickbreaker")
			.catch((err) => { console.log(err) });

		this.handlePb(pb);
		this.handleLeaderboard(leaderboard);

		if (mode === "easy") {
			this.layers = 2;
			this.cols = 3;
			this.gameUI.updateHighScore(this.pbEasy);
		} else if (mode === "normal") {
			this.layers = 4;
			this.cols = 4;
			this.gameUI.updateHighScore(this.pbNormal);
		} else if (mode === "hard") {
			this.layers = 6;
			this.cols = 5;
			this.gameUI.updateHighScore(this.pbHard);
		}
		this.ball.bricksLeft = this.layers * this.cols;
		this.bricks = this.generateBricks(10, this.layers, this.cols);

		this.camera.parent = this.root;
		this.camera.position.set(0, 30, 0);
		this.lastTime = performance.now();
		this.start1 = true;
		this.update();
		this.player.enableInput();

		console.log("BrickBreaker added to render loop");

	}

	public restart(): void {
		this.reset();
		sceneManager.canvas.focus();
		this.ball.bricksLeft = this.layers * this.cols;
		this.bricks = this.generateBricks(10, this.layers, this.cols);
	}

	public async end() {
		if (this.newHighScore) {
			await patchRequest("stats/update/brickbreaker", { mode: this.mode, score: this.score }, true);
		}
		const leaderboard = await getRequest("stats/get/leaderboard/brickbreaker")
			.catch((err) => { console.log(err) });
		this.handleLeaderboard(leaderboard);
		this.gameUI.hideScore();
		this.gameUI.showEnd("brick", this.newHighScore, this.score);
	}

	private update(): void {

		const currentTime = performance.now();
		const delta = (currentTime - this.lastTime) / 1000;
		this.lastTime = currentTime;

		this.player.update();
		this.ball.update(delta, this.player, this.cols, this.layers, this.bricks);

		this.id = requestAnimationFrame(() => this.update());
		if (!this.start1) {
			cancelAnimationFrame(this.id);
		}
	}

	public stop(): void {
		if (this.newHighScore) {
			patchRequest("stats/update/brickbreaker", { mode: this.mode, score: this.score }, true)
		}
		this.camera.parent = null;
		this.start1 = false;
		this.player.disableInput();
	}

	public reset(): void {
		if (this.bricks && this.bricks.length > 0) {
			this.bricks.forEach(layer => {
				layer.forEach(brick => {
					brick.setEnabled(false);
				});
			});
		}
		this.score = 0;
		this.gameUI.updateScore(0);
		this.gameUI.hideEnd();
		this.gameUI.showScore();
		this.newHighScore = false;
		this.ball.reset();
		this.player.reset();
		this.lastTime = performance.now();
	}

	private createArena() {
		this.arena = MeshBuilder.CreateDisc("arena", { radius: 5, tessellation: 128 }, this.scene);
		this.arena.parent = this.root;
		const mat = new StandardMaterial("arenaMat", this.scene);
		mat.emissiveColor.set(13 / 255 , 3 / 255, 32 / 255);
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
		mesh.material = mat;
		mesh.parent = this.root;
		mesh.position.y += 0.45;

		this.gl.addIncludedOnlyMesh(mesh);
		this.gl.addIncludedOnlyMesh(this.arena);
	}

	private generateBricks(radius: number, layers: number, cols: number): Mesh[][] {
		this.bricks = [];
		const arenaSubdv = cols * Math.ceil(128 / cols);
		const width = 0.4;
		const radian = 2 * Math.PI;

		const startHue = 278;
		const startSat = 1;
		const startVal = 0.5;

		const endHue = 278;
		const endSat = 0.33;
		const endVal = 1;

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
				mesh.parent = this.root;
				mesh.position.y += 0.4;
				const mat = new StandardMaterial("arenaMat", this.scene);

				const t = (j + 1) / layers;
				const hue = startHue + (endHue - startHue) * t;
				const saturation = startSat + (endSat - startSat) * t;
				const value = startVal + (endVal - startVal) * t;

				mat.emissiveColor = Color3.FromHSV(hue, saturation, value);
				this.gl.addIncludedOnlyMesh(mesh);
				mesh.material = mat;
				bricksCols.push(mesh);
			}
			this.bricks.push(bricksCols);
		}
		return this.bricks;
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
