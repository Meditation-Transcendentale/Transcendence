import { Color3, Effect, Mesh, MeshBuilder, PBRMaterial, Scene, ShaderMaterial, StandardMaterial, TransformNode, Vector3 } from "@babylonImport";
import { PaddleMaterial } from './PaddleMaterial';

Effect.ShadersRepository = "";

export function initStatue(scene: Scene, pongRoot: TransformNode): Mesh {
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
	material.freeze();

	return statue;
}

export function createWallMesh(scene: Scene, pongRoot: TransformNode): Mesh {
	const wallMesh = MeshBuilder.CreateBox("wallBase", { width: 1, height: 1, depth: 1 }, scene);
	wallMesh.parent = pongRoot;
	const wallMaterial = new StandardMaterial("wallMaterial", scene);
	wallMaterial.diffuseColor.set(1, 0, 0);
	wallMaterial.emissiveColor.set(1, 0, 1);
	wallMaterial.freeze();
	wallMesh.material = wallMaterial;
	wallMesh.setPivotPoint(Vector3.Zero());

	return wallMesh;
}

export function createBallMesh(scene: Scene, pongRoot: TransformNode): Mesh {
	const ballMesh = MeshBuilder.CreateSphere("ballBase", { diameter: 0.5 }, scene);
	ballMesh.parent = pongRoot;
	const ballMaterial = new StandardMaterial("ballMaterial", scene);
	ballMaterial.diffuseColor.set(1, 0, 0);
	ballMaterial.emissiveColor.set(0.3, 0.3, 0.3);
	ballMaterial.specularColor.set(0.5, 0.5, 0.5);
	ballMaterial.freeze();
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
	mat.diffuseColor = Color3.Red();
	paddle.isVisible = true;
	mat.forceDepthWrite = true;
	return paddle;
}

// utils/initializeGame.ts

export function createPillarMesh(scene: Scene, pongRoot: TransformNode): Mesh {
	const m = MeshBuilder.CreateBox("pillarBase", {
		width: 1.,
		height: 1,
		depth: 1
	}, scene);
	m.parent = pongRoot;
	m.isVisible = true;
	const mat = new StandardMaterial("pillarMat", scene);
	mat.diffuseColor = Color3.Blue();
	mat.freeze();
	m.material = mat;
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
