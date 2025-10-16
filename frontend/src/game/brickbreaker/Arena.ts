import { MeshBuilder, Scene, Mesh, StandardMaterial, Vector2, TransformNode, Color3, PolygonMeshBuilder } from "../../babylon";
import earcut from "earcut";
import { BrickBreaker } from "./brickbreaker";


export class Arena {

    private game: BrickBreaker;
    private scene: Scene;
    private root: TransformNode;
    private radian: number = 2 * Math.PI;

    public mesh: Mesh;

    constructor(scene: Scene, root: TransformNode, game: BrickBreaker){
        this.scene = scene;
        this.root = root;
        this.game = game;

        this.createArena();
    }

    public createArena() {
        this.mesh = MeshBuilder.CreateDisc("arena", { radius: 5, tessellation: 128 }, this.scene);
        this.mesh.parent = this.root;

        const mat = new StandardMaterial("arenaMat", this.scene);
        mat.emissiveColor.set(13 / 255 , 3 / 255, 32 / 255);
        this.mesh.material = mat;

        this.mesh.rotation.x = Math.PI / 2;

        let points: Vector2[] = [];
        for (let k = 128; k >= 0; --k) {
            let point = new Vector2(Math.cos(this.radian * k / 128) * 10, Math.sin(this.radian * k / 128) * 10);
            points.push(point);
        }
        for (let k = 0; k <= 128; ++k) {
            let point = new Vector2(Math.cos(this.radian * k / 128) * 10.5, Math.sin(this.radian * k / 128) * 10.5);
            points.push(point);
        }

        const builder = new PolygonMeshBuilder("brick", points, this.scene, earcut);
        const mesh = builder.build(true, 0.5);
        mesh.material = mat;
        mesh.parent = this.root;
        mesh.position.y += 0.45;

        this.game.gl.addIncludedOnlyMesh(mesh);
        this.game.gl.addIncludedOnlyMesh(this.mesh);
    }

    public generateBricks(radius: number, layers: number, cols: number): Mesh[][] {
        let bricks = [];

        const startHue = 278;
        const startSat = 1;
        const startVal = 0.5;

        const endHue = 278;
        const endSat = 0.33;
        const endVal = 1;

        const params = {
            arenaSubdv: cols * Math.ceil(128 / cols),
            width: 0.4,
            radius: radius,
            layers: layers,
            cols: cols
        }

        for (let i = 0; i < cols; ++i) {
            let bricksCols = [];
            for (let j = 0; j < layers; ++j) {

                const points = this.generateBrickPoints(params, i, j);

                const builder = new PolygonMeshBuilder("brick", points, this.scene, earcut);
                const mesh = builder.build(true, params.width);
                mesh.parent = this.root;
                mesh.position.y += 0.4;
                const mat = new StandardMaterial("arenaMat", this.scene);

                const t = (j + 1) / layers;
                const hue = startHue + (endHue - startHue) * t;
                const saturation = startSat + (endSat - startSat) * t;
                const value = startVal + (endVal - startVal) * t;

                mat.emissiveColor = Color3.FromHSV(hue, saturation, value);
                this.game.gl.addIncludedOnlyMesh(mesh);
                mesh.material = mat;
                bricksCols.push(mesh);
            }
            bricks.push(bricksCols);
        }
        return bricks;
    }

    generateBrickPoints(params: any, i: number, j: number): Vector2[] {

        const radOut = params.radius - (params.width * j * 2) - params.width;
        const radIn = params.radius - (params.width * (j + 1) * 2);
        let points: Vector2[] = [];
        let vert;
        for (let k = (params.arenaSubdv / params.cols) - 1; k >= 0; --k) {
            vert = k + (params.arenaSubdv / params.cols) * i;
            let point = new Vector2(Math.cos(this.radian * vert / params.arenaSubdv) * radIn, Math.sin(this.radian * vert / params.arenaSubdv) * radIn);
            points.push(point);
        }
        for (let k = 0; k < params.arenaSubdv / params.cols; ++k) {
            vert = k + (params.arenaSubdv / params.cols) * i;
            let point = new Vector2(Math.cos(this.radian * vert / params.arenaSubdv) * radOut, Math.sin(this.radian * vert / params.arenaSubdv) * radOut);
            points.push(point);
        }

        return points;
    }
}