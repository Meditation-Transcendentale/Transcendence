import { ECSManager } from "./ecs/ECSManager.js";
import { StateManager } from "./state/StateManager.js";
import { MovementSystem } from "./systems/MovementSystem.js";
import { InputSystem } from "./systems/InputSystem.js";
import { NetworkingSystem } from "./systems/NetworkingSystem.js";
import { ThinInstanceSystem } from "./systems/ThinInstanceSystem.js";
import { WebSocketManager } from "./network/WebSocketManager.js";
import { InputManager } from "./input/InputManager.js";
import { ThinInstanceManager } from "./rendering/ThinInstanceManager.js";
import { createBaseMeshes } from "./utils/initializeGame.js";
import { decodeServerMessage, encodeClientMessage } from './utils/proto/helper.js';
import type { userinterface } from './utils/proto/message.js';
import { buildPaddles, PaddleBundle } from "./templates/builder.js";
import { createGameTemplate } from "./templates/builder.js";
import { AnimationSystem } from "./systems/AnimationSystem.js";
import { ArcRotateCamera, Color3, Color4, PointLight, Scene, TransformNode, Vector3, Engine } from "@babylonImport";

export let localPaddleId: any = null;
export class PongBR {
	private scene!: Scene;
	private ecs!: ECSManager;
	public stateManager!: StateManager;
	private wsManager!: WebSocketManager;
	private inputManager!: InputManager;
	private camera!: ArcRotateCamera;
	private canvas;
	private scoreUI: any;
	private baseMeshes: any;
	private instanceManagers: any;
	private uuid!: string;
	private paddleBundles!: PaddleBundle[];
	private pongRoot!: TransformNode;
	private inited: boolean;
	private networkingSystem!: NetworkingSystem;
	private inputSystem!: InputSystem;

	constructor(canvas: any, scene: Scene) {
		this.canvas = canvas;
		this.scene = scene;
		this.inited = false;
	}

	public async init() {
		console.log("INIT");
		window.addEventListener("keydown", (e) => {
			if (e.key.toLowerCase() === "t") {
				const raw = prompt("Next round player count?");
				const next = raw ? parseInt(raw, 10) : NaN;
				if (!isNaN(next)) {
					this.baseMeshes.paddle.material.setUniform("playerCount", next);
					this.transitionToRound(next);
				}
			}
		});
		this.pongRoot = new TransformNode("pongbrRoot", this.scene);
		this.pongRoot.position.set(-2200, -3500, -3500);
		const light = new PointLight('lightBr', new Vector3(-300, 25, 0), this.scene)
		light.parent = this.pongRoot;
		const light2 = new PointLight('lightBr2', new Vector3(+300, 25, 0), this.scene)
		light2.parent = this.pongRoot;
		const light4 = new PointLight('lightBr4', new Vector3(0, 25, -300), this.scene)
		light4.parent = this.pongRoot;
		const light3 = new PointLight('lightBr3', new Vector3(0, 25, 300), this.scene)
		light3.parent = this.pongRoot;
		this.pongRoot.rotation.z -= 30.9000;
		this.pongRoot.scaling.set(1, 1, 1);
		this.camera = this.scene.getCameraByName('br') as ArcRotateCamera;
		this.camera.parent = this.pongRoot;
		this.camera.minZ = 0.2;
		this.baseMeshes = createBaseMeshes(this.scene, this.pongRoot);
		this.instanceManagers = this.createInstanceManagers(this.baseMeshes);


		this.scene.clearColor = new Color4(0, 0, 0, 1);
		this.scene.ambientColor = Color3.White();




		this.inputManager = new InputManager();

		localPaddleId = 0;
		this.initECS(this.instanceManagers, this.pongRoot);

		this.stateManager = new StateManager(this.ecs);
		this.baseMeshes.portal.material.setFloat("time", performance.now() * 0.001);
		this.inited = true;


	}
	public async start(gameId: string, uuid: string) {
		if (!this.inited) {
			await this.init();
		}
		if (this.wsManager) {
			this.wsManager.socket.close();
			this.ecs.removeSystem(this.inputSystem);
			this.ecs.removeSystem(this.networkingSystem);
		}
		const wsUrl = `ws://${window.location.hostname}:5004?` +
			`uuid=${uuid}&` +
			`gameId=${encodeURIComponent(gameId)}`;
		this.wsManager = new WebSocketManager(wsUrl);

		localPaddleId = await this.waitForRegistration();

		this.inputSystem = new InputSystem(this.inputManager, this.wsManager);
		this.ecs.addSystem(this.inputSystem);
		this.networkingSystem = new NetworkingSystem(
			this.wsManager,
			this.uuid,
			this.scoreUI
		);
		this.ecs.addSystem(this.networkingSystem);
		console.log("start");
		this.pongRoot.setEnabled(true);
		this.stateManager.setter(true);
		this.stateManager.update();
		this.camera.attachControl(this.canvas);

		this.scene.onBeforeRenderObservable.add(() => {
			this.baseMeshes.portal.material.setFloat("time", performance.now() * 0.001);
		});

	}
	public stop(): void {

		this.camera.detachControl();
		this.pongRoot.setEnabled(false);
		this.stateManager.setter(false);

		console.log("game paused");
	}

	private createInstanceManagers(baseMeshes: any) {
		return {
			ball: new ThinInstanceManager(baseMeshes.ball, 200, 50, 100),
			paddle: new ThinInstanceManager(baseMeshes.paddle, 100, 50, 100),
			wall: new ThinInstanceManager(baseMeshes.wall, 100, 50, 100),
			portal: new ThinInstanceManager(baseMeshes.portal, 4, 50, 100),
			pillar: new ThinInstanceManager(baseMeshes.pillar, /* capacity */ 200, 50, 100),
			goal: new ThinInstanceManager(baseMeshes.goal,   /* capacity */ 100, 50, 100),
		}
	}

	private initECS(instanceManagers: any, pongRoot: TransformNode) {
		this.ecs = new ECSManager();
		this.ecs.addSystem(new MovementSystem());
		this.ecs.addSystem(new AnimationSystem());
		this.ecs.addSystem(new ThinInstanceSystem(
			instanceManagers.ball,
			instanceManagers.paddle,
			instanceManagers.wall,
			instanceManagers.portal,
			instanceManagers.goal,
			instanceManagers.pillar,
			this.camera
		));
		// this.ecs.addSystem(new VisualEffectSystem(this.scene));
		//this.ecs.addSystem(new UISystem());
		this.paddleBundles = createGameTemplate(this.ecs, 100, pongRoot);
	}

	async transitionToRound(nextCount: number) {
		// reuse the same config you used at startup
		const cfg = { arenaRadius: 100, wallWidth: 1, paddleHeight: 1, paddleDepth: 1, goalDepth: 1 };
		const targets: PaddleBundle[] = buildPaddles(this.ecs, nextCount, this.pongRoot);

		// survivors & eliminated logic as before…
		const survivors = this.paddleBundles.filter(b => b.sliceIndex < nextCount);
		const eliminated = this.paddleBundles.filter(b => b.sliceIndex >= nextCount);
		// Animate survivors, now including pillars:
		// survivors.forEach((bundle, i) => {
		// 	const T = targets[i];
		// 	console.log("Round target for index", i, "→", T);
		//
		// 	const tween = (
		// 		ent: Entity,
		// 		prop: "position" | "scale" | "rotation",
		// 		from: Vector3,
		// 		to?: Vector3,
		// 		duration = 1.2
		// 	) => {
		// 		if (!to) {
		// 			console.warn(`Missing target for ${prop} on`, ent);
		// 			return;
		// 		}
		// 		ent.addComponent(new AnimationComponent(
		// 			duration,
		// 			prop,
		// 			from.clone(),
		// 			to.clone(),
		// 			Easing.easeInOutCubic
		// 		));
		// 	};
		//
		// 	const pTx = bundle.paddle.getComponent(TransformComponent)!;
		// 	tween(bundle.paddle, "position", pTx.position, T.paddle.pos);
		// 	tween(bundle.paddle, "scale", pTx.scale, T.paddle.scale);
		//
		// 	const gTx = bundle.goal.getComponent(TransformComponent)!;
		// 	tween(bundle.goal, "position", gTx.position, T.goal.pos);
		// 	tween(bundle.goal, "scale", gTx.scale, T.goal.scale);
		//
		// 	const dTx = bundle.deathWall.getComponent(TransformComponent)!;
		// 	tween(bundle.deathWall, "position", dTx.position, T.deathWall.pos);
		// 	tween(bundle.deathWall, "scale", dTx.scale, T.deathWall.scale);
		//
		// 	bundle.pillars.forEach((pillarEnt, j) => {
		// 		const PT = T.pillars[j];
		// 		const pillTx = pillarEnt.getComponent(TransformComponent)!;
		// 		tween(pillarEnt, "position", pillTx.position, PT?.pos);
		// 		tween(pillarEnt, "rotation", pillTx.rotation, PT?.rot);
		// 		tween(pillarEnt, "scale", pillTx.scale, PT?.scale);
		// 	});
		// });		// 4) Animate eliminated → shrink away
		// eliminated.forEach(bundle => {
		// 	const p = bundle.paddle.getComponent(TransformComponent)!;
		// 	bundle.paddle.addComponent(new AnimationComponent(
		// 		2, "scale", p.scale.clone(), Vector3.Zero(), Easing.easeInOutQuad
		// 	));
		// 	const g = bundle.goal.getComponent(TransformComponent)!;
		// 	bundle.goal.addComponent(new AnimationComponent(
		// 		2, "scale", g.scale.clone(), Vector3.Zero(), Easing.easeInOutQuad
		// 	));
		// });
		//
		// await new Promise<void>(res => {
		// 	const check = () => {
		// 		if (this.ecs.entitiesWith(AnimationComponent).length === 0)
		// 			return res();
		// 		requestAnimationFrame(check);
		// 	};
		// 	requestAnimationFrame(check);
		// });

		eliminated.forEach(b => {
			this.ecs.removeEntity(b.paddle);
			this.ecs.removeEntity(b.goal);
			this.ecs.removeEntity(b.deathWall);
			this.ecs.removeEntity(b.pillar);
		});
		survivors.forEach(b => {
			this.ecs.removeEntity(b.paddle);
			this.ecs.removeEntity(b.goal);
			this.ecs.removeEntity(b.deathWall);
			this.ecs.removeEntity(b.pillar);
		});

		this.paddleBundles = targets;
	}

	private waitForRegistration(): Promise<number> {
		return new Promise((resolve, reject) => {
			const socket = this.wsManager.socket;

			const listener = (event: MessageEvent) => {
				if (!(event.data instanceof ArrayBuffer)) {
					console.warn('Non-binary message received, ignoring');
					return;
				}

				let serverMsg: userinterface.ServerMessage;
				try {
					const buf = new Uint8Array(event.data);
					serverMsg = decodeServerMessage(buf);
				} catch (err) {
					console.error('Failed to decode protobuf message:', err);
					return;
				}

				// Check for the welcome case
				if (serverMsg.welcome?.paddleId != null) {
					const paddleId = serverMsg.welcome.paddleId;
					console.log('Received WelcomeMessage:', paddleId);

					// Create and send a “ready” ClientMessage via helper
					const readyPayload: userinterface.IClientMessage = { ready: {} };
					const readyBuf = encodeClientMessage(readyPayload);
					socket.send(readyBuf);

					socket.removeEventListener('message', listener);
					resolve(paddleId);
				}
			};

			socket.addEventListener('message', listener);

			// Timeout guard
			setTimeout(() => {
				socket.removeEventListener('message', listener);
				reject(new Error('Timed out waiting for WelcomeMessage'));
			}, 5000);
		});
	}

}
