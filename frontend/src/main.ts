import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, MeshBuilder } from "@babylonjs/core";

const canvas = document.createElement("canvas");
canvas.id = "renderCanvas";
document.body.appendChild(canvas);

const engine = new Engine(canvas, true);

const scene = new Scene(engine);

const camera = new ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 5, Vector3.Zero(), scene);
camera.attachControl(canvas, true);

const light = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

const box = MeshBuilder.CreateBox("box", {}, scene);

engine.runRenderLoop(() => {
	scene.render();
});

window.addEventListener("resize", () => {
	engine.resize();
});
