import { StandardMaterial, MeshBuilder, Scene, Vector3, TransformNode, Mesh } from "../../../babylon";
import { GameTemplateConfig } from "../templates/GameTemplate";
import { ThinInstanceManager } from "../rendering/ThinInstanceManager.js";
import { sceneManager } from "../../../scene/SceneManager";

function createWallMesh(scene: Scene, config: GameTemplateConfig, pongRoot: TransformNode): Mesh {
	// const wallMesh = MeshBuilder.CreateBox("wallBase", { width: config.wallWidth, height: 1, depth: 20 }, scene);
	// const wallMaterial = new StandardMaterial("wallMaterial", scene);
	// wallMesh.parent = pongRoot;
	// wallMaterial.diffuseColor.set(0, 0, 0);
	// wallMaterial.emissiveColor.set(1, 1, 1);
	// wallMesh.material = wallMaterial;
	// wallMesh.setEnabled(true);
	// wallMesh.setPivotPoint(Vector3.Zero());
	//
	// return wallMesh;
	return sceneManager.assets.pongWallMesh;
}

function createArenaMesh(scene: Scene, config: GameTemplateConfig, pongRoot: TransformNode): Mesh {
	const arenaMesh = MeshBuilder.CreateBox("arenaBox", { width: config.arenaSizeX, height: config.arenaSizeZ, depth: 1 }, scene);
	const material = new StandardMaterial("arenaMaterial", scene);
	arenaMesh.parent = pongRoot;
	material.diffuseColor.set(0, 0, 0);
	material.specularColor.set(0, 0, 0);
	material.emissiveColor.set(0.2, 0.2, 0.2980392156862745);
	arenaMesh.rotation.x = Math.PI / 2;
	arenaMesh.position.y = -0.5;
	arenaMesh.material = material;

	return arenaMesh;
}

function createBallMesh(scene: Scene, config: GameTemplateConfig, pongRoot: TransformNode): Mesh {

	// const ballMesh = MeshBuilder.CreateSphere("ballBase", { diameter: 1, segments: 16 }, scene);
	// const ballMaterial = new StandardMaterial("ballMaterial", scene);
	// ballMesh.parent = pongRoot;
	// ballMaterial.diffuseColor.set(1, 1, 1);
	// ballMaterial.emissiveColor.set(1, 1, 1);
	// ballMesh.setEnabled(true);
	// ballMesh.setPivotPoint(Vector3.Zero());
	// ballMesh.material = ballMaterial;
	//
	return sceneManager.assets.ballMesh;
}

function createPaddleMesh(scene: Scene, config: GameTemplateConfig, pongRoot: TransformNode): Mesh {
	// const paddleMesh = MeshBuilder.CreateBox("paddleBase", { width: 3, height: 0.4, depth: 0.4 }, scene);
	// const paddleMaterial = new StandardMaterial("paddleMaterial", scene);
	// paddleMesh.parent = pongRoot;
	// paddleMaterial.diffuseColor.set(0, 0, 0);
	// paddleMaterial.emissiveColor.set(1, 1, 1);
	// paddleMesh.material = paddleMaterial;
	// paddleMesh.setEnabled(true);
	// paddleMesh.setPivotPoint(Vector3.Zero());

	return sceneManager.assets.pongPaddleMesh;
}

export function createBaseMeshes(scene: Scene, config: GameTemplateConfig, pongRoot: TransformNode): { arena: Mesh, ball: Mesh, paddle: Mesh, wall: Mesh } {
	return {
		arena: createArenaMesh(scene, config, pongRoot),
		ball: createBallMesh(scene, config, pongRoot),
		paddle: createPaddleMesh(scene, config, pongRoot),
		wall: createWallMesh(scene, config, pongRoot)
	}
}

export function createInstanceManagers(baseMeshes: any) {
	return {
		ball: new ThinInstanceManager(baseMeshes.ball, 1, 50, 100, false),
		paddle: new ThinInstanceManager(baseMeshes.paddle, 4, 50, 100, true),
		wall: new ThinInstanceManager(baseMeshes.wall, 4, 50, 100, false)
	}
}
