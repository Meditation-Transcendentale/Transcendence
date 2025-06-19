import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Scene } from "@babylonjs/core/scene";
import { Color3, Color4, Vector3 } from "@babylonjs/core/Maths/math";
import { GameTemplateConfig } from "../templates/GameTemplate";
import { ShaderMaterial, Vector2, VertexBuffer } from "@babylonjs/core";
import { PaddleMaterial } from './PaddleMaterial';
export function createCamera(scene: Scene, canvas: any): ArcRotateCamera {
	const camera = new ArcRotateCamera("camera", Math.PI / 2, 0., 60, Vector3.Zero(), scene);
	camera.attachControl(canvas, true);
	new HemisphericLight("light", new Vector3(0, 1, 0), scene);

	return camera;
}

export function createWallMesh(scene: Scene, config: GameTemplateConfig): Mesh {
	const wallMesh = MeshBuilder.CreateBox("wallBase", { width: 1, height: 1, depth: 2 }, scene);
	const wallMaterial = new StandardMaterial("wallMaterial", scene);
	wallMaterial.diffuseColor.set(0, 0, 0);
	wallMaterial.emissiveColor.set(1, 0, 1);
	wallMesh.material = wallMaterial;
	wallMesh.setEnabled(false);
	wallMesh.setPivotPoint(Vector3.Zero());

	return wallMesh;
}

export function createArenaMesh(scene: Scene, config: GameTemplateConfig): Mesh {
	const arenaMesh = MeshBuilder.CreateCylinder("arenaBox", { diameter: 200, height: 1, tessellation: 128 }, scene);
	const material = new StandardMaterial("arenaMaterial", scene);
	// material.diffuseColor.set(0, 0, 0;
	// material.specularColor.set(0, 0, 0);
	// material.emissiveColor.set(0.2, 0.2, 0.2980392156862745);
	arenaMesh.material = material;

	return arenaMesh;
}

export function createBallMesh(scene: Scene, config: GameTemplateConfig): Mesh {
	const ballMesh = MeshBuilder.CreateSphere("ballBase", { diameter: 1 }, scene);
	const ballMaterial = new StandardMaterial("ballMaterial", scene);
	ballMaterial.diffuseColor.set(1, 1, 1);
	// ballMaterial.diffuseTexture = new Texture("moi.png", scene);
	ballMaterial.emissiveColor.set(1, 1, 1);
	ballMesh.setEnabled(true);
	ballMesh.setPivotPoint(Vector3.Zero());
	ballMesh.material = ballMaterial;

	return ballMesh;
}

export function createPaddleMesh(scene: Scene, config: GameTemplateConfig): Mesh {
	const
		arenaRadius = 100,
		paddleWidth = 1,
		paddleHeight = 1,
		paddleDepth = 1
		// radialSegments = 32
		;

	const paddle = MeshBuilder.CreateTiledBox("paddle", {
		//sideOrientation: BABYLON.Mesh.DOUBLESIDE,
		//pattern: pat,
		// alignVertical: av,
		// alignHorizontal: ah,
		width: paddleWidth,
		height: paddleHeight,
		depth: paddleDepth,
		tileSize: 0.1,
		tileWidth: 0.1
	}, scene);
	paddle.enableEdgesRendering();
	paddle.alwaysSelectAsActiveMesh = true
	paddle.edgesColor = new Color4(0., 1.0, 0.0, 1.0);
	console.log(paddle.getVertexBuffer(VertexBuffer.PositionKind));
	// const shape = [
	// 	new Vector3(-paddleDepth / 2, -paddleHeight / 2, 0),
	// 	new Vector3(paddleDepth / 2, -paddleHeight / 2, 0),
	// 	new Vector3(paddleDepth / 2, paddleHeight / 2, 0),
	// 	new Vector3(-paddleDepth / 2, paddleHeight / 2, 0),
	// ];
	// // 2) build a *straight* path of many points along X (which we'll bend in the shader)
	// const path: Vector3[] = [];
	// for (let i = 0; i <= radialSegments; i++) {
	// 	const t = i / radialSegments;
	// 	// x runs -W/2 -> +W/2
	// 	path.push(new Vector3((t - 0.5), 0, 0));
	// }
	//
	// // 3) extrude the 4-point shape along that straight path:
	// const paddle = MeshBuilder.ExtrudeShape(
	// 	"paddle",
	// 	{ shape, path, cap: Mesh.CAP_ALL, closeShape: true, sideOrientation: Mesh.DOUBLESIDE },
	// 	scene
	// );

	const mat = new PaddleMaterial('paddleMaterial', scene);

	// (mat.backFaceCulling) = false;
	mat.setUniform("arenaRadius", 100.);
	mat.setUniform("playerCount", 100.);
	mat.setUniform("fillFraction", 0.25);
	paddle.material = mat;
	mat.diffuseColor = Color3.Red();
	paddle.isVisible = true;
	// mat.alpha = 0.1;
	mat.forceDepthWrite = true;
	// mat.freeze();
	return paddle;
}

export function createPortalMesh(scene: Scene, config: GameTemplateConfig): Mesh {
	const portalMesh = MeshBuilder.CreateBox("portalBase", { width: 4, height: 8, depth: 2 }, scene);
	const paddleMaterial = new StandardMaterial("portalMaterial", scene);
	paddleMaterial.diffuseColor.set(0, 1, 0);
	paddleMaterial.emissiveColor.set(1, 1, 0);
	portalMesh.material = paddleMaterial;
	portalMesh.setEnabled(true);
	portalMesh.setPivotPoint(Vector3.Zero());

	return portalMesh;
}

// utils/initializeGame.ts

export function createPillarMesh(scene: Scene, config: GameTemplateConfig): Mesh {
	const m = MeshBuilder.CreateBox("pillarBase", {
		width: 0.5,
		height: 2,
		depth: 0.5
	}, scene);
	m.isVisible = true;
	const mat = new StandardMaterial("pillarMat", scene);
	mat.diffuseColor.set(0.8, 0.8, 0.8);
	m.material = mat;
	m.setPivotPoint(Vector3.Zero());
	return m;
}

export function createGoalMesh(scene: Scene, config: GameTemplateConfig): Mesh {
	const m = MeshBuilder.CreateBox("goalBase", {
		width: 1,
		height: 1,
		depth: 0.5
	}, scene);
	const mat = new StandardMaterial("goalMat", scene);
	mat.diffuseColor.set(1, 0, 0);
	m.material = mat;
	m.setEnabled(false);
	m.setPivotPoint(Vector3.Zero());
	return m;
}


