import { Engine } from "@babylonjs/core";
import { SceneManager } from "./core/SceneManager";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

const engine = new Engine(canvas, true);

const sceneManager = new SceneManager(engine, canvas);
//window.onbeforeunload = function () {
//}

sceneManager.createScene();
sceneManager.start();

window.addEventListener("resize", () => engine.resize());
