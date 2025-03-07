import { Engine } from '@babylonjs/core';
import { initializeGame } from './gameManager';
import { createScene } from './sceneManager';
import { initializeInput } from './inputHandler';
import { setupNetwork } from './websocketManager';
import "@babylonjs/inspector";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

const engine = new Engine(canvas, true);

const scene = createScene(engine, canvas);

scene.debugLayer.show();
setupNetwork();

//initializeInput();

const numPlayers = 100; // For example, 6 players.
const playerZones = initializeGame(scene, numPlayers);

engine.runRenderLoop(() => {
    scene.render();
});

