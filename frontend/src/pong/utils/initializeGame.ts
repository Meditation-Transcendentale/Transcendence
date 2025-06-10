import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { GameTemplateConfig } from "../templates/GameTemplate";

export function createCamera(scene: Scene, canvas: any): ArcRotateCamera {
	const camera = new ArcRotateCamera("camera", Math.PI / 2, 0., 60, Vector3.Zero(), scene);
	camera.attachControl(canvas, true);
	new HemisphericLight("light", new Vector3(0, 1, 0), scene);

	return camera;
}

export function createWallMesh(scene: Scene, config: GameTemplateConfig): Mesh {
	const wallMesh = MeshBuilder.CreateBox("wallBase", { width: config.wallWidth, height: 1, depth: 20 }, scene);
	const wallMaterial = new StandardMaterial("wallMaterial", scene);
	wallMaterial.diffuseColor.set(0, 0, 0);
	wallMaterial.emissiveColor.set(1, 1, 1);
	wallMesh.material = wallMaterial;
	wallMesh.setEnabled(true);
	wallMesh.setPivotPoint(Vector3.Zero());

	return wallMesh;
}

export function createArenaMesh(scene: Scene, config: GameTemplateConfig): Mesh {
	const arenaMesh = MeshBuilder.CreateBox("arenaBox", { width: config.arenaSizeX, height: config.arenaSizeZ, depth: 1 }, scene);
	const material = new StandardMaterial("arenaMaterial", scene);
	material.diffuseColor.set(0, 0, 0);
	material.specularColor.set(0, 0, 0);
	material.emissiveColor.set(0.2, 0.2, 0.2980392156862745);
	arenaMesh.rotation.x = Math.PI / 2;
	arenaMesh.position.y = -0.5;
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
	const paddleMesh = MeshBuilder.CreateBox("paddleBase", { width: 3, height: 0.4, depth: 0.4 }, scene);
	const paddleMaterial = new StandardMaterial("paddleMaterial", scene);
	paddleMaterial.diffuseColor.set(0, 0, 0);
	paddleMaterial.emissiveColor.set(1, 1, 1);
	paddleMesh.material = paddleMaterial;
	paddleMesh.setEnabled(true);
	paddleMesh.setPivotPoint(Vector3.Zero());

	return paddleMesh;
}
