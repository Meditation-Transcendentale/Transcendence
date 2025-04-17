import { Engine, Scene, Vector3, ArcRotateCamera, HemisphericLight, MeshBuilder, StandardMaterial, Texture, Mesh } from "@babylonjs/core";
import { GameTemplateConfig } from "../templates/GameTemplate";


export function createCamera(scene: Scene, canvas: any): ArcRotateCamera {
	const camera = new ArcRotateCamera("camera", Math.PI / 2, 0, 60, Vector3.Zero(), scene);
	camera.attachControl(canvas, true);
	new HemisphericLight("light", new Vector3(0, 1, 0), scene);

	return camera;
}

export function createWallMesh(scene: Scene, config: GameTemplateConfig): Mesh {
	const wallMesh = MeshBuilder.CreateBox("wallBase", { width: config.wallWidth, height: 1, depth: 20 }, scene);
	const wallMaterial = new StandardMaterial("arenaMaterial", scene);
	wallMaterial.diffuseColor.set(1, 0, 0);
	wallMesh.material = wallMaterial;
	wallMesh.setEnabled(true);
	wallMesh.setPivotPoint(Vector3.Zero());

	return wallMesh;
}

export function createArenaMesh(scene: Scene, config: GameTemplateConfig): Mesh {
	const arenaMesh = MeshBuilder.CreateBox("arenaBox", {width: config.arenaSizeX, height: config.arenaSizeZ, depth: 1}, scene);
	const material = new StandardMaterial("arenaMaterial", scene);
	material.diffuseColor.set(0, 0, 0);
	arenaMesh.rotation.x = Math.PI / 2;
	arenaMesh.position.y = -0.5;
	arenaMesh.material = material;

	return arenaMesh;
}

export function createBallMesh(scene: Scene, config: GameTemplateConfig): Mesh {
	const ballMesh = MeshBuilder.CreateSphere("ballBase", { diameter: 1 }, scene);
	const ballMaterial = new StandardMaterial("ballMaterial", scene);
	ballMaterial.diffuseColor.set(1, 0, 0);
	ballMaterial.diffuseTexture = new Texture("moi.png", scene);
	ballMesh.setEnabled(true);
	ballMesh.setPivotPoint(Vector3.Zero());
	ballMesh.material = ballMaterial;

	return ballMesh;
}

export function createPaddleMesh(scene: Scene, config: GameTemplateConfig): Mesh {
	const paddleMesh = MeshBuilder.CreateBox("paddleBase", { width: 3, height: 0.4, depth: 0.4 }, scene);
	paddleMesh.setEnabled(true);
	paddleMesh.setPivotPoint(Vector3.Zero());

	return paddleMesh;
}