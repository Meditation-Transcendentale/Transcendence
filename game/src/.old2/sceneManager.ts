import { Scene, Vector3, ArcRotateCamera, HemisphericLight, Engine } from "@babylonjs/core";

export function createScene(engine: Engine, canvas: HTMLCanvasElement): Scene {
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera("Camera", 0, Math.PI / 2, 10, Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    const light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);

    // Could add static stuff

    return scene;
}
