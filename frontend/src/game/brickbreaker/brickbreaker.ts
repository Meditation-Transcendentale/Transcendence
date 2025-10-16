import { Engine, Scene, Vector3, Vector2, Color3, MeshBuilder, StandardMaterial, Mesh, PolygonMeshBuilder, Observer, TransformNode, FreeCamera, PointLight, GlowLayer } from "../../babylon";
import { Ball } from "./Ball";
import { Player } from "./Player";
import { Arena } from "./Arena";
import { getRequest, patchRequest } from "../../networking/request";
import GameUI from "../GameUI";
import { sceneManager } from "../../scene/SceneManager";


export class BrickBreaker {
	private scene: Scene;
	private camera: FreeCamera;
	private bricks: Mesh[][];
	private player: Player;
	private ball: Ball;
	private arena: Arena;
	private renderObserver: Observer<Scene> | null = null;
	private lastTime: number = 0;
	private cols: number = 0;
	private layers: number = 0;
	private id: number = 0;
	private isStarted: boolean = true;


	public root: TransformNode;
	public gameUI: GameUI;
	public mode: string = "normal";
	
	
	public score: number = 0;
	public pbEasy: number = 0;
	public pbNormal: number = 0;
	public pbHard: number = 0;
	public newHighScore: boolean = false;

	public leaderEasy: any;
	public leaderNormal: any;
	public leaderHard: any;

	public gl: GlowLayer;



	constructor(canvas: HTMLCanvasElement, scene: Scene, gameUI: GameUI) {
		this.scene = scene;
		this.gameUI = gameUI;
		this.root = sceneManager.assets.brickRoot;
		this.root.position.set(20, 50, 50);
		this.root.scaling.set(1, 1, 1);

		this.camera = sceneManager.camera;
		
		this.gl = new GlowLayer("glow", this.scene, { 
			mainTextureRatio: 0.5,
            blurKernelSize: 32
        });
		this.gl.intensity = 0.5;
		this.arena = new Arena(this.scene, this.root, this);
		
		this.ball = new Ball(this.scene, this.root, this);
		this.player = new Player(this.scene, new Vector3(0, 0, 0), this);

		this.ball.updatePosition(0, 1);
		this.ball.setVelocity(new Vector3(0, 0, 0));
		this.lastTime = performance.now();

	}

	private handlePb(json: any) {
		this.pbEasy = json.brickBreakerStats.easy_mode_hscore;
		this.pbNormal = json.brickBreakerStats.normal_mode_hscore;
		this.pbHard = json.brickBreakerStats.hard_mode_hscore;
	}

	private handleLeaderboard(json: any) {
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
		this.bricks = this.arena.generateBricks(10, this.layers, this.cols);

		this.camera.parent = this.root;
		this.camera.position.set(0, 30, 0);
		this.lastTime = performance.now();
		this.isStarted = true;
		this.update();
		this.player.enableInput();

		console.log("BrickBreaker added to render loop");

	}

	private update(): void {
		
		const currentTime = performance.now();
		const delta = (currentTime - this.lastTime) / 1000;
		this.lastTime = currentTime;
		
		this.player.update();
		this.ball.update(delta, this.player, this.cols, this.layers, this.bricks);
		
		this.id = requestAnimationFrame(() => this.update());
		if (!this.isStarted) {
			cancelAnimationFrame(this.id);
		}
	}
	
	public restart(): void {
		this.reset();
		sceneManager.canvas.focus();
		this.ball.bricksLeft = this.layers * this.cols;
		this.bricks = this.arena.generateBricks(10, this.layers, this.cols);
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

	public stop(): void {
		if (this.newHighScore) {
			patchRequest("stats/update/brickbreaker", { mode: this.mode, score: this.score }, true)
		}
		this.camera.parent = null;
		this.isStarted = false;
		this.player.disableInput();
	}
}
