import { Color3, Effect, Mesh, MeshBuilder, MorphTarget, PBRMaterial, Scene, ShaderMaterial, StandardMaterial, TransformNode, Vector3 } from "../../../babylon";
import { PaddleMaterial } from './PaddleMaterial';
import { WallMaterial } from "./WallMaterial";
import { BallMaterial } from "./BallMaterial";
import { PillarMaterial } from "./PillarMaterial";

Effect.ShadersRepository = "";

export function initStatue(scene: Scene, pongRoot: TransformNode): { statue: Mesh, smileTarget: MorphTarget | null } {
	const statue = scene.getMeshByName('__root__') as Mesh;
	statue.parent = pongRoot;
	statue.rotationQuaternion = null;
	statue.position.set(-650, 400, 0);
	statue.rotation.set(0, 0, 0);
	statue.scaling.setAll(70);
	statue.freezeWorldMatrix();
	statue.doNotSyncBoundingInfo = true;

	const headMesh = scene.getMeshByName('Head.001') as Mesh;
	const material = headMesh.material as PBRMaterial;

	let smileTarget: MorphTarget | null = null;
	if (headMesh && headMesh.morphTargetManager) {
		smileTarget = headMesh.morphTargetManager.getTarget(0);
		if (smileTarget) {
			smileTarget.influence = 0.0;
		}
	}
	return { statue, smileTarget };
}

export function createWallMesh(scene: Scene, pongRoot: TransformNode): Mesh {
	const
		arenaRadius = 200.,
		paddleWidth = 1,
		paddleHeight = 1,
		paddleDepth = 0.5
		;

	const wall = MeshBuilder.CreateTiledBox("wallBase", {
		width: paddleWidth,
		height: paddleHeight,
		depth: paddleDepth,
		tileSize: 0.1,
		tileWidth: 0.1,
		tileHeight: 0.1
	}, scene);
	wall.parent = pongRoot;
	const mat = new WallMaterial('wallMaterial', scene);

	mat.setUniform("arenaRadius", arenaRadius);
	mat.setUniform("playerCount", 100.);
	mat.setUniform("fillFraction", 1.);
	mat.setUniform("paddleId", -1.);
	wall.material = mat;
	mat.diffuseColor = new Color3(0.2, 0.08, 0.08);
	wall.isVisible = true;
	mat.forceDepthWrite = true;
	return wall;
}

export function createBallMesh(scene: Scene, pongRoot: TransformNode): Mesh {
	const light = scene.getLightByName("whitelight2");
	const ballMesh = MeshBuilder.CreateSphere("ballBase", { diameter: 0.5 }, scene);
	ballMesh.parent = pongRoot;
	const ballMaterial = new BallMaterial("ballMaterial", scene);
	light?.includedOnlyMeshes.push(ballMesh);

	ballMesh.setEnabled(true);
	ballMesh.setPivotPoint(Vector3.Zero());
	ballMesh.position.y = 0.0;
	ballMesh.material = ballMaterial;

	return ballMesh;
}

export function createPaddleMesh(scene: Scene, pongRoot: TransformNode): Mesh {
	const
		arenaRadius = 200.,
		paddleWidth = 1,
		paddleHeight = 1,
		paddleDepth = 1
		;

	const paddle = MeshBuilder.CreateTiledBox("paddleBase", {
		width: paddleWidth,
		height: paddleHeight,
		depth: paddleDepth,
		tileSize: 0.1,
		tileWidth: 0.1
	}, scene);
	paddle.parent = pongRoot;
	const mat = new PaddleMaterial('paddleMaterial', scene);

	mat.setUniform("arenaRadius", arenaRadius);
	mat.setUniform("playerCount", 100.);
	mat.setUniform("fillFraction", 0.25);
	mat.setUniform("paddleId", -1.);
	paddle.material = mat;
	mat.diffuseColor = new Color3(0.6, 0.3, 0.8);
	paddle.isVisible = true;
	mat.forceDepthWrite = true;
	return paddle;
}

// utils/initializeGame.ts

export function createPillarMesh(scene: Scene, pongRoot: TransformNode): Mesh {
	const light = scene.getLightByName("whitelight2");
	const m = MeshBuilder.CreateBox("pillarBase", {
		width: 1.,
		height: 1,
		depth: 1
	}, scene);
	m.parent = pongRoot;
	m.isVisible = true;
	const mat = new PillarMaterial("pillarMat", scene);
	m.material = mat;
	// light?.includedOnlyMeshes.push(m);
	return m;
}

export function createGoalMesh(scene: Scene, pongRoot: TransformNode): Mesh {
	const m = MeshBuilder.CreateBox("goalBase", {
		width: 1,
		height: 1,
		depth: 0.5
	}, scene);
	m.parent = pongRoot;
	const mat = new StandardMaterial("goalMat", scene);
	mat.diffuseColor.set(1, 0, 0);
	mat.freeze();
	m.material = mat;
	m.setEnabled(false);
	m.setPivotPoint(Vector3.Zero());
	return m;
}


export function createBaseMeshes(scene: Scene, pongRoot: TransformNode) {
	return {
		ball: createBallMesh(scene, pongRoot),
		paddle: createPaddleMesh(scene, pongRoot),
		wall: createWallMesh(scene, pongRoot),
		pillar: createPillarMesh(scene, pongRoot),
		goal: createGoalMesh(scene, pongRoot),
	}
}
