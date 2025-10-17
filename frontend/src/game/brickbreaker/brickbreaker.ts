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


	public showTutorial() {
		const tutorialOverlay = document.createElement('div');
		tutorialOverlay.className = 'tutorial-overlay';
		
		tutorialOverlay.innerHTML = `
			<div class="tutorial-container">
				
				<button class="tutorial-close"
					onmouseover="this.style.background='#a855f7'; this.style.color='#000';" 
					onmouseout="this.style.background='transparent'; this.style.color='#a855f7';">&times;</button>
				
				<div class="tutorial-content">
					<h2 class="tutorial-title">How to Play</h2>
					
					<div id="tutorial-brick" class="tutorial-step">
						<div class="tutorial">
							<img class="tutorial-src" src="/assets/tuto.gif" alt="goal">
							<p class="tutorial-text">Break all the bricks by bouncing the ball with your shield and try to make the best score.</p>
						</div>
					</div>

					<div id="tutorial-move" class="tutorial-step">
						<div class="tutorial">
							<img class="tutorial-src" src="/assets/tuto-move-crop.gif" alt="Move player">
							<p class="tutorial-text">Use the mouse to move.</p>
						</div>
					</div>
					
					<div id="tutorial-shield" class="tutorial-step">
						<div class="tutorial">
							<img class="tutorial-src" src="/assets/tuto-shield-crop.gif" alt="Shield">
							<p class="tutorial-text">Press Space to activate your shield. The shield depletes while active and regenerates when released.</p>
						</div>
					</div>

					<div id="tutorial-points" class="tutorial-step">
						<div class="tutorial">
							<img class="tutorial-src" src="/assets/tuto-bricks-crop.gif" alt="Points">
							<p class="tutorial-text">Each layer is worth a different amount of points. The closer to the edge, the higher the score. Each consecutive hit increases the ball's speed, and faster balls award more points per brick destroyed.</p>
						</div>
					</div>

					<div id="tutorial-ball" class="tutorial-step">
						<div class="tutorial">
							<img class="tutorial-src" src="/assets/tuto-ball-crop.gif" alt="Speed">
							<p class="tutorial-text">Hit the ball with your shield to activate it and destroy bricks. The ball deactivates when hitting other surfaces. Any contact with the ball means game over.</p>
						</div>
					</div>
				</div>
			</div>
		`;
		
		document.body.appendChild(tutorialOverlay);
		
		const closeBtn = tutorialOverlay.querySelector('.tutorial-close');
		const startBtn = tutorialOverlay.querySelector('.tutorial-start');
		
		const closeTutorial = () => {
			tutorialOverlay.style.opacity = '0';
			setTimeout(() => tutorialOverlay.remove(), 300);
		};
		
		closeBtn?.addEventListener('click', closeTutorial);
		startBtn?.addEventListener('click', closeTutorial);
		tutorialOverlay.addEventListener('click', (e) => {
			if (e.target === tutorialOverlay) closeTutorial();
		});

		tutorialOverlay.style.opacity = '0';
		setTimeout(() => tutorialOverlay.style.transition = 'opacity 0.3s ease', 10);
		setTimeout(() => tutorialOverlay.style.opacity = '1', 20);
	}

}
